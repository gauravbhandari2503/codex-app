const NEWS_URL = '/data/news.json';

export async function fetchNews() {
  const response = await fetch(NEWS_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch news: ${response.status}`);
  }
  return response.json();
}
