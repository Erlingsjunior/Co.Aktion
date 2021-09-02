const mongoose = require('mongoose');
const express = require('express');

const booksController = require('./src/controller/books');

mongoose.connect('mongodb+srv://biblioteca:biblioteca@cluster0.9ff10.mongodb.net/biblioteca?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express();

app.use(express.json());

const ok = 200;



app.get('/', (_req, res) => {
  res.status(ok).send(
    {
      message: 'Só para voce saber amigo, ta logado; server ok',
    },
  );
});

app.use('/books', booksController);
/* app.use('/sales', salesController); */

app.listen('3333', () => console.log('O pai ta on!'));