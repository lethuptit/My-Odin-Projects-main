const express = require('express');
const app = express();

const PORT = process.env.PORT || 4001;
// Use static server to serve the Express Yourself Website
app.use(express.static('public'));

// Import and mount the expressionsRouter
const expressionsRouter = require('./expressions.js');
app.use('/expressions', expressionsRouter);

const animalsRouter  = require('./animals.js');
app.use('/animals', animalsRouter );

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
