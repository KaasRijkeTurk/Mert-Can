/* ============================================
   DNA CANVAS ANIMATIE (ACHTERGROND)
   ============================================ */
const canvas = document.getElementById('dna-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const bases = ['A', 'T', 'G', 'C'];
const strands = [];
const STRAND_COUNT = 8;

for (let i = 0; i < STRAND_COUNT; i++) {
  strands.push({
    x: (canvas.width / STRAND_COUNT) * i + 60,
    offset: Math.random() * Math.PI * 2,
    speed: 0.002 + Math.random() * 0.002,
    amplitude: 30 + Math.random() * 40,
  });
}

let tick = 0;

function drawDNA() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const STEP = 28;
  const rows = Math.floor(canvas.height / STEP) + 2;

  strands.forEach(strand => {
    for (let row = 0; row < rows; row++) {
      const y = row * STEP - (tick * strand.speed * 1000 % (STEP));
      const wave = Math.sin(row * 0.35 + strand.offset + tick * strand.speed * 60) * strand.amplitude;
      const x1 = strand.x + wave;
      const x2 = strand.x - wave;

      // Backbone links
      ctx.beginPath();
      ctx.moveTo(x1, y);
      ctx.lineTo(x2, y);
      ctx.strokeStyle = 'rgba(0, 229, 160, 0.25)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Knooppunten
      ctx.beginPath();
      ctx.arc(x1, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 180, 255, 0.6)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x2, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 229, 160, 0.6)';
      ctx.fill();

      // Letters
      if (row % 3 === 0) {
        const base = bases[Math.floor((row + strand.x) % 4)];
        ctx.font = '9px Space Mono, monospace';
        ctx.fillStyle = 'rgba(0, 229, 160, 0.4)';
        ctx.fillText(base, x1 + 5, y + 3);
      }
    }
  });

  tick++;
  requestAnimationFrame(drawDNA);
}

drawDNA();


/* ============================================
   SCROLL REVEAL
   ============================================ */
const revealEls = document.querySelectorAll(
  'section > *, .project-card, .stat-card, .skill-group'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));


/* ============================================
   ACTIVE NAV LINK
   ============================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 200) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}`
      ? 'var(--accent)'
      : '';
  });
});
