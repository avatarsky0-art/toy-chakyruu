/* ============================================================
   БААРЫН УШУЛ ЖЕРДЕН ӨЗГӨРТӨСҮҢӨР 👇
   ============================================================ */
const CONFIG = {
  // Той башталчу убакыт (жыл, ай-1, күн, саат, мүнөт)
  // ЭСКЕРТҮҮ: ай 0дон башталат → 10 = НОЯБРЬ
  weddingDate: new Date(2026, 10, 14, 14, 0, 0),

  // Календарда көрсөтүлчү ай
  calendarYear: 2026,
  calendarMonth: 10,   // 10 = ноябрь
  calendarDay: 14,     // жүрөкчө коюлчу күн

  // WhatsApp аркылуу ырастоо
  whatsappPhone: "996700123456",            // өз номериңер (+ жана боштук жок)
  whatsappText: "Салам! Мирбек менен Мээримдин тоюна катышам. Аты-жөнүм: ",

  // QR-коддун ичиндеги маалымат (шилтеме, карта номери ж.б.)
  qrData: "MBANK 0700123456 Mirbek A."
};

/* ============================================================
   Төмөн жагын өзгөртпөсөңөр деле болот
   ============================================================ */

/* ---------- Конвертти ачуу ---------- */
const cover  = document.getElementById('cover');
const audio  = document.getElementById('audio');
const playBtn= document.getElementById('playBtn');

document.body.classList.add('locked');

document.getElementById('openBtn').addEventListener('click', () => {
  cover.classList.add('opening');                 // капкак ачылат
  audio.volume = 0.6;
  audio.play().then(() => playBtn.classList.add('playing')).catch(()=>{});
  setTimeout(() => {
    cover.classList.add('hide');
    document.body.classList.remove('locked');
  }, 700);
  setTimeout(() => cover.remove(), 1700);
});

/* ---------- Музыка ---------- */
playBtn.addEventListener('click', () => {
  if (audio.paused) { audio.play(); playBtn.classList.add('playing'); }
  else { audio.pause(); playBtn.classList.remove('playing'); }
});

const bar = document.getElementById('bar');
audio.addEventListener('timeupdate', () => {
  if (audio.duration) bar.style.width = (audio.currentTime / audio.duration * 100) + '%';
});
document.getElementById('progress').addEventListener('click', e => {
  const r = e.currentTarget.getBoundingClientRect();
  if (audio.duration) audio.currentTime = (e.clientX - r.left) / r.width * audio.duration;
});

/* ---------- Тойго чейинки саноо ---------- */
const pad = n => String(n).padStart(2, '0');
function tick() {
  const diff = CONFIG.weddingDate - new Date();
  if (diff <= 0) {
    document.getElementById('countdown').innerHTML =
      '<div style="min-width:auto"><b style="font-size:26px">Бүгүн улуу күн!</b></div>';
    return;
  }
  const s = Math.floor(diff / 1000);
  document.getElementById('cd-d').textContent = pad(Math.floor(s / 86400));
  document.getElementById('cd-h').textContent = pad(Math.floor(s % 86400 / 3600));
  document.getElementById('cd-m').textContent = pad(Math.floor(s % 3600 / 60));
  document.getElementById('cd-s').textContent = pad(s % 60);
}
tick(); setInterval(tick, 1000);

/* ---------- Календарь ---------- */
(function buildCalendar() {
  const dows = ['ДҮЙ','ШЕЙ','ШАР','БЕЙ','ЖУМ','ИШЕ','ЖЕК'];
  const el = document.getElementById('calendar');
  const y = CONFIG.calendarYear, m = CONFIG.calendarMonth;
  let html = dows.map(d => `<div class="dow">${d}</div>`).join('');

  const first = new Date(y, m, 1);
  const shift = (first.getDay() + 6) % 7;             // дүйшөмбүдөн башталат
  const days  = new Date(y, m + 1, 0).getDate();
  const prev  = new Date(y, m, 0).getDate();

  for (let i = shift; i > 0; i--) html += `<div class="day off">${prev - i + 1}</div>`;
  for (let d = 1; d <= days; d++)
    html += `<div class="day${d === CONFIG.calendarDay ? ' today' : ''}">${d}</div>`;
  const tail = (7 - (shift + days) % 7) % 7;
  for (let i = 1; i <= tail; i++) html += `<div class="day off">${i}</div>`;

  el.innerHTML = html;
})();

/* ---------- Ырастоо баскычы ---------- */
document.getElementById('rsvpBtn').href =
  `https://wa.me/${CONFIG.whatsappPhone}?text=${encodeURIComponent(CONFIG.whatsappText)}`;

/* ---------- QR-код ----------
   Эгер интернеттен китепкана жүктөлсө — CONFIG.qrData'дан кайра түзүлөт,
   жүктөлбөсө img/qr.png дайыма көрүнүп турат. */
window.addEventListener('load', () => {
  const box = document.getElementById('qrcode');
  if (box && window.QRCode) {
    box.innerHTML = '';
    new QRCode(box, {
      text: CONFIG.qrData,
      width: 300, height: 300,
      colorDark: '#6E7553', colorLight: '#F4F0E6',
      correctLevel: QRCode.CorrectLevel.M
    });
  }
});

/* ---------- Скроллдогу анимация ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
}, { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
