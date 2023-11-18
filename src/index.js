import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const breedSelect = document.querySelector('.breed-select');
const placeholderOption = document.createElement('option');
placeholderOption.value = '';
placeholderOption.text = 'Choose Your Kitty';
breedSelect.appendChild(placeholderOption);

/**
 * Populate the breed select dropdown
 * @param {*} breeds
 */
function populateBreedSelect(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.text = breed.name;
    breedSelect.appendChild(option);
  });
}

const catInfoDiv = document.querySelector('.cat-info');

/**
 * add CatInfo data markup
 * @param {*} catData
 */
function displayCatInfo(catData) {
  catInfoDiv.innerHTML = `
  <div class="wrapper">
    <img class="picture" src="${catData.url}" alt="${catData.breeds[0].name}">
    <div class="text-content">
      <h1 class="breed">${catData.breeds[0].name}</h1>
      <p class="description">${catData.breeds[0].description}</p>
      <p class="description"><span class="temperament-span">Temperament:</span> ${catData.breeds[0].temperament}</p>
      <a class="wiki-ref" href="${catData.breeds[0].wikipedia_url}" target="_blank"> More Info...</a>
    </div>
  </div>
  `;
  catInfoDiv.style.display = 'block';
}

/**
 * Fetch a cat data on page
 */
function handleBreedSelectionChange() {
  const selectedBreedId = document.querySelector('.breed-select').value;
  const placeholderOption = document.querySelector(
    '.breed-select option[value=""]'
  );
  if (placeholderOption) {
    document.querySelector('.breed-select').removeChild(placeholderOption);
  }

  iziToast.info({
    icon: '',
    close: false,
    progressBar: false,
    messageColor: 'white',
    messageSize: '80',
    overlay: true,
    overlayColor: '#22222a',
    backgroundColor: 'transparent',
    message: 'KITTY, KITTY, KITTY...',
    position: 'center',
    transitionIn: 'bounceInRight',
    transitionOut: 'fadeOutRight',
    timeout: 5000,
  });

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      iziToast.hide({}, document.querySelector('.iziToast'));
      displayCatInfo(catData);
    })
    .catch(error => {
      iziToast.hide({}, document.querySelector('.iziToast'));
      iziToast.error({
        icon: '',
        close: false,
        title: '',
        message: 'Error fetching cat information. Try again!',
        position: 'topRight',
        timeout: 5000,
      });
      console.error('Error fetching cat information:', error);
    });
}

document
  .querySelector('.breed-select')
  .addEventListener('change', handleBreedSelectionChange);

document.addEventListener('DOMContentLoaded', () => {
  iziToast.info({
    icon: '',
    close: false,
    progressBar: false,
    messageColor: 'white',
    messageSize: '80',
    overlay: true,
    overlayColor: '#22222a',
    backgroundColor: 'transparent',
    message: 'KITTY, KITTY, KITTY...',
    position: 'center',
    transitionIn: 'bounceInRight',
    transitionOut: 'fadeOutRight',
    timeout: 5000,
  });

  fetchBreeds()
    .then(breeds => {
      iziToast.hide({}, document.querySelector('.iziToast'));
      populateBreedSelect(breeds);
      document.querySelector('.breed-select').style.display = 'block';
    })
    .catch(error => {
      iziToast.hide({}, document.querySelector('.iziToast'));
      iziToast.error({
        icon: '',
        close: false,
        title: '',
        message: 'Error fetching cat breeds. Try again!',
        position: 'topRight',
        timeout: 5000,
      });
      console.error('Error fetching breeds:', error);
    });
});
