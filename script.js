// ==========================================
// SNOWFALL ANIMATION
// ==========================================
function createSnowflake() {
  const snowflake = document.createElement('div');
  snowflake.className = 'snowflake';
  snowflake.innerHTML = '❄️';
  snowflake.style.left = Math.random() * 100 + '%';
  snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
  snowflake.style.fontSize = Math.random() * 1.5 + 0.5 + 'em';
  snowflake.style.opacity = Math.random();
  document.body.appendChild(snowflake);

  setTimeout(() => {
    snowflake.remove();
  }, 5000);
}

// Create snowflakes every 300ms
setInterval(createSnowflake, 300);

// ==========================================
// NAME SUBMISSION & SCREEN TRANSITION
// ==========================================
const nameInput = document.getElementById('nameInput');
const submitBtn = document.getElementById('submitBtn');
const screen1 = document.getElementById('screen1');
const screen2 = document.getElementById('screen2');
const greeting = document.getElementById('greeting');
const loadingText = document.getElementById('loadingText');
const imageContainer = document.getElementById('imageContainer');
const subtext1 = document.getElementById('subtext1');
const subtext2 = document.getElementById('subtext2');
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

let userName = '';
let isMusicPlaying = false;

// Handle Enter key press
nameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleSubmit();
  }
});

// Handle button click
submitBtn.addEventListener('click', handleSubmit);

// MAIN SUBMISSION FUNCTION
function handleSubmit() {
  const name = nameInput.value.trim();

  // Validate name input
  if (name === '' || name.length < 2) {
    nameInput.classList.add('shake');
    setTimeout(() => {
      nameInput.classList.remove('shake');
    }, 500);
    return;
  }

  // Store the name
  userName = name;

  // Hide Screen 1
  screen1.style.display = 'none';

  // Show Screen 2 - FIXED: Set display first, then trigger transition
  screen2.style.display = 'flex';
  
  // Force browser reflow before adding active class
  screen2.offsetHeight;
  
  // Now add active class to trigger transition
  setTimeout(() => {
    screen2.classList.add('active');
  }, 10);

  // Show greeting immediately
  greeting.textContent = `Merry Christmas, ${userName} 🎄`;
  greeting.style.display = 'block';

  // Show image and remaining text after delay
  setTimeout(() => {
    loadingText.style.display = 'none';
    imageContainer.style.display = 'block';
    subtext1.style.display = 'block';
    subtext2.style.display = 'block';
  }, 1500);

  // Start music playback
  setTimeout(() => {
    bgMusic.volume = 0.3;
    bgMusic.play().then(() => {
      isMusicPlaying = true;
      musicToggle.classList.add('show');
    }).catch((err) => {
      console.log('Autoplay prevented:', err);
      musicToggle.classList.add('show');
    });
  }, 1000);
}

// ==========================================
// MUSIC TOGGLE FUNCTIONALITY
// ==========================================
musicToggle.addEventListener('click', () => {
  if (isMusicPlaying) {
    bgMusic.pause();
    musicToggle.textContent = '🔇 vibes OFF';
    isMusicPlaying = false;
  } else {
    bgMusic.play().then(() => {
      musicToggle.textContent = '🔊 vibes ON';
      isMusicPlaying = true;
    }).catch((err) => {
      console.log('Playback error:', err);
    });
  }
});

// ==========================================
// IMAGE ERROR HANDLER
// ==========================================
const rotatingImage = document.getElementById('rotatingImage');
rotatingImage.addEventListener('error', () => {
  rotatingImage.style.display = 'none';
  const placeholder = document.createElement('div');
  placeholder.style.cssText = `
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #ff6b6b, #ffd93d);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4rem;
  `;
  placeholder.textContent = '🎄';
  rotatingImage.parentElement.appendChild(placeholder);
});
