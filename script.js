const questions = [
  {
    question: "Which is the largest desert in the world?",
    answers: ["Kalahari", "Gobi", "Sahara", "Antarctica"],
    correct: "Antarctica"
  },
  {
    question: "What does HTML stand for?",
    answers: [
      "HighText Machine Language",
      "HyperText Markup Language",
      "HyperText and Links Markup Language",
      "None of these"
    ],
    correct: "HyperText Markup Language"
  },
  {
    question: "Which language is used for styling web pages?",
    answers: ["HTML", "jQuery", "CSS", "XML"],
    correct: "CSS"
  },
  {
    question: "Which year was JavaScript created?",
    answers: ["1995", "2000", "1990", "1998"],
    correct: "1995"
  },
  {
    question: "Which tag is used to link a CSS file in HTML?",
    answers: ["<link>", "<style>", "<script>", "<css>"],
    correct: "<link>"
  }
];

const questionEl = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextBtn = document.getElementById('next-btn');
const resultEl = document.getElementById('result');

let currentIndex = 0;
let score = 0;

function startQuiz() {
  currentIndex = 0;
  score = 0;
  nextBtn.classList.add("hide");
  resultEl.classList.add("hide");
  showQuestion();
}

function showQuestion() {
  clearAnswers();
  const q = questions[currentIndex];
  questionEl.innerText = `${currentIndex + 1}. ${q.question}`;
  q.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.innerText = answer;
    btn.classList.add("btn");
    if (answer === q.correct) btn.dataset.correct = true;
    btn.addEventListener("click", selectAnswer);
    answerButtons.appendChild(btn);
  });
}

function clearAnswers() {
  answerButtons.innerHTML = "";
  nextBtn.classList.add("hide");
}

function selectAnswer(e) {
  const selected = e.target;
  const correct = selected.dataset.correct === "true";

  Array.from(answerButtons.children).forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    } else {
      btn.classList.add("wrong");
    }
  });

  if (correct) score++;

  nextBtn.classList.remove("hide");
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionEl.innerHTML = "";
  answerButtons.innerHTML = "";
  nextBtn.classList.add("hide");
  resultEl.classList.remove("hide");
  resultEl.innerHTML = `<h2>Your Score: ${score} / ${questions.length}</h2>`;
}

startQuiz();
