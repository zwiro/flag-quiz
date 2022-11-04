import countries from './countries.js'

const gameWrapper = document.querySelector('.game-wrapper');
const btnWrapper = document.querySelector('.answer-buttons');
const msgWrapper = document.querySelector('.msg-wrapper');
const flagImg = document.querySelector('img');

const guessedCountries = [];
const question = [];

let score = 0;

function startGame() {
    createAnswerBtns();
    btnsAction();
    renderQuestion();
}

function renderQuestion() {
    generateQuestion();
    renderAnswers();
}

startGame();

function generateQuestion() {
    const flagImg = document.querySelector('img');
    let randomNumber1 = Math.floor(Math.random() * countries.length);
    let randomNumber2 = Math.floor(Math.random() * countries.length);
    while (randomNumber2 === randomNumber1) {
        randomNumber2 = Math.floor(Math.random() * countries.length);
        if (randomNumber2 !== randomNumber1) {
            break;
        }
    }
    let randomNumber3 = Math.floor(Math.random() * countries.length);
    while (randomNumber3 === randomNumber2) {
        randomNumber3 = Math.floor(Math.random() * countries.length);
        if (randomNumber3 !== randomNumber2) {
            break;
        }
    }
    let randomNumber4 = Math.floor(Math.random() * countries.length);
    while (randomNumber4 === randomNumber3) {
        randomNumber4 = Math.floor(Math.random() * countries.length);
        if (randomNumber4 !== randomNumber3) {
            break;
        }
    }
    question.push(countries[randomNumber1], countries[randomNumber2], countries[randomNumber3], countries[randomNumber4]);
    flagImg.src = question[0].flag;
}

function createAnswerBtns() {
    for (let i = 0; i < 4; i++) {
        const newBtn = document.createElement('button');
        btnWrapper.append(newBtn);
    }
}

function renderAnswers() {
    const btns = [...btnWrapper.children];
    question.sort(() => 0.5 - Math.random());
    btns.forEach((btn, i) => btn.innerText = question[i].name);
}

function btnsAction() {
    const btns = [...btnWrapper.children];
    const scoreCounter = document.querySelector('#score-counter');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const answer = countries.find(element => element.name.includes(btn.innerText))
            if (answer.flag.includes(flagImg.src.slice(-14))) {
                btn.style.backgroundColor = 'green';
                score++;
                guessedCountries.push(answer);
                showMsg('Correct answer!', 'green');
                setTimeout(() => nextQuestion(), 500);
            } else {
                guessedCountries.push(countries.find(el => (el.flag.includes(flagImg.src.slice(-14)))));
                btn.style.backgroundColor = 'red';
                showMsg('Wrong answer!', 'red');
                setTimeout(() => nextQuestion(), 500);
            }
            scoreCounter.innerText = `${score}/${guessedCountries.length}`;
        })
    })
}

function nextQuestion() {
    const questionCount = document.querySelector('#question-id');
    const btns = [...btnWrapper.children];
    questionCount.innerText++;
    btns.forEach(btn => btn.style.backgroundColor = '#BFD7EA');
    if (guessedCountries.length < 193) {
        while (guessedCountries.some(element => element.flag.includes(flagImg.src.slice(-14)))) {
            question.length = 0;
            renderQuestion();
            if (!guessedCountries.some(element => element.flag.includes(flagImg.src.slice(-14)))) {
                break;
            }
        }
    } else gameOverScreen();
}

function showMsg(text, color) {
    const msg = document.createElement('p');
    msg.innerText = text;
    msgWrapper.append(msg);
    msgWrapper.style.backgroundColor = color;
    msgWrapper.classList.remove('hide');
    setTimeout(() => {
        msgWrapper.classList.add('hide');
        msgWrapper.removeChild(msg);
    }, 500);
}

function gameOverScreen() {
    const scoreMsg = document.querySelector('.score');
    const gameOverMsg = document.createElement('div');
    gameOverMsg.classList.add('game-over-msg')
    scoreMsg.style.visibility = 'none';
    gameOverMsg.innerText = `No more flags! You guessed ${score} of 193 flags!`;
    gameWrapper.innerHTML = '';
    gameWrapper.append(gameOverMsg);
    scoreMsg.classList.add('hide');
}