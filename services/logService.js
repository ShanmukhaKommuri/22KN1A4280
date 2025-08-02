const axios = require('axios');

const LOG_API_URL = "http://20.244.56.144/evaluation-service/logs";

async function logEvent(stack, level, pkg, message) {
  try {
    const res = await axios.post(LOG_API_URL, {
      stack,
      level,
      package: pkg,
      message
    });

    console.log("Log sent:", res.data.message);
  } catch (err) {
    console.error("Log error:", err.message);
  }
}

module.exports = { logEvent };
