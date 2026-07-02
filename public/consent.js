/* KatzenSchutz Miez – DSGVO Cookie-Consent (3 Kategorien)
   Wesentlich (immer aktiv), Funktionell = Google Analytics 4,
   Marketing = Meta-Pixel. Laden NUR nach einem Klick auf einen Button.
   Schalter stehen nebeneinander und sind anfangs vorausgewählt.
   Widerruf jederzeit über "Cookie-Einstellungen" im Footer. */
(function () {
  var GA_ID = 'G-44LYYME2NX';
  var META_PIXEL_ID = '2082663425935593';
  var KEY = 'ksm_consent_v2';

  // GA4-Property und Meta-Pixel gehören zur LIVE-Seite katzenschutz-miez.de.
  // Auf der Vorschau (github.io) und lokal NIE laden, sonst verfälschen
  // Test-Besuche die echten Statistiken und Conversions.
  var TRACKING_ALLOWED = /(^|\.)katzenschutz-miez\.de$/.test(location.hostname);
  if (!TRACKING_ALLOWED) { GA_ID = ''; META_PIXEL_ID = ''; }

  // Basis-Pfad aus dem eigenen <script src> ableiten (z. B. /katzenschutz-vorschau/),
  // damit Links auch unter dem GitHub-Pages-Unterpfad stimmen.
  var BASE = (function () {
    var s = document.currentScript;
    if (!s) {
      var all = document.querySelectorAll('script[src]');
      for (var i = 0; i < all.length; i++) {
        if (/consent\.js/.test(all[i].src)) { s = all[i]; break; }
      }
    }
    if (s && s.src) { try { return new URL('.', s.src).pathname; } catch (e) {} }
    return '/';
  })();

  function loadGA() {
    if (!GA_ID || window.__ksmGA) return;
    window.__ksmGA = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function loadMeta() {
    if (!META_PIXEL_ID || window.__ksmMeta) return;
    window.__ksmMeta = true;
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s)
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', META_PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  function apply(p) {
    if (p && p.functional) loadGA();
    if (p && p.marketing) loadMeta();
  }

  function read() {
    try { var r = localStorage.getItem(KEY); return r ? JSON.parse(r) : null; } catch (e) { return null; }
  }
  function write(p) { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch (e) {} }

  function lockScroll(lock) {
    document.documentElement.style.overflow = lock ? 'hidden' : '';
    document.body.style.overflow = lock ? 'hidden' : '';
  }

  var saved = read();
  if (saved) apply(saved);

  function injectStyle() {
    if (document.getElementById('ksm-c-style')) return;
    var css = ''
      + '.ksm-c-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:1.2rem;background:rgba(10,8,20,.55);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);animation:ksmFade .25s ease}'
      + '@keyframes ksmFade{from{opacity:0}to{opacity:1}}'
      + '.ksm-c-card{background:#fff;color:#002641;max-width:600px;width:100%;max-height:88vh;overflow:auto;border-radius:20px;padding:1.8rem 1.8rem;box-shadow:0 24px 70px rgba(0,0,0,.45);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;animation:ksmPop .28s cubic-bezier(.2,.8,.3,1.2)}'
      + '@keyframes ksmPop{from{transform:translateY(16px) scale(.96);opacity:0}to{transform:none;opacity:1}}'
      + '.ksm-c-card h3{font-size:1.2rem;font-weight:900;margin:0 0 .8rem}'
      + '.ksm-c-card .ksm-legal{font-size:.8rem;line-height:1.6;color:#555;margin:0 0 1rem}'
      + '.ksm-c-card .ksm-legal a{color:#0071b2;font-weight:700}'
      + '.ksm-c-links{font-size:.74rem;margin:0 0 1rem}'
      + '.ksm-c-links a{color:#999;margin-right:1rem}'
      + '.ksm-c-links a:hover{color:#555}'
      + '.ksm-cats{display:flex;flex-wrap:wrap;gap:.6rem 1.6rem;padding:.9rem 0;border-top:1px solid #eee;border-bottom:1px solid #eee;margin-bottom:1.2rem}'
      + '.ksm-cat{display:flex;align-items:center;gap:.5rem;font-size:.82rem;font-weight:700;color:#444}'
      + '.ksm-sw{position:relative;flex:0 0 auto;width:34px;height:19px}'
      + '.ksm-sw input{opacity:0;width:0;height:0}'
      + '.ksm-sw .sl{position:absolute;inset:0;background:#d3d3da;border-radius:19px;transition:.2s;cursor:pointer}'
      + '.ksm-sw .sl:before{content:"";position:absolute;height:13px;width:13px;left:3px;top:3px;background:#fff;border-radius:50%;transition:.2s;box-shadow:0 1px 2px rgba(0,0,0,.2)}'
      + '.ksm-sw input:checked + .sl{background:#0071b2}'
      + '.ksm-sw input:checked + .sl:before{transform:translateX(15px)}'
      + '.ksm-sw input:disabled + .sl{background:#b9d4ec;cursor:not-allowed}'
      + '.ksm-c-btns{display:flex;gap:.7rem;flex-wrap:wrap}'
      + '.ksm-c-btns button{flex:1;min-width:160px;border:none;border-radius:30px;padding:.85rem 1.2rem;font-weight:800;font-size:.9rem;cursor:pointer;font-family:inherit}'
      + '.ksm-c-save{background:#e0f0fa;color:#002641}'
      + '.ksm-c-save:hover{background:#d0e6f5}'
      + '.ksm-c-yes{background:#0071b2;color:#fff;box-shadow:0 8px 22px rgba(0,113,178,.4)}'
      + '.ksm-c-yes:hover{background:#005a8f}'
      + '@media(max-width:520px){.ksm-cats{flex-direction:column;gap:.7rem}}';
    var style = document.createElement('style');
    style.id = 'ksm-c-style';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function open() {
    if (document.querySelector('.ksm-c-overlay')) return;
    injectStyle();
    var cur = read() || { functional: true, marketing: true };

    var ov = document.createElement('div');
    ov.className = 'ksm-c-overlay';
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-modal', 'true');
    ov.setAttribute('aria-label', 'Cookie-Einstellungen');
    ov.innerHTML =
      '<div class="ksm-c-card">'
      + '<h3>Cookie-Einstellungen</h3>'
      + '<div class="ksm-legal">Diese Webseite nutzt Cookies und vergleichbare Technologien. Ein Teil davon ist für das fehlerfreie Funktionieren der Seite erforderlich (Wesentlich). Andere dienen der Auswertung des Nutzerverhaltens (Funktionell) oder dem Ausspielen interessengerechter Werbung (Marketing) und werden erst nach deiner Einwilligung aktiviert. Du kannst deine Einwilligung jederzeit über „Cookie-Einstellungen" im Footer dieser Webseite widerrufen.<br><br>Hinweis: Diese Webseite verwendet Technologien aus den USA (Google Analytics, Meta). Wenn du zustimmst, willigst du nach Art. 49 Abs. 1 lit. a DSGVO ein, dass deine Daten in die USA übermittelt werden. Die USA haben kein mit der EU vergleichbares Datenschutzniveau, und US-Unternehmen können von US-Behörden zur Herausgabe deiner Daten verpflichtet werden, ohne dass dir dagegen wirksame Rechtsmittel zustehen. Details in der <a href="' + BASE + 'datenschutz.html">Datenschutzerklärung</a>.</div>'
      + '<div class="ksm-c-links"><a href="' + BASE + 'datenschutz.html">Datenschutzerklärung</a><a href="' + BASE + 'impressum.html">Impressum</a></div>'
      + '<div class="ksm-cats">'
      + '<div class="ksm-cat"><label class="ksm-sw"><input type="checkbox" checked disabled><span class="sl"></span></label>Wesentlich</div>'
      + '<div class="ksm-cat"><label class="ksm-sw"><input type="checkbox" id="ksm-fn"' + (cur.functional ? ' checked' : '') + '><span class="sl"></span></label>Funktionell</div>'
      + '<div class="ksm-cat"><label class="ksm-sw"><input type="checkbox" id="ksm-mk"' + (cur.marketing ? ' checked' : '') + '><span class="sl"></span></label>Marketing</div>'
      + '</div>'
      + '<div class="ksm-c-btns">'
      + '<button class="ksm-c-save" type="button">Auswahl speichern</button>'
      + '<button class="ksm-c-yes" type="button">Alle akzeptieren</button>'
      + '</div>'
      + '</div>';
    document.body.appendChild(ov);
    lockScroll(true);

    function close() { lockScroll(false); if (ov.parentNode) ov.parentNode.removeChild(ov); }
    function finish(p) {
      var downgrade = (window.__ksmGA && !p.functional) || (window.__ksmMeta && !p.marketing);
      write(p); close();
      if (downgrade) { location.reload(); return; }
      apply(p);
    }

    ov.querySelector('.ksm-c-yes').addEventListener('click', function () {
      finish({ functional: true, marketing: true });
    });
    ov.querySelector('.ksm-c-save').addEventListener('click', function () {
      finish({ functional: ov.querySelector('#ksm-fn').checked, marketing: ov.querySelector('#ksm-mk').checked });
    });
  }

  window.ksmOpenConsent = open;

  function ready(fn) { if (document.body) fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function () {
    var links = document.querySelectorAll('.ksm-cookie-settings');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function (e) { e.preventDefault(); open(); });
    }
    if (!saved) open();
  });
})();
