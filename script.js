// script.js
window.addEventListener('load', () => {
  const container      = document.querySelector('.container');
  const popup          = document.getElementById('popupOverlay');
  const confirmOverlay = document.getElementById('confirmOverlay');
  const music          = document.getElementById('birthdayMusic');
  const timer          = document.getElementById('timerText');
  const targetDate     = new Date('2025-05-10T00:00:00').getTime();

  // — Inisialisasi Audio & Loop Manual 0:38–1:16 —
  music.volume = 0.5;
  music.load();
  music.addEventListener('timeupdate', () => {
    if (music.currentTime >= 76) {
      music.currentTime = 38;
      music.play();
    }
  });
  function playFrom38() {
    music.currentTime = 38;
    music.play();
  }

    // helper: play confetti
  function throwConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  // wrapper untuk animasi tombol + confetti
  function animateButton(btn) {
    btn.classList.add('clicked');
    setTimeout(() => btn.classList.remove('clicked'), 400);
    throwConfetti();
  }

  // — Tombol “Mauuu” —
  const enterBtn = document.getElementById('enterSite');
  enterBtn?.addEventListener('click', () => {
    animateButton(enterBtn);
    popup.classList.remove('visible');
    container.classList.remove('blurred');
    playFrom38();
  });

  // — Tombol “Tidak dehh, bercanda” —
  const noBtn = document.getElementById('confirmNo');
  noBtn?.addEventListener('click', () => {
    animateButton(noBtn);
    confirmOverlay.classList.remove('visible');
    container.classList.remove('blurred');
    playFrom38();
  });

  // — Pesan Tersembunyi —
  document.getElementById('openMessage')?.addEventListener('click', () => {
    const hm = document.getElementById('hiddenMessage');
    if (!hm) return;
    hm.classList.toggle('hidden');
    document.getElementById('openMessage').textContent =
      hm.classList.contains('hidden') ? 'Buka Pesan' : 'Tutup Pesan';
  });

  // — Countdown Timer —
  function tick() {
    let diff = targetDate - Date.now();
    if (diff < 0) diff = Math.abs(diff);
    const d = Math.floor(diff / 86400000);             // hari
    const h = Math.floor((diff % 86400000) / 3600000); // jam
    const m = Math.floor((diff % 3600000) / 60000);    // menit
    const s = Math.floor((diff % 60000) / 1000);       // detik
    timer.textContent =
      `${String(d).padStart(2, '0')} day ${String(h).padStart(2, '0')} hour ` +
      `${String(m).padStart(2, '0')} minute ${String(s).padStart(2, '0')} second`;
  }
  if (timer) {
    tick();
    setInterval(tick, 1000);
  }

  // — Tampilkan Pop-up Utama Sekali Per Sesi —
  if (popup && !sessionStorage.getItem('popupShown')) {
    popup.classList.add('visible');
    container.classList.add('blurred');
    sessionStorage.setItem('popupShown', 'true');
  }

  // — Tombol “Mauuu” → tutup popup & play musik —
  document.getElementById('enterSite')?.addEventListener('click', () => {
    popup.classList.remove('visible');
    container.classList.remove('blurred');
    playFrom38();
  });

  // — Tombol “Tak nakk” → buka popup konfirmasi —
  document.getElementById('exitSite')?.addEventListener('click', () => {
    popup.classList.remove('visible');
    confirmOverlay.classList.add('visible');
    // container tetap blur
  });

  // — Tombol “Iyaa” konfirmasi → keluar tanpa musik —
  document.getElementById('confirmYes')?.addEventListener('click', () => {
    window.close();
    setTimeout(() => (window.location.href = 'about:blank'), 100);
  });

  // — Tombol “Tidak dehh, bercanda” → tutup confirm & play musik —
  document.getElementById('confirmNo')?.addEventListener('click', () => {
    confirmOverlay.classList.remove('visible');
    container.classList.remove('blurred');
    playFrom38();
  });
});