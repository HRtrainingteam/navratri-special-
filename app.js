
/* ==========================================
   SMC NAVRATRI & DUSSEHRA UTSAV 2026
   Complete app.js
   ========================================== */


/* ==========================================
   1. NAVRATRI - NINE DAYS
   ========================================== */

const D = [
  ['Maa Shailputri', 'Orange', '#f28b24',
    'assets/mata/maa-shailputri.jpg',
    'The first form of Navadurga represents purity, strength and the grounded energy of nature. Begin with faith and a fresh resolve.'],

  ['Maa Brahmacharini', 'White', '#f5f1e9',
    'assets/mata/maa-brahmacharni.jpg',
    'Maa Brahmacharini embodies devotion, wisdom and determination. Her calm form reminds us to stay patient and focused.'],

  ['Maa Chandraghanta', 'Red', '#c9252d',
    'assets/mata/maa-chandraghanta.jpg',
    'Maa Chandraghanta represents courage and protection. Her radiant energy inspires confidence and a fearless heart.'],

  ['Maa Kushmanda', 'Royal Blue', '#3154a5',
    'assets/mata/maa-kushmanda.jpg',
    'Maa Kushmanda is associated with creative energy, vitality and abundance. Her presence reminds us that light can emerge from within.'],

  ['Maa Skandamata', 'Yellow', '#f3c42d',
    'assets/mata/maa-skandmata.jpg',
    'Maa Skandamata symbolises motherhood, compassion and protection — the strength of care and love.'],

  ['Maa Katyayani', 'Green', '#3d9147',
    'assets/mata/maa-katyayni.jpg',
    'Maa Katyayani is the warrior form of Durga, representing courage, justice and determination.'],

  ['Maa Kalaratri', 'Grey', '#77777b',
    'assets/mata/maa-kalratri.jpg',
    'Maa Kalaratri represents the destruction of fear and darkness. Courage grows when we confront what frightens us.'],

  ['Maa Mahagauri', 'Purple', '#8b4fa2',
    'assets/mata/maa-mahagauri.jpg',
    'Maa Mahagauri symbolises purity, serenity and inner peace. Move forward with a clear heart.'],

  ['Maa Siddhidatri', 'Peacock Green', '#178c82',
    'assets/mata/maa-siddhidatri.jpg',
    'Maa Siddhidatri is associated with wisdom, fulfilment and spiritual grace, completing the nine-day journey.']
];

const dayList = document.querySelector('#days');

function selectDay(index) {
  const day = D[index];

  if (!day) return;

  document.querySelectorAll('.day').forEach((item, i) => {
    item.classList.toggle('active', i === index);
  });

  document.querySelector('#dayno').textContent =
    'DAY ' + (index + 1);

  document.querySelector('#bar').style.width =
    ((index + 1) / 9 * 100) + '%';

  document.querySelector('#num').textContent =
    String(index + 1).padStart(2, '0');

  document.querySelector('#date').textContent =
    'DAY ' + (index + 1) + ' • ' + (11 + index) + ' OCT';

  document.querySelector('#name').textContent = day[0];
  document.querySelector('#about').textContent = day[4];
  document.querySelector('#badge').textContent = day[1].toUpperCase();
  document.querySelector('#colour').textContent = day[1];
  document.querySelector('#swatch').style.background = day[2];

  const mataImage = document.querySelector('#mata');

  mataImage.onerror = () => {
    mataImage.style.display = 'none';
  };

  mataImage.onload = () => {
    mataImage.style.display = 'block';
  };

  mataImage.src = day[3] + '?v=20261009';
  mataImage.alt = day[0];

  document.querySelector('.photo').style.setProperty(
    '--day-color',
    day[2]
  );
}

if (dayList) {
  D.forEach((day, index) => {
    const item = document.createElement('div');

    item.className = 'day' + (index === 0 ? ' active' : '');
    item.style.setProperty('--c', day[2]);

    const number = String(index + 1).padStart(2, '0');

    item.innerHTML =
      '<span class="n">' + number + '</span>' +
      '<div><b>' + day[0] + '</b>' +
      '<small>' + (11 + index) + ' OCT • ' +
      day[1] + '</small></div>' +
      '<span class="dot"></span>';

    item.addEventListener('click', () => selectDay(index));

    dayList.appendChild(item);
  });

  selectDay(0);
}


/* ==========================================
   2. NAVRATRI COLOUR WHEEL
   ========================================== */

const wheel = document.querySelector('#wheel');

if (wheel) {
  D.forEach((day, index) => {
    const dot = document.createElement('i');

    const angle = index / 9 * Math.PI * 2 - Math.PI / 2;
    const left = Math.cos(angle) * 42;
    const top = Math.sin(angle) * 42;

    dot.style.cssText =
      'position:absolute;' +
      'width:34px;height:34px;border-radius:50%;' +
      'background:' + day[2] + ';' +
      'left:calc(50% + ' + left + '% - 17px);' +
      'top:calc(50% + ' + top + '% - 17px);' +
      'border:3px solid #19090d;';

    wheel.appendChild(dot);
  });
}


