import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_uT0RLJgJNg7OIzTQWFoQE9YFbtV4T1dSf8FWLCckGkuLSnpsxwktLbZvzXynYLdg';

/**
 * Function to fetch breeds
 * @returns {Promise<Array>} - A promise with an array of breeds
 */
export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

/**
 * Function to fetch cat information by breed
 * @param {string} breedId - The ID of the cat breed
 * @returns {Promise<Object>} - A promise with cat data
 */
export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0])
    .catch(error => {
      throw error;
    });
}
