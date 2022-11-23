const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is the capitol of Finland?',
    answers: [
      { text: 'Reykjavík', correct: false },
      { text: 'Oslo', correct: false },
      { text: 'Helsinki', correct: true },
      { text: 'Copenhagen', correct: false }
    ]
  },
  {
    question: 'What is the highest mountain in Taiwan?',
    answers: [
      { text: 'Yushan', correct: true },
      { text: 'Mt. Fuji', correct: false },
      { text: 'Mt. Everest', correct: false },
      { text: 'K2', correct: false }
    ]
  },
  {
    question: 'What is the largest country in South America?',
    answers: [
      { text: 'Argentina', correct: false },
      { text: 'Brazil', correct: true },
      { text: 'Chile', correct: false },
      { text: 'Peru', correct: false }
    ]
  },
  {
    question: 'What is the name for the large area of swampland found in southern Florida?',
    answers: [
      { text: 'The Everglades', correct: true },
      { text: 'Great Cypress Swamp ', correct: false },
      { text: 'Reelfoot Lake', correct: false },
      { text: 'The Great Dismal Swamp', correct: false }
    ]
  },
  {
    question: 'Which one of these cities is NOT located in Croatia?',
    answers: [
      { text: 'Dubrovnik', correct: false },
      { text: 'Zagreb', correct: false },
      { text: 'Split', correct: false },
      { text: 'Sarajevo', correct: true }
    ]
  },
  {
    question: 'What classic video game was invented in Russia?',
    answers: [
      { text: 'Tetris', correct: true },
      { text: 'Pong', correct: false },
      { text: 'Space Invaders', correct: false },
      { text: 'Donkey Kong', correct: false }
    ]
  },
  {
    question: 'What does the Bangladeshi flag look like?',
    answers: [
      { text: 'Red background with a green star', correct: false },
      { text: 'Red background with a green circle', correct: false },
      { text: 'Green background with a red star', correct: false },
      { text: 'Green background with a red circle', correct: true }
    ]
  }
]