/* Masthead — page behavior. No dependencies; every feature is optional.
   Without JS the page is fully readable: nothing starts hidden. */
(function () {
  var root = document.documentElement;
  var reduced = (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) || /[?&]static\b/.test(location.search);

  // Theme toggle. The <head> snippet applies a saved choice before first paint;
  // this keeps html.dark in sync (for the icon) and flips light <-> dark on click.
  var darkMq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  function isDark() {
    var t = root.getAttribute('data-theme');
    return t ? t === 'dark' : !!(darkMq && darkMq.matches);
  }
  function syncTheme() { root.classList.toggle('dark', isDark()); }
  syncTheme();
  if (darkMq && darkMq.addEventListener) darkMq.addEventListener('change', syncTheme);
  [].forEach.call(document.querySelectorAll('.theme'), function (btn) {
    btn.addEventListener('click', function () {
      var next = isDark() ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('masthead-theme', next); } catch (e) {}
      syncTheme();
    });
  });

  // Copy buttons: a .copy inside a .citebox copies that box's <pre>.
  [].forEach.call(document.querySelectorAll('.citebox .copy'), function (btn) {
    var t, label = btn.textContent;
    btn.addEventListener('click', function () {
      var pre = btn.parentNode.querySelector('pre');
      try { if (navigator.clipboard) navigator.clipboard.writeText(pre.textContent); } catch (e) {}
      btn.textContent = 'Copied';
      clearTimeout(t); t = setTimeout(function () { btn.textContent = label; }, 1600);
    });
  });

  // Stat numbers that are too wide for their cell get scaled down to fit (the HTML holds the final value).
  var statNums = [].slice.call(document.querySelectorAll('.stat .n'));
  function fitStats() {
    statNums.forEach(function (el) {
      el.style.fontSize = '';
      var room = el.parentNode.clientWidth - parseFloat(getComputedStyle(el.parentNode).paddingLeft) - parseFloat(getComputedStyle(el.parentNode).paddingRight);
      if (el.scrollWidth > room) el.style.fontSize = (parseFloat(getComputedStyle(el).fontSize) * room / el.scrollWidth) + 'px';
    });
  }
  if (statNums.length) {
    fitStats();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitStats);
    var fitT; window.addEventListener('resize', function () { clearTimeout(fitT); fitT = setTimeout(fitStats, 100); });
  }

  // Motion: scroll reveals and stat count-up. Skipped under prefers-reduced-motion.
  // Add data-reveal to any element to opt it in; the defaults below cover the stock modules.
  if ('IntersectionObserver' in window && !reduced) {
    var rvSel = '.hero .lead, .hero-crest, .reslist .btn, .byline, .stat, .lede, .abs-grid .prose, .sec>h2, .sec .fig, .sec .fig-row, .keys>div, .callout, .citebox, [data-reveal]';
    var rvEls = [].slice.call(document.querySelectorAll(rvSel));
    rvEls.forEach(function (el) { el.classList.add('rv'); });
    var seen = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('rv-in');
        if (e.target.classList.contains('stats')) countStats(e.target);
        seen.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    rvEls.forEach(function (el) { seen.observe(el); });
    [].forEach.call(document.querySelectorAll('.stats'), function (s) { seen.observe(s); });
  }
  // <span class="n" data-n="42.5" data-dec="1">42.5<small>%</small></span>: counts the leading text node up to data-n
  function countStats(box) {
    [].forEach.call(box.querySelectorAll('.n[data-n]'), function (el) {
      var target = parseFloat(el.getAttribute('data-n'));
      var dec = parseInt(el.getAttribute('data-dec') || '0', 10);
      var node = el.firstChild, t0 = null, dur = 950;
      if (!node || node.nodeType !== 3) return;
      function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min(1, (ts - t0) / dur);
        p = 1 - Math.pow(1 - p, 3);
        node.nodeValue = (target * p).toFixed(dec);
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  // Autoplay videos (muted loop) only while on screen, and never under reduced motion.
  [].forEach.call(document.querySelectorAll('video[data-autoplay]'), function (v) {
    v.muted = true;
    if (reduced) { v.setAttribute('controls', ''); return; }
    if (!('IntersectionObserver' in window)) { v.play().catch(function () {}); return; }
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) v.play().catch(function () {}); else v.pause(); });
    }, { threshold: 0.25 }).observe(v);
  });

  // Nav highlight for the section in view.
  if ('IntersectionObserver' in window) {
    var links = {};
    [].forEach.call(document.querySelectorAll('.nav a'), function (a) {
      var h = a.getAttribute('href');
      if (h && h.charAt(0) === '#' && h.length > 1) links[h.slice(1)] = a;
    });
    var obs = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        for (var k in links) links[k].classList.remove('active');
        var a = links[e.target.id];
        if (!a) return;
        a.classList.add('active');
        // on phones the nav is one scrollable row: bring the active link into view
        var nav = a.parentNode;
        if (nav.scrollWidth > nav.clientWidth) {
          var x = a.offsetLeft - (nav.clientWidth - a.offsetWidth) / 2;
          nav.scrollTo({ left: Math.max(0, x), behavior: reduced ? 'auto' : 'smooth' });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(links).forEach(function (id) { var el = document.getElementById(id); if (el) obs.observe(el); });
  }
})();
