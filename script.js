// =========================================
// 1. LOGIKA EMOJI MELAYANG
// =========================================
const emojis = ['❤️','💖','💗','💓','🧸'];

function createFloating() {
  const container = document.querySelector('.floating-elements');
  if (!container) return; 

  for (let i = 0; i < 25; i++) {
    const el = document.createElement('div');
    el.className = 'float'; 
    el.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    
    el.style.left = Math.random() * 100 + 'vw';
    el.style.animationDuration = (8 + Math.random() * 10) + 's';
    el.style.animationDelay = Math.random() * 5 + 's';
    
    container.appendChild(el);
  }
}

// =========================================
// 2. LOGIKA MUSIK & LAYAR PEMBUKA
// =========================================
function initMusicAndWelcome() {
  const musicToggle = document.getElementById('musicToggle');
  const bgMusic = document.getElementById('bgMusic');
  
  const welcomeScreen = document.getElementById('welcomeScreen');
  const btnStart = document.getElementById('btnStart');
  
  if (musicToggle && bgMusic && welcomeScreen && btnStart) {
    // Memutar musik saat tombol awal diklik
    btnStart.addEventListener('click', () => {
      bgMusic.play();
      musicToggle.textContent = '🔇 Stop Music'; 
      welcomeScreen.classList.add('fade-out');
    });
    
    // Tombol kontrol musik di pojok
    musicToggle.addEventListener('click', () => {
      if (bgMusic.paused) {
        bgMusic.play();
        musicToggle.textContent = '🔇 Stop Music';
      } else {
        bgMusic.pause();
        musicToggle.textContent = '🎵 Play Music';
      }
    });
  }
}

// =========================================
// 3. LOGIKA VIDEO (YOUTUBE API) - YANG DIPERBARUI!
// =========================================
// Memanggil "mesin" API dari YouTube secara otomatis
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

// WAJIB menggunakan window. agar terdeteksi secara global oleh Vercel/GitHub
window.onYouTubeIframeAPIReady = function() {
  player = new YT.Player('introVideo', {
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
};

// Fungsi ini memantau perubahan status video (Play, Pause, Ended)
function onPlayerStateChange(event) {
  // YT.PlayerState.ENDED (atau angka 0) artinya video sudah benar-benar selesai
  if (event.data === YT.PlayerState.ENDED) {
    const choiceContainer = document.getElementById('choiceContainer');
    if (choiceContainer) {
      choiceContainer.classList.remove('hidden');
      // Beri sedikit jeda untuk animasi smooth
      setTimeout(() => {
        choiceContainer.classList.add('show');
      }, 100);
    }
  }
}

// =========================================
// 4. LOGIKA TOMBOL PILIHAN (YES & NO LUCU)
// =========================================
const messages = [
  "Yooo Bubu Really????",
  "Oh c'mon pls pls??",
  "Bubu please...",
  "Think Againnn!!!",
  "If u click this, i will be sad...",
  "Now I'm sad :(( ",
  "I'm very very very sadddd...",
  "Okay im give up...",
  "Just kidding, Bubu c'mon pwissssss! ❤️"
];

let messageIndex = 0;
let noClickCount = 0; 

function initInteractiveButtons() {
  const btnNo = document.getElementById('btnNo');
  const btnYes = document.getElementById('btnYes');
  const nomorWA = "6285780176128"; 

  if (btnNo && btnYes) {
    // JIKA TOMBOL "NO" DIKLIK
    btnNo.addEventListener('click', () => {
      noClickCount++;

      // Jika hitungan mencapai 3, langsung buka WA dengan pesan friendzone
      if (noClickCount === 3) {
        const pesanTolak = "no po, i think we just can be friends only :)";
        const urlWATolak = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesanTolak)}`;
        window.open(urlWATolak, "_blank");
        return; 
      }

      // Membesarkan tombol Yes dan mengganti teks tombol No
      btnNo.textContent = messages[messageIndex];
      messageIndex = (messageIndex + 1) % messages.length;
      
      const currentSize = parseFloat(window.getComputedStyle(btnYes).fontSize);
      btnYes.style.fontSize = `${currentSize * 1.5}px`;
      
      const currentPadding = parseFloat(window.getComputedStyle(btnYes).paddingTop);
      btnYes.style.padding = `${currentPadding * 1.2}px ${currentPadding * 2.4}px`;
    });

    // JIKA TOMBOL "YES" DIKLIK
    btnYes.addEventListener('click', () => {
      const pesanTerima = "YAYYYY! I said YES Bebe! Love you too! 💖";
      const urlWATerima = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesanTerima)}`;
      window.open(urlWATerima, "_blank");
    });
  }
}

// =========================================
// 5. JALANKAN SEMUA SAAT HALAMAN DIMUAT
// =========================================
document.addEventListener('DOMContentLoaded', () => {
  createFloating();
  initMusicAndWelcome();
  initInteractiveButtons();
});