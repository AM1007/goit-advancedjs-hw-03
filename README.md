### :heart_eyes_cat: Pussycat Search :heart_eyes_cat:

Create the frontend part of an application for searching information about a cat
by its breed. Watch the demo video of the program in action; use it as a guide
for the required functionality.

https://textbook.edu.goit.global/lms-js-homework/v2/uk/assets/medias/catsearch-demo-7a9eca87a69c1131c828592a49f6f647.mp4

#### HTTP requests

Use the public [Cat API](https://thecatapi.com/). To get started, you need to
register and obtain a unique access key to attach to each request. Go to the
[main page](https://thecatapi.com/) and click the `Signup for free` button
below, follow the instructions, and the key will be sent to the specified email.

To use the key, you should utilize the HTTP header x-api-key. It is recommended
to use axios and add the header to all requests.

```js
import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'твій ключ';
```

#### Collection of breeds

During the page load, an HTTP request should be made for a collection of cat
breeds. To achieve this, perform a GET request to the resource
`https://api.thecatapi.com/v1/breeds`, which returns an array of objects. Upon a
successful request, populate the `select.breed-select` with options. Ensure that
the `value` of each option contains the breed `id`, while the user interface
displays the breed name.

Write a function `fetchBreeds()` that makes the HTTP request and returns a
promise with an array of breeds as the request result. Place this function in
the file `cat-api.js` and export it with a named export.

#### Information about the cat

When the user selects an option in the dropdown, a request for complete cat
information should be executed on the resource
`https://api.thecatapi.com/v1/images/search`. Don't forget to include the query
parameter `breed_ids` in this request with the breed identifier.

Here's how the URL request will look like to retrieve full information about a
cat based on the breed identifier:

```html
https://api.thecatapi.com/v1/images/search?breed_ids=ідентифікатор_породи
```

Write a function `fetchCatByBreed(breedId)` that expects a breed identifier,
makes an HTTP request, and returns a promise with cat data as the request
result. Put it in the file `cat-api.js` and do a named export.

If the request is successful, an image and detailed information about the cat,
including breed name, description, and temperament, appear under the select in
the `div.cat-info` block.

#### Handling the loading state

While any HTTP request is ongoing, it's necessary to display a loader – the
element `p.loader`. When there are no requests or when a request has finished,
the loader should be hidden. Utilize additional CSS classes for this purpose.

- While a request for the list of breeds is in progress, hide
  `select.breed-select` and show `p.loader`.
- While a request for cat information is in progress, hide `div.cat-info` and
  show `p.loader`.
- As soon as any request is completed, hide `p.loader`.

#### Handling errors

If the user encounters an error during any HTTP request, such as a network
failure or packet loss, meaning the promise was rejected, it's necessary to
display the element `p.error`. On each subsequent request, hide the error
element. Use additional CSS classes for this purpose.

To test the error display functionality, it's straightforward – change the
request URL by adding any character at the end. For example, instead of
`https://api.thecatapi.com/v1/breeds`, use
`https://api.thecatapi.com/v1/breeds123`. The request for the list of breeds
will be rejected with an error. Similarly, for the request for cat information
based on the breed.

#### Interface

- Add minimal styling to the interface.
- Instead of `select.breed-select`, you can use any library with stylish select
  options, for example, https://slimselectjs.com/.
- Instead of `p.loader`, you can utilize any library with attractive CSS
  loaders, like https://cssloaders.github.io/.
- For `p.error`, you can employ any library with appealing notifications, such
  as [iziToast](https://izitoast.marcelodolza.com/).

---

## Preparing for work

1. Make sure you have the LTS version of Node.js installed on your computer.  
    [Download and install](https://nodejs.org/en/) it if necessary.

2. Install the basic project dependencies in the terminal with the command  
    `npm install`.

3. Start the development mode by running the command `npm run dev` in the  
    terminal.

4. Go to the following address in your browser  
    [http://localhost:5173](http://localhost:5173). This page will automatically
      reload automatically after saving changes to the project files.
