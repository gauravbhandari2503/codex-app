const NEWS_URL = '/data/news.json';

/**
 * Fetches the trending news dataset.
 *
 * @returns {Promise<unknown>} Parsed JSON loaded from the configured news URL.
 * @throws {Error} When the news request returns a non-success HTTP status.
 */
export async function fetchNews() {
  const response = await fetch(NEWS_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch news: ${response.status}`);
  }
  return response.json();
}
