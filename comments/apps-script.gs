/**
 * KIN Design System — comment pins bridge (Google Apps Script → Notion)
 *
 * The site cannot talk to Notion directly (Notion blocks browsers, and the
 * Notion key must stay secret). This script sits in between: the site sends
 * comments here, this script saves them to the Notion database and emails you.
 *
 * ONE-TIME SETUP
 * 1. Notion key: go to https://www.notion.so/my-integrations → New integration
 *    (name it "KIN comments", type Internal) → copy the "Internal Integration Secret".
 * 2. In Notion, open the database "KIN — Client comments" → ••• (top right) →
 *    Connections → add "KIN comments".
 * 3. Go to https://script.google.com → New project → delete the sample code →
 *    paste this whole file → Save.
 * 4. Project Settings (gear icon) → Script Properties → Add script property:
 *       Property: NOTION_TOKEN     Value: <paste the secret from step 1>
 *    (The key lives only here. Never put it in the website or send it in chat.)
 * 5. Deploy → New deployment → gear → Web app
 *       Execute as: Me        Who has access: Anyone
 *    → Deploy → Authorize access → if "Google hasn't verified this app":
 *      Advanced → Go to … (unsafe) → Allow.
 * 6. Copy the Web app URL (ends in /exec) and send it back to be connected.
 *
 * DAY TO DAY
 * - Every new comment arrives in the Notion database and by email.
 * - Set Status to Done in Notion to hide that pin on the site.
 */

var DATABASE_ID = '5c5f8a05514a4bdca049e773907fbd40';
var NOTIFY_BY_EMAIL = true;           // set to false to stop the emails
var NOTION_VERSION = '2022-06-28';
var TOPICS = ['Brand & Story', 'Menu & Offer', 'Strategy & Activation', 'Operations & Experience', 'Design & Content'];

function token_() {
  var t = PropertiesService.getScriptProperties().getProperty('NOTION_TOKEN');
  if (!t) throw new Error('NOTION_TOKEN script property is missing');
  return t;
}

function notion_(method, path, body) {
  var res = UrlFetchApp.fetch('https://api.notion.com/v1' + path, {
    method: method,
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + token_(), 'Notion-Version': NOTION_VERSION },
    payload: body ? JSON.stringify(body) : undefined,
    muteHttpExceptions: true
  });
  var code = res.getResponseCode();
  var data = JSON.parse(res.getContentText() || '{}');
  if (code >= 300) throw new Error('Notion ' + code + ': ' + (data.message || res.getContentText()));
  return data;
}

function text_(s) { return { rich_text: [{ type: 'text', text: { content: String(s || '').slice(0, 1900) } }] }; }
function plain_(prop) {
  if (!prop) return '';
  var arr = prop.title || prop.rich_text || [];
  return arr.map(function (t) { return t.plain_text; }).join('');
}

