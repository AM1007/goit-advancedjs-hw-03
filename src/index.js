import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const breedSelect = document.querySelector('.breed-select');
const placeholderOption = document.createElement('option');
placeholderOption.value = '';
placeholderOption.text = 'Choose Your Kitty';
breedSelect.appendChild(placeholderOption);
const errorPage = document.querySelector('.js-error');
errorPage.style.display = 'none';

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
 * Add CatInfo data markup
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

const loader = {
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
};

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

  iziToast.show(loader);

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      iziToast.hide({}, document.querySelector('.iziToast'));
      displayCatInfo(catData);
      errorPage.style.display = 'none'; // Hide error message on success
    })
    .catch(error => {
      catInfoDiv.innerHTML = ``;
      errorPage.style.display = 'block';
      iziToast.hide({}, document.querySelector('.iziToast'));
      iziToast.error({
        icon: '',
        close: false,
        title: '',
        message: 'Error fetching cat information. Try again!',
        position: 'topRight',
        timeout: 5000,
      });
      console.error(error);
    });
}

document
  .querySelector('.breed-select')
  .addEventListener('change', handleBreedSelectionChange);

document.addEventListener('DOMContentLoaded', () => {
  iziToast.show(loader);

  fetchBreeds()
    .then(breeds => {
      iziToast.hide({}, document.querySelector('.iziToast'));
      populateBreedSelect(breeds);
      document.querySelector('.breed-select').style.display = 'block';
      errorPage.style.display = 'none'; // Hide error message on success
    })
    .catch(error => {
      iziToast.hide({}, document.querySelector('.iziToast'));
      catInfoDiv.innerHTML = ``;
      errorPage.style.display = 'block';
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
