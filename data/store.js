const store = [];


function saveUrl({ originalUrl, shortUrl, expiresAt }) {
  store.push({ originalUrl, shortUrl, createdAt: new Date().toISOString(), expiresAt });
}

function getUrlByShortcode(shortcode) {
  const item = store.find(item => {
    const code = item.shortUrl.split('/').pop();
    return code === shortcode;
  });
  if (!item) return null;
  return {
    originalUrl: item.originalUrl,
    shortUrl: item.shortUrl,
    expiresAt: item.expiresAt,
    createdAt: item.createdAt
  };
}

module.exports = { saveUrl, getUrlByShortcode };
