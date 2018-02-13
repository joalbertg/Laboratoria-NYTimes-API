const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');

let searchForText = null;

const addNews = function() {
  const data = JSON.parse(this.responseText);

  console.log(data);

  const article = data.response.docs[0];
  const title = article.headline.main;
  const snippet = article.snippet;

  let li = document.createElement('li');

  li.className = 'articleClass';
  li.innerText = snippet;

  responseContainer.appendChild(li);
}

const handleError = () => {
  console.error('Se ha presentado un error!!');
}

const getNews = () => {
  const articleRequest = new XMLHttpRequest();

  articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${ searchForText }&api-key=15c0308eb388472089bea2e37e7b0cbc`);
  articleRequest.onload = addNews;
  articleRequest.onerror = handleError;
  console.log(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${ searchForText }&api-key=15c0308eb388472089bea2e37e7b0cbc`);
  articleRequest.send();
}

const search = event => {
  event.preventDefault();

  responseContainer.innerText = '';
  searchForText = searchField.value;

  getNews();
}

form.addEventListener('submit', search);
searchField.focus();
