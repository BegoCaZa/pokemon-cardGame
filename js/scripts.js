const gameContainerElement = document.getElementById('game-container');

let pokemons = [];
let flippedCards = [];

const flipCards = event => {
  const clickedCard = event.target.closest(`.card`);
  clickedCard.classList.add('card-clicked');

  if (clickedCard.classList.contains('card-clicked')) {
    flippedCards.push(clickedCard);
  }
  if (flippedCards.length === 2) {
    if (flippedCards[0].id === flippedCards[1].id) {
      //si son iguales
      flippedCards = [];
    } else {
      setTimeout(() => {
        flippedCards[0].classList.remove('card-clicked');
        flippedCards[1].classList.remove('card-clicked');
        flippedCards = [];
      }, 1000);
    }
  }
};

const getRandomNumber = () => {
  return Math.floor(Math.random() * 151 + 1);
};

const getPokemon = () => {
  while (pokemons.length < 6) {
    const randomNumber = getRandomNumber();
    if (!pokemons.includes(randomNumber)) {
      pokemons.push(randomNumber);
    }
  }

  pokemons = [...pokemons, ...pokemons].sort(() => Math.random() - 0.5); //los mezcla
};

const printCards = () => {
  const fragment = document.createDocumentFragment();

  pokemons.forEach(pokemon => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.id = pokemon; //evitara que se vea el id?

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    cardFront.style.setProperty(
      '--pokemon-img',
      `url(../assets/images/${pokemon}.png)`
    );
    card.append(cardFront);

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    card.append(cardBack);

    fragment.append(card);
  });
  gameContainerElement.append(fragment);
};

//giro al principio

setTimeout(() => {
  document.querySelectorAll('.card').forEach(card => {
    card.classList.add('card-clicked');
  });
}, 1000);

setTimeout(() => {
  document.querySelectorAll('.card').forEach(card => {
    card.classList.remove('card-clicked');
  });
}, 2000);

getPokemon();
printCards();

gameContainerElement.addEventListener('click', flipCards);
