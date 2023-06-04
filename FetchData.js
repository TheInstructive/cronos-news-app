const cache = {};

async function fetchData(url) {
  if (cache[url]) {
    return cache[url];
  } else {
    try {
      const response = await fetch(url);
      const data = await response.json();

      cache[url] = data;

      return data;
    } catch (error) {
      console.error('Error occurred while fetching data:', error);
      throw error;
    }
  }
}

export function fetchNewsData(collectionId, page) {
  const url = `https://mellifluous-centaur-e6602b.netlify.app/news?id=${collectionId}&page=${page}`;
  return fetchData(url);
}

export function fetchCollectionData() {
  const url = 'https://collections.cronos.news/index.json';
  return fetchData(url);
}
