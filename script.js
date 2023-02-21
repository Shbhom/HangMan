'use strict';
const gameScore = document.querySelector('#gameScore');
const letterDiv = document.querySelector('.letter-div');
const hintText = document.querySelector('.hint-txt');
const hangman = document.querySelector('.hangmanContainer');
const liveSpan = document.querySelector('.lives');
const wordDiv = document.querySelector('.word-div');
const notif = document.querySelector('.notif');
const notifContent = document.querySelector('.notif-content');
const notifSpan = document.querySelector('.notif-span');
const backButton = document.querySelector('.back-btn');
const resetButton = document.querySelector('.reset-btn');
const closeButton = document.querySelector('.close-btn');
// const hangmanLeft = document.querySelector()

// keeping letters using javascript
// so untill we put html content into letter-div,
// we cant capture letters
let letters;

let lives;
let score;

const words = new Map([
  ['apple', 'keeps doc away'],
  ['pear', 'pata nahi'],
  ['pomagranate', 'ananas'],
]);

// making a list of only keys from words
const word_list = [...words.keys()];

// get random word from word_list function
const getRandomWord = function (list) {
  return list[Math.floor(Math.random() * word_list.length)];
};

// random word will be selected upon every reset and init
let select_word;

const init = function (state) {
  wordDiv.innerHTML = '';
  if (state === 'start') {
    // putting all letters into html
    for (const i of 'abcdefghijklmnopqrstuvwxyz') {
      const html = `<button class="alpha">${i.toUpperCase()}</button>`;
      letterDiv.insertAdjacentHTML('beforeend', html);
    }
  } else if (state === 'reset') {
    letters.forEach(btn => {
      btn.classList.remove('disabled');
      notif.classList.add('hidden');
      gameScore.innerText = 0;
    });
  }
  //getting the random word
  select_word = getRandomWord(word_list);
  lives = 5;
  score = 0;

  //adding hints after each reload 
  hintText.textContent = words.get(select_word);

  // capturing letters div
  letters = document.querySelectorAll('.alpha');
  liveSpan.textContent = lives;

  // putting selected word
  for (let i = 0; i < select_word.length; i++) {
    const html = `<p class="word">_</p>`;
    wordDiv.insertAdjacentHTML('beforeend', html);
  }
};
// initializing the page
init('start');

// show notification
const showNotif = function (msg) {
  notif.classList.remove('hidden');
  notifSpan.textContent = select_word;
  notifContent.textContent = `You ${msg}`;
};

// decrease life
const decreaseLife = function () {
  lives--;
  score--;
  gameScore.innerText = score;
  console.log(`score:${score}`);
  liveSpan.textContent = lives;
  if (lives === 0) {
    showNotif('lost');
  }
};

// get multiple matching indexes of pressed letter
// to the selected word
const getindexes = function (letter) {
  let indexes = [];
  [...select_word].forEach((val, i) => {
    if (val === letter) {
      const index = i;
      indexes.push(index);
    }
  });
  //   console.log(indexes);
  return indexes;
};

// check if we get complete word
const checkWord = function () {
  let val = true;
  for (let i = 0; i < wordDiv.children.length; i++) {
    if (wordDiv.children[i].textContent === '____') {
      val = false;
    }
  }
  return val;
};

// letters event listener function
const letterPress = function () {
  const letter = this.textContent.toLowerCase();

  if (select_word.includes(letter)) {
    const indexes_list = getindexes(letter);
    indexes_list.forEach((val, i) => {
      wordDiv.children[val].textContent = this.textContent;
      score += 3;
      gameScore.innerText = score;
      console.log(score);
    });
    if (checkWord()) {
      showNotif('won')
    };
  } else {
    decreaseLife();
  }
  this.classList.add('disabled');
};

// listening to letter buttons presses
letters.forEach(btn => {
  btn.addEventListener('click', letterPress);
});

// listening to reset btn
resetButton.addEventListener('click', function () {
  init('reset');
});

// listening to back button
backButton.addEventListener('click', () => {
  // console.log('back');
  window.close();
})

// listening to play again button
closeButton.addEventListener('click', function () {
  window.close();
});