function out_(obj, callback) {
  var json = JSON.stringify(obj);
  if (callback) {
    return ContentService.createTextOutput(callback + '(' + json + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}

// GET ?action=list&page=<page key>&callback=<fn>  → open comments for that page
// GET ?action=list&answers=1&callback=<fn>  → all questionnaire answers (any status)
// GET ?action=add&page=…&section=…&area=…&clicked=…&topic=…&anchor=…&x=…&y=…&name=…&comment=…&url=…&callback=<fn>  → save one
function doGet(e) {
  var p = (e && e.parameter) || {};
  var cb = /^[A-Za-z_$][\w$.]*$/.test(p.callback || '') ? p.callback : '';
  if (p.action === 'add') return out_(save_(p), cb);
  if (p.action !== 'list') return out_({ ok: true, service: 'kin-comments' }, cb);
  try {
    // answers=1 → every questionnaire answer, whatever its Status (answers stay visible under each question)
    var filter = p.answers
      ? { and: [{ property: 'Clicked on', rich_text: { contains: 'Owner question' } }] }
      : { and: [{ property: 'Status', select: { does_not_equal: 'Done' } }] };
    if (p.page) filter.and.push({ property: 'Page', rich_text: { equals: String(p.page) } });
    var list = [], cursor;
    do {
      var body = { filter: filter, sorts: [{ timestamp: 'created_time', direction: 'ascending' }], page_size: 100 };
      if (cursor) body.start_cursor = cursor;
      var r = notion_('post', '/databases/' + DATABASE_ID + '/query', body);
      r.results.forEach(function (pg) {
        var pr = pg.properties;
        var full = plain_(pr['Full text']);
        list.push({
          id: pg.id.replace(/-/g, ''), ts: pg.created_time,
          comment: full || plain_(pr['Comment']), name: plain_(pr['Name']),
          page: plain_(pr['Page']), section: plain_(pr['Section']), area: plain_(pr['Area']), anchor: plain_(pr['Anchor']), topic: pr['Topic'] && pr['Topic'].select ? pr['Topic'].select.name : '',
          type: pr['Type'] && pr['Type'].select ? pr['Type'].select.name : '',
          images: ((pr['Images'] && pr['Images'].files) || []).map(function (f) { return f.file ? f.file.url : (f.external ? f.external.url : ''); }).filter(Boolean),
          x: pr['X'] && pr['X'].number, y: pr['Y'] && pr['Y'].number
        });
      });
      cursor = r.has_more ? r.next_cursor : null;
    } while (cursor && list.length < 500);
    return out_({ ok: true, comments: list }, cb);
  } catch (err) {
    return out_({ ok: false, error: String(err.message || err) }, cb);
  }
}

// POST (text/plain JSON) → save one comment
function doPost(e) {
  var d = {};
  try { d = JSON.parse(e.postData.contents); } catch (err) { return out_({ ok: false, error: 'bad json' }); }
  return out_(save_(d));
}

function chunks_(s, n) { var out = []; s = String(s || ''); for (var i = 0; i < s.length && out.length < 100; i += n) out.push(s.slice(i, i + n)); return out; }
function rich_(s) { return chunks_(s, 1900).map(function (c) { return { type: 'text', text: { content: c } }; }); }
// Same as rich_, but web addresses become clickable links (used for the page body in Notion)
function linkRich_(s) {
  var out = [], re = /(https?:\/\/[^\s]+[^\s.,;:!?)\]'"]|www\.[^\s]+[^\s.,;:!?)\]'"])/g, last = 0, m;
  s = String(s || '');
  while ((m = re.exec(s)) && out.length < 95) {
    if (m.index > last) out = out.concat(rich_(s.slice(last, m.index)));
    var u = m[0], href = /^www\./.test(u) ? 'https://' + u : u;
    out.push({ type: 'text', text: { content: u.slice(0, 1900), link: href.length < 2000 ? { url: href } : null } });
    last = m.index + u.length;
  }
  if (last < s.length) out = out.concat(rich_(s.slice(last)));
  return out.slice(0, 100);
}

// Upload one base64 image to Notion; returns a file_upload id or ''
function upload_(im, i) {
  try {
    var type = /^image\/(jpeg|png|gif|webp)$/.test(String(im.type)) ? im.type : 'image/jpeg';
    var name = String(im.name || ('image-' + (i + 1))).replace(/[^\w.\- ]+/g, '').slice(0, 80) || ('image-' + (i + 1));
    if (!/\.\w+$/.test(name)) name += type === 'image/png' ? '.png' : '.jpg';
    var up = notion_('post', '/file_uploads', { filename: name, content_type: type });
    var blob = Utilities.newBlob(Utilities.base64Decode(String(im.data || '')), type, name);
    var res = UrlFetchApp.fetch('https://api.notion.com/v1/file_uploads/' + up.id + '/send', {
      method: 'post', headers: { Authorization: 'Bearer ' + token_(), 'Notion-Version': NOTION_VERSION },
      payload: { file: blob }, muteHttpExceptions: true
    });
    if (res.getResponseCode() >= 300) return { id: '', name: name, err: res.getContentText().slice(0, 200) };
    return { id: up.id, name: name };
  } catch (e) { return { id: '', name: '', err: String(e) }; }
}

function save_(d) {
  var comment = String(d.comment || '').replace(/\r\n/g, '\n').trim().slice(0, 150000);
  var imgs = Object.prototype.toString.call(d.images) === '[object Array]' ? d.images.slice(0, 6) : [];
  if (!comment && !imgs.length) return { ok: false, error: 'empty' };
  try {
    var name = String(d.name || 'Guest').slice(0, 120);
    var type = /^Owner question/.test(String(d.clicked || '')) ? 'Answer' : (d.type === 'Pin' ? 'Pin' : 'Comment');
    var first = comment.split('\n')[0];
    var preview = comment ? (first.length > 180 ? first.slice(0, 180) + ' …' : first + (comment.length > first.length ? ' …' : '')) : '(' + imgs.length + ' image' + (imgs.length > 1 ? 's' : '') + ')';
    var ups = imgs.map(upload_), files = ups.filter(function (u) { return u.id; }).map(function (u) { return { type: 'file_upload', file_upload: { id: u.id }, name: u.name }; });
    var children = comment ? comment.split(/\n{2,}/).slice(0, 90).map(function (para) { return { object: 'block', type: 'paragraph', paragraph: { rich_text: linkRich_(para) } }; }) : [];
    var props = {
      'Comment': { title: [{ type: 'text', text: { content: preview } }] },
      'Full text': { rich_text: rich_(comment) },
      'Name': text_(name),
      'Page': text_(d.page),
      'Section': text_(d.section),
      'Area': text_(d.area),
      'Clicked on': text_(d.clicked),
      'Anchor': text_(d.anchor),
      'X': { number: Number(d.x) || 0 },
      'Y': { number: Number(d.y) || 0 },
      'Status': { select: { name: 'Open' } },
      'Type': { select: { name: type } },
      'Topic': TOPICS.indexOf(String(d.topic)) >= 0 ? { select: { name: String(d.topic) } } : { select: null }
    };
    if (files.length) props['Images'] = { files: files };
    var imgBlocks = files.map(function (f) { return { object: 'block', type: 'image', image: { type: 'file_upload', file_upload: { id: f.file_upload.id } } }; });
    var page;
    try { page = notion_('post', '/pages', { parent: { database_id: DATABASE_ID }, properties: props, children: children.concat(imgBlocks) }); }
    catch (e1) { if (!imgBlocks.length) throw e1; page = notion_('post', '/pages', { parent: { database_id: DATABASE_ID }, properties: props, children: children }); }
    var id = page.id.replace(/-/g, '');
    var base = String(d.url || '');
    var link = base ? base + (base.indexOf('#') >= 0 ? '&' : '#') + 'pin=' + id : '';
    if (link) notion_('patch', '/pages/' + page.id, { properties: { 'Open on page': { url: link }, 'Page URL': { url: base.split('#')[0] } } });
    var failed = ups.filter(function (u) { return !u.id; }).length;
    if (NOTIFY_BY_EMAIL) {
      try {
        MailApp.sendEmail(Session.getEffectiveUser().getEmail(),
          'KIN · new ' + type.toLowerCase() + ' from ' + name + ' · ' + (d.area || d.section || d.page || 'site'),
          name + ' wrote:\n\n' + (comment || '(no text)') + '\n\n' +
          (files.length ? 'Images:  ' + files.length + ' (see Notion)\n' : '') +
          'Where:   ' + (d.section || d.page || '') + (d.area ? '  ›  ' + d.area : '') + '\n' +
          (d.topic ? 'Topic:   ' + d.topic + '\n' : '') +
          'Open:    ' + link + '\n' +
          'Notion:  ' + page.url);
      } catch (mailErr) { /* email is best-effort */ }
    }
    return { ok: true, id: id, ts: page.created_time, images: files.length, failed: failed };
  } catch (err) {
    return { ok: false, error: String(err.message || err) };
  }
}
