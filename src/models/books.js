const BookSchema = require('./booksSchema');

const { ObjectId } = require('mongodb');
const booksSchema = require('./booksSchema');

/* const create = async (author_name, quantity, title, cover_image, pages, releaseDate) =>
  BookSchema.insertOne({ author_name, quantity, title, cover_image, pages, releaseDate });
 */
const create = async (req, res) => {
  const { author_name, quantity, title, cover_image, pages, releaseDate } = req.body;

  const book = await BookSchema.create({
    author_name,
    quantity,
    title,
    cover_image,
    pages,
    releaseDate,
  });
  res.json(book);
};

/* const del = async (id) => BookSchema.deleteOne({ _id: ObjectId(id) }); */

const del = async (req, res) => {
  const { id } = req.params;

  const bookDelete = await BookSchema.deleteOne({ _id: ObjectId(id) });
  res.json(bookDelete);
}


const getAll = async (req, res) => {
  const books = await BookSchema.find();
  return res.json(books);
};

/* const getBook = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return BookSchema.findOne(new ObjectId(id));
}; */

const getBook = async (req, res) => {
  const {id} = req.params;

  const books = await BookSchema.findOne({ _id: id });
  return res.json(books);
}


/* const findName = async (title) => {
  return connection().then((db) => db.collection('livros').findOne({ title }));
}; */


/* const update = async (id, author_name, quantity, title, cover_image, pages, releaseDate) =>
  connection().then((db) =>
    db
      .collection('livros')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { author_name, quantity, title, cover_image, pages, releaseDate } }
      )
  ); */

const update = async (req, res) => {
  const {author_name, quantity, title, cover_image, pages, releaseDate} = req.body;
  const {id} = req.params;
  const response = await BookSchema.updateOne(
    { _id: ObjectId(id) },
    { $set: { author_name, quantity, title, cover_image, pages, releaseDate } }
  )
  res.json({ message: "alteração feita com sucesso", response })
};

module.exports = { create, getAll, getBook, update, del };
