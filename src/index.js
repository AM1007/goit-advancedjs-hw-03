import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

/**
 * Function to handle the breed selection change event
 */
function handleBreedSelectionChange() {
  const selectedBreedId = document.querySelector('.breed-select').value;
  document.querySelector('.loader').style.display = 'block';
  document.querySelector('.cat-info').style.display = 'none';

  // Fetch cat information based on the selected breed
  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      // Display cat information
      const catInfoDiv = document.querySelector('.cat-info');
      catInfoDiv.innerHTML = `
        <img src="${catData.url}" width="500" alt="${catData.breeds[0].name}">
        <p>Breed: ${catData.breeds[0].name}</p>
        <p>Description: ${catData.breeds[0].description}</p>
        <p>Temperament: ${catData.breeds[0].temperament}</p>
      `;

      // Hide loader and display cat information
      document.querySelector('.loader').style.display = 'none';
      catInfoDiv.style.display = 'block';
    })
    .catch(error => {
      // Display error message
      document.querySelector('.loader').style.display = 'none';
      document.querySelector('.error').style.display = 'block';
      iziToast.error({
        message: `Error fetching cat information:`,
        position: 'topRight',
      });
      console.error(`${error.message}`, error);
    });
}

// Set up event listener for breed selection change
document
  .querySelector('.breed-select')
  .addEventListener('change', handleBreedSelectionChange);

// Fetch breeds and populate the breed select dropdown on page load
document.addEventListener('DOMContentLoaded', () => {
  // Display loader while fetching breeds
  document.querySelector('.loader').style.display = 'block';
  document.querySelector('.cat-info').style.display = 'none';

  // Fetch breeds and populate the breed select dropdown
  fetchBreeds()
    .then(() => {
      document.querySelector('.loader').style.display = 'none';
      document.querySelector('.breed-select').style.display = 'block';
    })
    .catch(error => {
      document.querySelector('.loader').style.display = 'none';
      document.querySelector('.error').style.display = 'block';
      iziToast.error({
        message: `Error fetching breeds:`,
        position: 'topRight',
      });
      console.error(`${error.message}`, error);
    });
});
