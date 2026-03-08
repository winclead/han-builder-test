// Semantle Game Logic - English Version

const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const guessHistory = document.getElementById('guess-history');
const feedbackMsg = document.getElementById('feedback-msg');
const themeToggle = document.getElementById('theme-toggle');
const nearestScoreDisplay = document.getElementById('nearest-score');
const statsSummary = document.getElementById('stats-summary');
const winModal = document.getElementById('win-modal');
const secretWordDisplay = document.getElementById('secret-word-display');
const totalGuessesDisplay = document.getElementById('total-guesses');
const restartButton = document.getElementById('restart-button');

// Game State
let secretWord = 'COFFEE'; // The secret word for the prototype
let guesses = [];
let nearestScore = -100;

// Similarity Map (Mocked for demonstration)
// In a real app, this would be an API call to a word2vec service
const similarityMock = {
  'COFFEE': 100,
  'TEA': 75.4,
  'CAFFEINE': 88.2,
  'BEVERAGE': 65.1,
  'DRINK': 62.5,
  'MUG': 55.8,
  'CUP': 52.3,
  'BREAKFAST': 45.9,
  'MORNING': 42.1,
  'WATER': 38.4,
  'MILK': 48.7,
  'SUGAR': 46.2,
  'BEAN': 70.5,
  'ROAST': 68.3,
  'BREW': 72.1,
  'STARBUCKS': 60.4,
  'ESPRESSO': 92.5,
  'LATTE': 89.1,
  'CAPPUCCINO': 87.4
};

// Theme Management
const initTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
  }
};

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Helper: Calculate Mock Similarity
function getSimilarity(word) {
  const upperWord = word.toUpperCase();
  if (similarityMock[upperWord]) return similarityMock[upperWord];
  
  // Simple fallback for words not in mock map:
  // Calculate a "distance" based on character match as a very basic filler
  let matchCount = 0;
  const secretSet = new Set(secretWord);
  for (let char of upperWord) {
    if (secretSet.has(char)) matchCount++;
  }
  return Math.max(-10, (matchCount / Math.max(upperWord.length, secretWord.length)) * 25).toFixed(2);
}

function addGuess() {
  const word = guessInput.value.trim().toUpperCase();
  
  if (!word) return;
  if (guesses.some(g => g.word === word)) {
    showFeedback("You've already guessed that word!");
    return;
  }

  const score = parseFloat(getSimilarity(word));
  const rank = score >= 100 ? 'Found!' : (score > 90 ? 'Top 10' : (score > 80 ? 'Top 100' : (score > 50 ? 'Getting Close' : 'Cold')));
  
  const guessObj = {
    num: guesses.length + 1,
    word: word,
    score: score,
    rank: rank
  };

  guesses.unshift(guessObj); // Add to beginning
  updateTable();
  
  if (score > nearestScore && score < 100) {
    nearestScore = score;
    nearestScoreDisplay.textContent = nearestScore.toFixed(2);
    statsSummary.classList.remove('hidden');
  }

  if (score >= 100) {
    showWin();
  }

  guessInput.value = '';
  guessInput.focus();
  showFeedback('');
}

function updateTable() {
  guessHistory.innerHTML = '';
  guesses.forEach(g => {
    const row = document.createElement('tr');
    
    // Color logic based on score
    let color = '#007bff';
    if (g.score >= 100) color = '#28a745';
    else if (g.score > 80) color = '#ffc107';
    else if (g.score > 50) color = '#fd7e14';

    row.innerHTML = `
      <td>${g.num}</td>
      <td>${g.word}</td>
      <td class="similarity-col">
        <div>${g.score.toFixed(2)}</div>
        <div class="progress-container">
          <div class="progress-bar" style="width: ${Math.max(0, g.score)}%; background-color: ${color}"></div>
        </div>
      </td>
      <td>${g.rank}</td>
    `;
    guessHistory.appendChild(row);
  });
}

function showFeedback(msg) {
  feedbackMsg.textContent = msg;
}

function showWin() {
  secretWordDisplay.textContent = secretWord;
  totalGuessesDisplay.textContent = guesses.length;
  winModal.classList.remove('hidden');
}

function restartGame() {
  guesses = [];
  nearestScore = -100;
  guessHistory.innerHTML = '';
  statsSummary.classList.add('hidden');
  winModal.classList.add('hidden');
  guessInput.value = '';
  showFeedback('');
  // In a real app, pick a new secret word here
}

// Events
guessButton.addEventListener('click', addGuess);
guessInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addGuess();
});
restartButton.addEventListener('click', restartGame);

// Init
initTheme();
