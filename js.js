document.addEventListener("DOMContentLoaded", function () {
  // Inisialisasi animasi AOS (Animate On Scroll)
  AOS.init({ offset: 0 });

  // Fungsi untuk membuka hamburger menu
  window.hamburg = function () {
    const dropdown = document.querySelector(".dropdown");
    if (dropdown) dropdown.style.transform = "translateY(0px)";
  };

  // Fungsi untuk menutup hamburger menu
  window.cancel = function () {
    const dropdown = document.querySelector(".dropdown");
    if (dropdown) dropdown.style.transform = "translateY(-500px)";
  };

  // Hitung mundur menuju tanggal acara
  const targetDate = new Date("2025-12-20T08:00:00").getTime();
  const timer = setInterval(function () {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Jika sudah lewat dari tanggal acara
    if (distance < 0) {
      clearInterval(timer);
      document.getElementById("timer").innerHTML = "<p>Acara telah dimulai!</p>";
      return;
    }

    // Hitung sisa waktu: hari, jam, menit, detik
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Tampilkan hasil hitung mundur
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
  }, 1000);

  // Form RSVP
  const rsvpForm = document.getElementById("rsvpForm");
  const rsvpResult = document.getElementById("rsvpResult");
  const rsvpData = [];

  if (rsvpForm) {
    rsvpForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Ambil data dari form
      const nama = document.getElementById("nama").value;
      const email = document.getElementById("email").value;
      const kehadiran = document.getElementById("kehadiran").value;
      const pesan = document.getElementById("pesan").value;

      // Simpan ke array
      rsvpData.push({ nama, email, kehadiran, pesan });

      // Hanya tampilkan 5 data terakhir
      if (rsvpData.length > 5) rsvpData.shift();

      // Urutkan dari Z ke A berdasarkan nama
      rsvpData.sort((a, b) => b.nama.localeCompare(a.nama));

      // Tampilkan hasil RSVP
      rsvpResult.innerHTML = rsvpData.map(data => `
        <div>
          <h3>Data RSVP Terkirim:</h3>
          <p><strong>Nama:</strong> ${data.nama}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Kehadiran:</strong> ${data.kehadiran}</p>
          <p><strong>Pesan:</strong> ${data.pesan}</p>
          <hr>
        </div>
      `).join("");

      // Reset form setelah submit
      this.reset();
    });
  }

  // Form Hadiah
const giftForm = document.getElementById("giftForm");
const giftResult = document.getElementById("giftResult");
const giftData = [];

if (giftForm) {
  giftForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Ambil data dari form (ID sesuai HTML)
    const nama = document.getElementById("nama_pengirim").value;
    const metode = document.getElementById("metode").value;
    const hp = document.getElementById("nomor_telepon").value;
    const pesan = document.getElementById("pesan").value;

    // Simpan ke array
    giftData.push({ nama, metode, hp, pesan });

    // Urutkan dari A ke Z berdasarkan nama
    giftData.sort((a, b) => a.nama.localeCompare(b.nama));

    // Ambil 5 data terakhir setelah diurutkan
    const latestFive = giftData.slice(-5);

    // Tampilkan hasil hadiah
    giftResult.innerHTML = "<h3>Data Hadiah Terkirim:</h3>" +
      latestFive.map(data => `
        <p><strong>Nama Pengirim:</strong> ${data.nama}</p>
        <p><strong>Metode Pembayaran:</strong> ${data.metode}</p>
        <p><strong>No. Telepon:</strong> ${data.hp}</p>
        <p><strong>Pesan:</strong> ${data.pesan || '-'}</p>
        <hr>
      `).join("");

    // Reset form setelah submit
    this.reset();
  });
}


  // Putar musik latar otomatis (fallback klik jika autoplay gagal)
  const audio = document.getElementById("bg-music");
  if (audio) {
    audio.play().catch(() => {
      // Jika autoplay gagal, musik akan diputar saat halaman diklik
      document.body.addEventListener("click", () => {
        audio.play();
      }, { once: true });
    });
  }

  // Smooth scroll saat klik link footer menuju ID tujuan
  document.querySelectorAll('footer a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetID = this.getAttribute("href").substring(1);
      const targetElem = document.getElementById(targetID);
      if (targetElem) {
        targetElem.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
