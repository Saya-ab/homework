// === Tab Navigation ===
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.page).classList.add('active');
  });
});

// === Footer Year ===
document.getElementById('footer-year').textContent = '© ' + new Date().getFullYear() + ' Exercise 14';

// === Contact Form Validation ===
const form = document.getElementById('contact-form');
const feedback = document.getElementById('form-feedback');
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg = document.getElementById('msg').value.trim();
  if (!name || !email || !msg) {
    feedback.textContent = 'Please fill in all fields.';
  } else if (!email.includes('@') || !email.includes('.')) {
    feedback.textContent = 'Enter a valid email.';
  } else {
    feedback.textContent = '✓ Message sent (demo).';
    feedback.style.color = '#166534';
    form.reset();
  }
  feedback.classList.add('show');
});

// === Trivia: Personality Quiz ===
const quizData = [
  {
    q: "What do you enjoy most in a project?",
    options: [
      { text: "Building things from scratch", score: 1 },
      { text: "Solving complex problems",    score: 2 },
      { text: "Collaborating with a team",   score: 3 }
    ]
  },
  {
    q: "What's your ideal work environment?",
    options: [
      { text: "Quiet and focused",           score: 1 },
      { text: "Dynamic and fast-paced",      score: 2 },
      { text: "Creative and flexible",       score: 3 }
    ]
  },
  {
    q: "What drives you the most?",
    options: [
      { text: "Curiosity and learning",      score: 1 },
      { text: "Making a real impact",        score: 2 },
      { text: "Creating something beautiful",score: 3 }
    ]
  }
];

const resultMap = [
  { max: 3, title: "The Explorer",   desc: "You follow your curiosity. Research is a journey, and you enjoy every step of discovery." },
  { max: 6, title: "The Builder",    desc: "You love turning ideas into reality. Practical, hands-on, and always building." },
  { max: 9, title: "The Visionary",  desc: "You see the big picture. Your research has direction, purpose, and creativity." }
];

const quizArea = document.getElementById('quiz-area');
const quizResult = document.getElementById('quiz-result');
let currentQ = 0, totalScore = 0, answered = false;

function renderQuestion() {
  quizResult.innerHTML = '';
  const q = quizData[currentQ];
  let html = `<div class="quiz-card"><p class="quiz-q">${currentQ+1}. ${q.q}</p>`;
  q.options.forEach((opt, i) => {
    html += `<button class="quiz-opt" data-score="${opt.score}">${opt.text}</button>`;
  });
  html += '</div>';
  quizArea.innerHTML = html;

  document.querySelectorAll('.quiz-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      if (answered) return;
      answered = true;
      totalScore += parseInt(btn.dataset.score);
      btn.classList.add('selected');
      document.querySelectorAll('.quiz-opt').forEach(b => { if (b !== btn) b.classList.add('dimmed'); });

      setTimeout(() => {
        currentQ++;
        answered = false;
        if (currentQ < quizData.length) {
          renderQuestion();
        } else {
          showResult();
        }
      }, 600);
    });
  });
}

function showResult() {
  quizArea.innerHTML = '';
  const r = resultMap.find(r => totalScore <= r.max);
  quizResult.innerHTML = `
    <div class="result-card">
      <h3>${r.title}</h3>
      <p>${r.desc}</p>
      <p class="result-score">Score: ${totalScore}/9</p>
      <button class="btn" onclick="resetQuiz()">Retake</button>
    </div>
  `;
}

function resetQuiz() {
  currentQ = 0; totalScore = 0; answered = false;
  renderQuestion();
}

renderQuestion();
