// Gallery navigation for event detail pages — prev/next + keyboard
(function () {
  var _imgs = [];
  var _idx = 0;

  var _style = document.createElement('style');
  _style.textContent =
    '#modal-gallery-nav{display:flex;align-items:center;gap:20px;margin-top:20px}' +
    '.mg-btn{background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.25);color:#fff;' +
    'font-size:18px;width:42px;height:42px;border-radius:50%;cursor:pointer;' +
    'transition:background 0.2s;display:flex;align-items:center;justify-content:center;padding:0}' +
    '.mg-btn:hover{background:rgba(255,255,255,0.25)}' +
    '#mg-count{color:#fff;font-size:12px;opacity:0.5;min-width:44px;text-align:center;' +
    'font-family:var(--font-mono,monospace);letter-spacing:0.08em}';
  document.head.appendChild(_style);

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.img-grid .image-overlay span[onclick]').forEach(function (el) {
      var m = el.getAttribute('onclick').match(/openModal\(event,\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]/);
      if (m) _imgs.push({ src: m[1], title: m[2] });
    });

    if (_imgs.length < 2) return;

    var content = document.querySelector('#imageModal .modal-content');
    if (!content) return;

    var nav = document.createElement('div');
    nav.id = 'modal-gallery-nav';
    nav.innerHTML =
      '<button class="mg-btn" onclick="mgStep(-1)">&#8592;</button>' +
      '<span id="mg-count"></span>' +
      '<button class="mg-btn" onclick="mgStep(1)">&#8594;</button>';
    content.appendChild(nav);

    var _orig = window.openModal;
    window.openModal = function (evt, src, title) {
      _idx = _imgs.findIndex(function (i) { return i.src === src; });
      if (_idx === -1) _idx = 0;
      _orig(evt, src, title);
      _mgUpdate();
    };

    document.addEventListener('keydown', function (e) {
      var modal = document.getElementById('imageModal');
      if (!modal || !modal.classList.contains('active')) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); mgStep(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); mgStep(1); }
    });
  });

  function _mgShow(item) {
    var img = document.getElementById('modalImage');
    var iframe = document.getElementById('modalIframe');
    var vid = document.getElementById('modalVideo');
    var titleEl = document.getElementById('modalTitle');
    if (titleEl) titleEl.textContent = item.title;
    if (item.src.indexOf('drive.google.com') !== -1) {
      if (img) { img.style.display = 'none'; img.src = ''; }
      if (vid) { vid.style.display = 'none'; vid.src = ''; }
      if (iframe) { iframe.src = item.src; iframe.style.display = 'block'; }
    } else if (/\.(mp4|webm|mov)$/i.test(item.src)) {
      if (img) { img.style.display = 'none'; img.src = ''; }
      if (iframe) { iframe.style.display = 'none'; iframe.src = ''; }
      if (vid) { vid.src = item.src; vid.style.display = 'block'; }
    } else {
      if (vid) { vid.style.display = 'none'; vid.src = ''; }
      if (iframe) { iframe.style.display = 'none'; iframe.src = ''; }
      if (img) { img.src = item.src; img.style.display = 'block'; }
    }
  }

  function _mgUpdate() {
    var el = document.getElementById('mg-count');
    if (el) el.textContent = (_idx + 1) + ' / ' + _imgs.length;
  }

  window.mgStep = function (dir) {
    _idx = (_idx + dir + _imgs.length) % _imgs.length;
    _mgShow(_imgs[_idx]);
    _mgUpdate();
  };
})();
