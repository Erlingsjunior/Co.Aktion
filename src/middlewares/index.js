const { findName } = require('../models/books');

const ERROR = 422;
const ZERO = 0;

//validando se o nome do livro eh uma string
const validName = (req, res, next) => {
  const MIN_NAME_LENGHT = 2;
  const { name } = req.body;
  if (typeof name !== 'string') return res.status(ERROR)
    .json({
      err: {
        code: 'invalid_data',
        message: '"nome" deve ser uma string',
      },
    });

    //validando se o campo nome nao esta vazio e tem mais que 2 caracteres
  if ((name === '') || (name === undefined) || (name.length < MIN_NAME_LENGHT)) {
    return res.status(ERROR).json({
      err: {
        code: 'invalid_data',
        message: '"nome" deve conter no minimo 2 caracteres',
      },
    });
  };
  next();
};

//verificando se a quantidade de livros é um numero
const validQuant = (req, res, next) => {
  const { quantity } = req.body;
  if (typeof quantity !== 'number') return res.status(ERROR)
    .json({
      err: {
        code: 'invalid_data',
        message: '"quantidade" deve ser um numero',
      },
    });
    //validando se a quantidade de livros é maior que zero
  if ((+quantity < 1) || (+quantity === ZERO))  return res.status(ERROR).json({
    err: {
      code: 'invalid_data',
      message: '"quantidade" deve ser maior ou igual a 1',
    },
  });
  next();
};


//validando se livro adicionado como novo ja existe
const validExist = async(req, res, next) => {
  const { name } = req.body;
  let check = await findName(name);
  if (check) {
    return res.status(ERROR).json({
      err: {
        code: 'invalid_data',
        message: 'Esse livro já exsite',
      },
    });
  }
  next();
};


//validando se o id existe
const productNoexist = async(req, res, next) => {
  const { id } = req.params;
  let check = await getBook(id);
  if (!check) {
    return res.status(ERROR).json({
      err: {
        code: 'invalid_data',
        message: 'Numero de id invalido',
      },
    });
  }
  next();
};



module.exports = { validName, validQuant, validExist, productNoexist };
