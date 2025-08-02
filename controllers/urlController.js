const { logEvent } = require('../services/logService');
const { saveUrl, getUrlByShortcode } = require('../data/store');
const moment = require('moment');

const BASE_URL = "http://localhost:5000/";

const shortenUrl = async (req, res) => {
  try {
    const { url, shortcode, validity } = req.body;

    if (!url) {
      await logEvent("backend", "error", "handler", "Missing 'url' in request");
      return res.status(400).json({ error: "url is required" });
    }
    const shortCode = shortcode;
    const shortUrl = BASE_URL + shortCode;
    let expiresAt;
    if (validity) {
      const expirationDate = moment().add(Number(validity), 'days');
      expiresAt = expirationDate.toISOString();
    } else {
      expiresAt = moment().add(30, 'minutes').toISOString();
    }

    saveUrl({ originalUrl: url, shortUrl, expiresAt });
    await logEvent("backend", "info", "handler", `Shortened URL created: ${shortUrl}`);

    res.status(201).json({ shortLink: shortUrl, expiry: expiresAt });

  } catch (error) {
    await logEvent("backend", "fatal", "handler", `Unexpected error: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getHistory = async (req, res) => {
  try {
    const { shortcode } = req.params;
    if (shortcode) {
      const urlObj = getUrlByShortcode(shortcode);
      if (!urlObj) {
        await logEvent("backend", "warn", "handler", `Shortcode not found: ${shortcode}`);
        return res.status(404).json({ error: "Shortcode not found" });
      }
      await logEvent("backend", "info", "handler", `Shortcode retrieved: ${shortcode}`);
      return res.status(200).json({ url: urlObj });
    } 
  } catch (error) {
    await logEvent("backend", "fatal", "handler", `Failed to retrieve history: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { shortenUrl, getHistory };
