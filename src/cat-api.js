import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_uT0RLJgJNg7OIzTQWFoQE9YFbtV4T1dSf8FWLCckGkuLSnpsxwktLbZvzXynYLdg';

/**
 * Function to fetch breeds and populate the breed select dropdown
 * @returns
 */
export function fetchBreeds() {
  return new Promise((resolve, reject) => {
    axios
      .get('https://api.thecatapi.com/v1/breeds')
      .then(response => {
        const breeds = response.data;
        const breedSelect = document.querySelector('.breed-select');

        breeds.forEach(breed => {
          const option = document.createElement('option');
          option.value = breed.id;
          option.text = breed.name;
          breedSelect.appendChild(option);
        });

        resolve(breeds);
      })
      .catch(error => {
        reject(error);
      });
  });
}

/**
 * Function to fetch cat information by breed
 * @param {*} breedId
 * @returns
 */
export function fetchCatByBreed(breedId) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
      .then(response => {
        const catData = response.data[0];
        resolve(catData);
      })
      .catch(error => {
        reject(error);
      });
  });
}
