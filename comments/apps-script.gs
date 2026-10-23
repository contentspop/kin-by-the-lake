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
// GET ?action=add&page=…&section=…&area=…&clicked=…&topic=…&anchor=…&x=…&y=…&name=…&comment=…&url=…&callback=<fn>  → save one
function doGet(e) {
  var p = (e && e.parameter) || {};
  var cb = /^[A-Za-z_$][\w$.]*$/.test(p.callback || '') ? p.callback : '';
  if (p.action === 'add') return out_(save_(p), cb);
  if (p.action !== 'list') return out_({ ok: true, service: 'kin-comments' }, cb);
  try {
    var filter = { and: [{ property: 'Status', select: { does_not_equal: 'Done' } }] };
    if (p.page) filter.and.push({ property: 'Page', rich_text: { equals: String(p.page) } });
    var list = [], cursor;
    do {
      var body = { filter: filter, sorts: [{ timestamp: 'created_time', direction: 'ascending' }], page_size: 100 };
      if (cursor) body.start_cursor = cursor;
      var r = notion_('post', '/databases/' + DATABASE_ID + '/query', body);
      r.results.forEach(function (pg) {
        var pr = pg.properties;
        list.push({
          id: pg.id.replace(/-/g, ''), ts: pg.created_time,
          comment: plain_(pr['Comment']), name: plain_(pr['Name']),
          page: plain_(pr['Page']), section: plain_(pr['Section']), area: plain_(pr['Area']), anchor: plain_(pr['Anchor']), topic: pr['Topic'] && pr['Topic'].select ? pr['Topic'].select.name : '',
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

function save_(d) {
  var comment = String(d.comment || '').trim().slice(0, 1900);
  if (!comment) return { ok: false, error: 'empty' };
  try {
    var name = String(d.name || 'Guest').slice(0, 120);
    var page = notion_('post', '/pages', {
      parent: { database_id: DATABASE_ID },
      properties: {
        'Comment': { title: [{ type: 'text', text: { content: comment } }] },
        'Name': text_(name),
        'Page': text_(d.page),
        'Section': text_(d.section),
        'Area': text_(d.area),
        'Clicked on': text_(d.clicked),
        'Anchor': text_(d.anchor),
        'X': { number: Number(d.x) || 0 },
        'Y': { number: Number(d.y) || 0 },
        'Status': { select: { name: 'Open' } },
        'Topic': TOPICS.indexOf(String(d.topic)) >= 0 ? { select: { name: String(d.topic) } } : { select: null }
      }
    });
    var id = page.id.replace(/-/g, '');
    var base = String(d.url || '');
    var link = base ? base + (base.indexOf('#') >= 0 ? '&' : '#') + 'pin=' + id : '';
    if (link) notion_('patch', '/pages/' + page.id, { properties: { 'Open on page': { url: link }, 'Page URL': { url: base } } });
    if (NOTIFY_BY_EMAIL) {
      try {
        MailApp.sendEmail(Session.getEffectiveUser().getEmail(),
          'KIN · new comment from ' + name + ' · ' + (d.area || d.section || d.page || 'site'),
          name + ' commented:\n\n' + comment + '\n\n' +
          'Where:   ' + (d.section || d.page || '') + (d.area ? '  ›  ' + d.area : '') + '\n' +
          (d.topic ? 'Topic:   ' + d.topic + '\n' : '') +
          (d.clicked ? 'On:      ' + d.clicked + '\n' : '') +
          'Page:    ' + base + '\n' +
          'Pin:     ' + link + '\n' +
          'Notion:  ' + page.url);
      } catch (mailErr) { /* email is best-effort */ }
    }
    return { ok: true, id: id, ts: page.created_time };
  } catch (err) {
    return { ok: false, error: String(err.message || err) };
  }
}
