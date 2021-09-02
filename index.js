const mongoose = require('mongoose');
const express = require('express');

const booksController = require('./src/controller/books');

mongoose.connect(process.env.ATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express();

app.use(express.json());

const ok = 200;

const PORT = process.env.PORT;

app.get('/', (_req, res) => {
  res.status(ok).send(
    {
      message: 'Só para voce saber amigo, ta logado; server ok',
    },
  );
});

app.use('/books', booksController);
/* app.use('/sales', salesController); */

app.listen(PORT, () => console.log('O pai ta on!'));