/* ==========================================
   3. EMPLOYEE DETAILS & PHOTO UPLOAD
   ========================================== */

const form = document.querySelector('#employeeForm');
const fileInput = document.querySelector('#photoUpload');
const preview = document.querySelector('#uploadPreview');
const previewImage = document.querySelector('#previewImage');
const previewName = document.querySelector('#previewName');
const formMessage = document.querySelector('#formMessage');

const employeeName = document.querySelector('#employeeName');
const employeeCode = document.querySelector('#employeeCode');
const locationInput = document.querySelector('#location');
const department = document.querySelector('#department');

const UPLOAD_URL =
  'https://script.google.com/macros/s/AKfycbycUblVMrpWn2Lelv3NBqz1T4N0GhvBn3_v3nXXBWNDph6qyYvWXzswWJ6yKyYqKL9aUA/exec';

let selectedFiles = [];

function fileToData(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);

    reader.readAsDataURL(file);
  });
}

if (form && fileInput) {
  fileInput.addEventListener('change', () => {
    selectedFiles = Array.from(fileInput.files || []);

    if (selectedFiles.length > 3) {
      fileInput.value = '';
      selectedFiles = [];
      preview.hidden = true;

      formMessage.textContent =
        'Please select a maximum of 3 photos.';

      return;
    }

    const oversizedFile = selectedFiles.find(
      file => file.size > 5 * 1024 * 1024
    );

    if (oversizedFile) {
      fileInput.value = '';
      selectedFiles = [];
      preview.hidden = true;

      formMessage.textContent =
        'Each photo must be smaller than 5 MB.';

      return;
    }

    if (!selectedFiles.length) {
      preview.hidden = true;
      formMessage.textContent = '';
      return;
    }

    previewImage.src = URL.createObjectURL(selectedFiles[0]);

    previewName.textContent =
      selectedFiles.length === 1
        ? selectedFiles[0].name
        : selectedFiles.length + ' photos selected';

    preview.hidden = false;

    formMessage.textContent =
      selectedFiles.length + ' photo' +
      (selectedFiles.length === 1 ? '' : 's') +
      ' selected. Ready to upload.';
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();

    const files = selectedFiles.length
      ? selectedFiles
      : Array.from(fileInput.files || []);

    if (
      !employeeName.value.trim() ||
      !employeeCode.value.trim() ||
      !locationInput.value.trim() ||
      !department.value.trim()
    ) {
      formMessage.textContent =
        'Please complete all employee details.';
      return;
    }

    if (!files.length) {
      formMessage.textContent =
        'Please upload at least one festive photo.';
      return;
    }

    if (files.length > 3) {
      formMessage.textContent =
        'You can upload a maximum of 3 photos.';
      return;
    }

    if (files.some(file => file.size > 5 * 1024 * 1024)) {
      formMessage.textContent =
        'Each photo must be smaller than 5 MB.';
      return;
    }

    const submitButton = document.querySelector('.form-submit');

    submitButton.disabled = true;
    submitButton.textContent = 'UPLOADING PHOTOS…';

    formMessage.textContent =
      'Uploading your photos to the SMC Drive folder…';

    try {
      const payload = {
        name: employeeName.value.trim(),
        employeeCode: employeeCode.value.trim(),
        location: locationInput.value.trim(),
        department: department.value.trim(),

        files: await Promise.all(
          files.map(async file => ({
            name: file.name,
            type: file.type,
            data: await fileToData(file)
          }))
        )
      };

      const response = await fetch(UPLOAD_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Upload failed.');
      }

      localStorage.setItem(
        'smcNavratriEmployee',
        JSON.stringify({
          ...payload,
          photoNames: files.map(file => file.name),
          savedAt: new Date().toISOString()
        })
      );

      formMessage.textContent =
        '✓ Details saved and ' + files.length +
        ' photo' + (files.length === 1 ? '' : 's') +
        ' uploaded successfully.';

      submitButton.textContent = 'UPLOADED ✓';

      setTimeout(() => {
        document.querySelector('#navratri').scrollIntoView({
          behavior: 'smooth'
        });
      }, 700);

    } catch (error) {
      console.error('Photo upload error:', error);

      formMessage.textContent =
        'Upload failed. Please try again. ' + error.message;

      submitButton.disabled = false;
      submitButton.textContent = 'SAVE DETAILS & CONTINUE →';
    }
  });

  // Restore previously saved employee details.
  try {
    const saved = localStorage.getItem('smcNavratriEmployee');

    if (saved) {
      const data = JSON.parse(saved);

      employeeName.value = data.name || '';
      employeeCode.value = data.employeeCode || '';
      locationInput.value = data.location || '';
      department.value = data.department || '';
    }
  } catch (error) {
    console.warn('Could not restore saved details:', error);
  }
}


