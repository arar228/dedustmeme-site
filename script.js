// Copy CA
const copyBtn = document.getElementById('copy-btn');
const caText = document.getElementById('ca-text');
const toast = document.getElementById('toast');

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('is-show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('is-show'), 1600);
}

copyBtn.addEventListener('click', async () => {
  const text = caText.textContent.trim();
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Fallback
    const r = document.createRange();
    r.selectNode(caText);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(r);
    document.execCommand('copy');
    sel.removeAllRanges();
  }
  copyBtn.classList.add('is-copied');
  copyBtn.querySelector('.ca__copy-text').textContent = '已复制';
  showToast('合约地址已复制 ✓');
  setTimeout(() => {
    copyBtn.classList.remove('is-copied');
    copyBtn.querySelector('.ca__copy-text').textContent = '复制';
  }, 1800);
});

// Smooth scroll for nav (CSS handles it but fix offset for sticky nav)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    const y = el.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
});

// Reveal on scroll
const revealEls = document.querySelectorAll('.section, .stat, .bless-card, .step, .rm-item, .tweet, .hero__copy');
revealEls.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => io.observe(el));

// Tweet card slight tilt on mouse
const tweet = document.querySelector('.tweet');
if (tweet && window.matchMedia('(hover: hover)').matches) {
  tweet.addEventListener('mousemove', e => {
    const r = tweet.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    tweet.style.transform = `rotate(${0 + px * 2}deg) perspective(900px) rotateY(${px * 4}deg) rotateX(${-py * 4}deg)`;
  });
  tweet.addEventListener('mouseleave', () => {
    tweet.style.transform = '';
  });
}

// Konami: 红包 mode (rain of red envelopes)
let buf = '';
const KONAMI = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba';
window.addEventListener('keydown', e => {
  buf = (buf + e.key).slice(-KONAMI.length);
  if (buf === KONAMI) hongbaoRain();
});

function hongbaoRain() {
  const layer = document.createElement('div');
  layer.style.cssText = 'position:fixed;inset:0;z-index:200;pointer-events:none;overflow:hidden';
  document.body.appendChild(layer);
  const emojis = ['🧧', '🐉', '🏮', '💰', '🟧'];
  let n = 0;
  const t = setInterval(() => {
    const s = document.createElement('div');
    s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    s.style.cssText = `position:absolute;left:${Math.random()*100}%;top:-40px;font-size:${24 + Math.random()*28}px;transition:transform 4s linear, opacity 4s;`;
    layer.appendChild(s);
    requestAnimationFrame(() => {
      s.style.transform = `translateY(${window.innerHeight + 80}px) rotate(${(Math.random()-0.5)*720}deg)`;
      s.style.opacity = '0.2';
    });
    setTimeout(() => s.remove(), 4200);
    if (++n > 80) { clearInterval(t); setTimeout(() => layer.remove(), 4500); }
  }, 70);
}
