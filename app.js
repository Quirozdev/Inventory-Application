require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

const itemsRouter = require('./routes/items');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/items', itemsRouter);

app.get('/', (req, res) => {
  res.render('index', { title: 'xd', message: 'Hola como estasss' });
});

app.use((error, req, res, next) => {
  res.send(error.message);
});

app.listen(8080, () => {
  console.log(`Server started!!`);
});
