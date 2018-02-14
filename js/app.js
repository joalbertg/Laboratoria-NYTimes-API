const sendXHR = document.getElementById('submit-btn');
const sendFetch = document.getElementById('submit-fetch-btn');

const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');

let searchForText = null;

const XHR = ((window, document) => {
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
  };

  const handleError = () => {
    console.error('Se ha presentado un error!!');
  };

  const getNews = str => {
    const articleRequest = new XMLHttpRequest();

    articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${str}&api-key=15c0308eb388472089bea2e37e7b0cbc`);
    articleRequest.onload = addNews;
    articleRequest.onerror = handleError;

    console.log(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${str}&api-key=15c0308eb388472089bea2e37e7b0cbc`);

    articleRequest.send();
  };

  return {
    getNews: getNews
  };
})(window, document);

const FETCH = ((document, window) => {
  const addNews = data => {
    console.log(data);

    const article = data.response.docs[0];
    const title = article.headline.main;
    const snippet = article.snippet;

    let li = document.createElement('li');

    li.className = 'articleClass';
    li.innerText = snippet;

    responseContainer.appendChild(li);
  };

  const handleError = () => {
    console.error('Se ha presentado un error!!');
  };

  const getNews = str => {
    if (self.fetch) {
      let url = `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${str}&api-key=15c0308eb388472089bea2e37e7b0cbc`;

      fetch(url)
        .then(response => response.json())
        .then(addNews)
        .catch(handleError);
    } else {
      // ¿hacer algo con XMLHttpRequest?
    }
  };

  return {
    getNews: getNews
  };
})(document, window);

const preventClear = event => {
  event.preventDefault();

  responseContainer.innerText = '';
};

const searchXHR = event => {
  preventClear(event);
  XHR.getNews(searchField.value);
};

const searchFetch = event => {
  preventClear(event);
  FETCH.getNews(searchField.value);
};

sendXHR.addEventListener('click', searchXHR);
sendFetch.addEventListener('click', searchFetch);

searchField.focus();
