const $form = $('#search-form');
const $searchField = $('#search-keyword');
const $responseContainer = $('#response-container');

let searchForText = null;

const addNews = data => {
  console.log(data);

  const article = data.response.docs[0];
  const title = article.headline.main;
  const snippet = article.snippet;

  let $li = $('<li>');

  $li.addClass('articleClass');
  $li.text(snippet);

  $responseContainer.append($li);
};

const handleError = () => {
  console.error('Se ha presentado un error!!');
};

const getNews = () => {
  const articleRequest = new XMLHttpRequest();

  $.ajax({ url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${ searchForText }&api-key=15c0308eb388472089bea2e37e7b0cbc` })
    .done(addNews)
    .fail(handleError);
};

const search = event => {
  event.preventDefault();

  $responseContainer.text('');
  searchForText = $searchField.value;

  getNews();
};

$form.on('submit', search);
$searchField.focus();
