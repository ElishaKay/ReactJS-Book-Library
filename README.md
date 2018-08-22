# ReactJS-Book-Library

<img src="screenshot.jpeg">

Using <a href="https://codepen.io/ivanodintsov/pen/yqvZzO">React Modal Animation Library</a> by Ivan Odintsov.

For testing: you can add axios to the main window object, and run in the Console:

```javascript
axios.get('https://www.googleapis.com/books/v1/volumes?q=harry')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
});
```


Other interesting sources:

https://medium.freecodecamp.org/build-a-best-sellers-list-with-new-york-times-google-books-api-46201c30aec7

With the New York Times API, you can fetch a list of top sellers. You can then fetch the book covers by querying the google books API with the ISBN (from the NYTimes results)

https://www.googleapis.com/books/v1/volumes?q=ISBN:0525557628