/* ==========================================
   4. DUSSEHRA RAVAN GAME
   FIXED: RESTART AFTER EVERY WIN
   ========================================== */

const ravan = document.querySelector('#ravan');
const field = document.querySelector('#field');
const fire = document.querySelector('#fire');
const again = document.querySelector('#again');
const win = document.querySelector('#win');
const boom = document.querySelector('#boom');

const message = document.querySelector('#message');
const chancesDisplay = document.querySelector('#chances');
const hitsDisplay = document.querySelector('#hits');
const archer = document.querySelector('#archer');

let x = 82;
let direction = -1;
let running = true;
let chances = 5;
let hits = 0;
let lastFrame = 0;
let animating = false;

// Keep track of delayed game actions so they can be
// cancelled when the player starts another round.
let gameTimers = [];

function gameDelay(callback, delay) {
  const timer = setTimeout(() => {
    gameTimers = gameTimers.filter(id => id !== timer);
    callback();
  }, delay);

  gameTimers.push(timer);

  return timer;
}

function clearGameTimers() {
  gameTimers.forEach(timer => clearTimeout(timer));
  gameTimers = [];
}


/* Ravan movement: start only one animation loop. */

function gameLoop(timestamp) {
  if (!lastFrame) lastFrame = timestamp;

  // Limit large jumps after the tab has been inactive.
  const delta = Math.min((timestamp - lastFrame) / 1000, 0.05);
  lastFrame = timestamp;

  if (running && !animating && ravan) {
    x += direction * 50 * delta;

    if (x <= 4) {
      x = 4;
      direction = 1;
    }

    if (x >= 88) {
      x = 88;
      direction = -1;
    }

    ravan.style.left = x + '%';
  }

  requestAnimationFrame(gameLoop);
}

if (ravan && field && fire && again && win && boom && archer) {
  // Start one persistent movement loop.
  requestAnimationFrame(gameLoop);


  /* Shoot the arrow. */

  function shootArrow() {
    if (!running || chances <= 0 || animating) return;

    animating = true;
    chances--;

    chancesDisplay.textContent = chances;
    fire.disabled = true;

    archer.classList.remove('draw', 'release');

    // Restart the CSS animation reliably.
    void archer.offsetWidth;

    archer.classList.add('draw');
    message.textContent = 'Drawing the bow…';

    gameDelay(() => {
      archer.classList.remove('draw');
      archer.classList.add('release');

      message.textContent = 'Arrow released! 🏹';

      // Calculate Ravan's position relative to the field.
      const fieldRect = field.getBoundingClientRect();
      const ravanRect = ravan.getBoundingClientRect();

      const ravanCenter =
        ravanRect.left + ravanRect.width / 2 - fieldRect.left;

      const fieldCenter = fieldRect.width / 2;

      // Preserve your original hit detection.
      const direct = Math.abs(ravanCenter - fieldCenter) < 95;

      gameDelay(() => {
        archer.classList.remove('release');

        if (direct) {
          hits++;

          hitsDisplay.textContent = hits;
          message.textContent = 'Bullseye! Ravan defeated 🔥';

          // Stop movement and shooting for the completed round.
          running = false;
          animating = false;
          fire.disabled = true;

          // Hide Ravan and replay the explosion animation.
          ravan.style.opacity = '0';

          boom.classList.remove('show');
          void boom.offsetWidth;
          boom.classList.add('show');

          // Display the victory overlay.
          gameDelay(() => {
            win.classList.add('show');
          }, 450);

        } else {
          message.textContent = chances
            ? 'Missed! ' + chances +
              ' chance' + (chances === 1 ? '' : 's') + ' left.'
            : 'No chances left — try again!';

          animating = false;

          if (chances > 0) {
            fire.disabled = false;
          } else {
            // Stop the round when all chances are used.
            running = false;
            fire.disabled = true;
          }
        }
      }, 650);
    }, 650);
  }


  /* Restart the complete game after a win or loss. */

  function restartGame(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Cancel any remaining delayed actions from the old round.
    clearGameTimers();

    // Reset the game state.
    x = 82;
    direction = -1;
    running = true;
    chances = 5;
    hits = 0;
    animating = false;

    // Restore Ravan completely.
    ravan.style.left = '82%';
    ravan.style.opacity = '1';
    ravan.style.visibility = 'visible';
    ravan.style.display = 'block';

    // Reset counters.
    chancesDisplay.textContent = '5';
    hitsDisplay.textContent = '0';

    // Reset the game message.
    message.textContent = 'Ravan is approaching…';

    // Hide the victory overlay and explosion.
    win.classList.remove('show');
    boom.classList.remove('show');

    // Reset the archer animations.
    archer.classList.remove('draw', 'release');
    void archer.offsetWidth;

    // Allow the player to shoot again.
    fire.disabled = false;
    fire.textContent = 'RELEASE ARROW ➜';
  }


  /* Attach event listeners only once. */

  fire.addEventListener('click', shootArrow);
  again.addEventListener('click', restartGame);
}
