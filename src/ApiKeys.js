export const nytimes_key = "e7d46b3683014c88ade24365a40b3b93"

const LATEST_URL = `https://content.api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${nytimes_key}`;
const REC_URL = (section) => `https://api.nytimes.com/svc/news/v3/content/all/${section}.json?api-key=${nytimes_key}`

export const urls = {
  latest: LATEST_URL,
  recommended: REC_URL
}
