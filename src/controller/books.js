const { Router } = require('express');
const { validName, validQuant, validExist, productNoexist} = require('../middlewares/index');
const models = require('../models/books');

const booksController = Router();
const ok = '200';
const create = 201;

/* booksController.get('/', async (_req, res) => {
  res.status(ok).send( await models.getAll());
}); */

booksController.get('/', models.getAll);

/* booksController.post('/', validName, validQuant, validExist, async (req, res) => {
  const { author_name, quantity, title, cover_image, pages, releaseDate } = req.body;
  const product = await models.create(author_name, quantity, title, cover_image, pages, releaseDate);
  res.status(create).send(product.ops[0]);
}); */

booksController.post('/', models.create);


/* booksController.get('/:id', productNoexist, async (req, res) => {
  const { id } = req.params;
  const product = await models.getBook(id);
  res.status(OK).json(product);
}); */

booksController.get('/:id', models.getBook)


/* booksController.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await models.getBook(id);
  const response = await models.del(id);
  response.result.ok ? res.status(OK).json(product) : '';
}); */

booksController.delete('/:id', models.del);

/* booksController.put('/:id',  validName, validQuant, async (req, res) => {
  let result = '';
  const { id } = req.params;
  const { author_name, quantity, title, cover_image, pages, releaseDate} = req.body;
  const product = await models.update(id, author_name, quantity, title, cover_image, pages, releaseDate);
  product.result.ok ? result = await models.getBook(id): '';
  res.status(OK).json(result);
}); */

booksController.put('/:id', models.update);


module.exports = booksController;