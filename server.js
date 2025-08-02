const express = require('express');
const app = express();
const urlRoutes = require('./routes/urlRoutes');
const loggingMiddleware = require('./middlewares/logger');

app.use(express.json());
app.use(loggingMiddleware);

app.use('/', urlRoutes);

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
