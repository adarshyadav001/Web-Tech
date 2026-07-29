// ABES Engineering College — progressive enhancement
// (Site is fully usable/readable with JS disabled; this only adds polish.)

document.addEventListener('DOMContentLoaded', function () {

    /* Sticky header shadow on scroll */
    var header = document.getElementById('siteHeader');
    var onScroll = function () {
        if (window.scrollY > 8) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* Mobile nav toggle */
    var toggle = document.getElementById('navToggle');
    var nav = document.getElementById('mainNav');
    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            var isOpen = nav.classList.toggle('open');
            toggle.classList.toggle('open', isOpen);
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                nav.classList.remove('open');
                toggle.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* Scroll-reveal for elements marked .reveal */
    var revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealEls.length) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        revealEls.forEach(function (el) { io.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add('in-view'); });
    }

    /* Animated stat counters */
    var stats = document.querySelectorAll('.stat-number');
    var animateStat = function (el) {
        var target = parseInt(el.getAttribute('data-target'), 10) || 0;
        var suffix = el.getAttribute('data-suffix') || '';
        var duration = 1400;
        var start = null;

        function step(timestamp) {
            if (!start) start = timestamp;
            var progress = Math.min((timestamp - start) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var value = Math.floor(eased * target);
            el.textContent = value.toLocaleString() + suffix;
            if (progress < 1) window.requestAnimationFrame(step);
            else el.textContent = target.toLocaleString() + suffix;
        }
        window.requestAnimationFrame(step);
    };

    if ('IntersectionObserver' in window && stats.length) {
        var statIo = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateStat(entry.target);
                    statIo.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });
        stats.forEach(function (el) { statIo.observe(el); });
    } else {
        stats.forEach(function (el) {
            var target = parseInt(el.getAttribute('data-target'), 10) || 0;
            var suffix = el.getAttribute('data-suffix') || '';
            el.textContent = target.toLocaleString() + suffix;
        });
    }
});
