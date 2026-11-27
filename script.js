document.getElementById('year').textContent = new Date().getFullYear();

// Add a restrained perspective response to the hero artwork on pointer devices.
const art = document.querySelector('.hero-art');
const cube = document.querySelector('.cube-scene');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (art && cube && !reducedMotion && window.matchMedia('(pointer: fine)').matches) {
  art.addEventListener('pointermove', (event) => {
    const box = art.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    cube.style.transform = `rotate(${-25 + x * 8}deg) rotateX(${8 - y * 8}deg) translateY(${y * -8}px)`;
  });
  art.addEventListener('pointerleave', () => { cube.style.transform = ''; });
}

// Decorative miniature of the Sudoku project showcased in the portfolio.
const board = document.getElementById('sudoku-board');
if (board) {
  const puzzle = [
    '530070000', '600195000', '098000060',
    '800060003', '400803001', '700020006',
    '060000280', '000419005', '000080079'
  ].join('');
  const highlightedCells = new Set([11, 39, 68]);

  [...puzzle].forEach((digit, index) => {
    const cell = document.createElement('span');
    cell.className = 'sudoku-cell';
    if (digit !== '0') {
      cell.textContent = digit;
      cell.classList.add('is-fixed');
    }
    if (highlightedCells.has(index)) {
      cell.textContent = digit === '0' ? '7' : digit;
      cell.classList.remove('is-fixed');
      cell.classList.add('is-highlight');
    }
    board.appendChild(cell);
  });
}

// Keep the tech labels moving around a small 3D globe without a rendering library.
const orbitTrack = document.getElementById('tech-orbit-track');
const globe = document.querySelector('.tech-globe');
if (orbitTrack && globe) {
  const nodes = [...orbitTrack.querySelectorAll('.tech-node')];
  const shouldAnimate = !reducedMotion;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  let orbitFrame = 0;

  const paintOrbit = (time = 0) => {
    if (document.hidden) return;
    const rotation = shouldAnimate ? time * 0.00017 : 0;
    const radius = 139;
    nodes.forEach((node, index) => {
      const latitude = Math.acos(1 - (2 * (index + 0.5)) / nodes.length);
      const longitude = index * goldenAngle + rotation;
      const x = radius * Math.sin(latitude) * Math.cos(longitude);
      const y = radius * 0.62 * Math.cos(latitude);
      const z = radius * 0.88 * Math.sin(latitude) * Math.sin(longitude);
      const depth = (z / radius + 1) / 2;
      const scale = 0.74 + depth * 0.3;
      node.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`;
      node.style.opacity = `${0.3 + depth * 0.7}`;
      node.style.zIndex = `${Math.round(z + radius)}`;
    });
    if (shouldAnimate) orbitFrame = requestAnimationFrame(paintOrbit);
  };

  paintOrbit();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(orbitFrame);
    else if (shouldAnimate) orbitFrame = requestAnimationFrame(paintOrbit);
  });
}

// A restrained tilt and cursor glow inspired by interactive component libraries.
const tiltCards = document.querySelectorAll('.project-card, .project-featured, .project-sudoku');
if (!reducedMotion && window.matchMedia('(pointer: fine)').matches) {
  tiltCards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      card.style.setProperty('--spot-x', `${x * 100}%`);
      card.style.setProperty('--spot-y', `${y * 100}%`);
      card.style.setProperty('--card-tilt-x', `${((0.5 - y) * 3.5).toFixed(2)}deg`);
      card.style.setProperty('--card-tilt-y', `${((x - 0.5) * 5).toFixed(2)}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--card-tilt-x', '0deg');
      card.style.setProperty('--card-tilt-y', '0deg');
    });
  });
}
