const express = require('express');

const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cards = require('./routes/cards');
const users = require('./routes/users');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { handlerCentrError } = require('./middlewares/handlerCentrError');
const NotFoundError = require('./errors/NotFoundError404');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const {
  validationLogin,
  validationCreateUser,
} = require('./middlewares/validators/userValidation');

const { PORT = 3005 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});
app.use(cors);

app.use(requestLogger); // подключаем логгер запросов

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validationCreateUser, createUser);
app.post('/signin', validationLogin, login);

app.use('/users', auth, users);
app.use('/cards', auth, cards);
app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Данный URL не существует'));
});

app.use(errorLogger);
app.use(errors());
app.use(handlerCentrError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
