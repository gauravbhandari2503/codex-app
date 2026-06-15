import { fetchNews } from '../services/newsService.js';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function createNewsCard(article) {
  const card = document.createElement('article');
  card.className = 'news-card';

  const date = document.createElement('p');
  date.className = 'news-card-date';
  date.textContent = formatDate(article.date);

  const title = document.createElement('h3');
  title.className = 'news-card-title';
  title.textContent = article.title;

  const content = document.createElement('p');
  content.className = 'news-card-content';
  content.textContent = article.content;

  card.append(date, title, content);
  return card;
}

function renderState(container, message) {
  container.innerHTML = `<p class="news-state">${message}</p>`;
}

export async function initNewsSidebar() {
  const container = document.getElementById('news-list');

  renderState(container, 'Loading news...');

  try {
    const articles = await fetchNews();
    container.innerHTML = '';
    articles.forEach((article) => container.appendChild(createNewsCard(article)));
  } catch {
    renderState(container, 'Failed to load news. Please try again later.');
  }
}
