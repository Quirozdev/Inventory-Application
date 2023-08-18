require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const { connectToDB } = require('./models/db');

const itemsRouter = require('./routes/items');

async function main() {
  await connectToDB();

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/items', itemsRouter);

  app.get('/', (req, res) => {
    res.render('index', { title: 'xd', message: 'Hola como estasss' });
  });

  app.use((error, req, res, next) => {
    console.log(error);
  });

  app.listen(8080, () => {
    console.log(`Server started!!`);
  });
}

main();
