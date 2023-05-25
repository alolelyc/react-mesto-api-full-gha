const { ValidationError, CastError } = require('mongoose').Error;
const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequest400');
const NotFoundError = require('../errors/NotFoundError404');
const ForbiddenError = require('../errors/ForbiddenError403');

const {
  ERR_STATUS_CREATED_201,

} = require('../utils/constants');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id: userId } = req.user;
  Card.create({ name, link, owner: userId })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(ERR_STATUS_CREATED_201).send(card))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError('Некорректные данные при создании новой карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.delCardById = (req, res, next) => {
  const { cardId } = req.params;
  const { _id: userId } = req.user;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError('По указанному id карточка не найдена'));
      }
      if (card.owner.toString() !== userId) {
        next(new ForbiddenError('У Вас отстутствуют права на удаление этой карточки'));
      }
      return Card.findByIdAndRemove(cardId)
        .then(() => res.send(card));
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError('Id пользователя передан некорректно'));
      } else {
        next(err);
      }
    });
};

const changeStatusCardLike = (req, res, next, likeStatus) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('По указанному id карточка не найдена');
      }
      return Card.findByIdAndUpdate(cardId, likeStatus, { new: true })
        .then((cardLike) => cardLike.populate(['owner', 'likes']))
        .then((cardLike) => { res.send(cardLike); });
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError('Данные для установки likes переданы некорректно'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  const { _id: userId } = req.user;
  const likeStatus = { $addToSet: { likes: userId } };
  changeStatusCardLike(req, res, next, likeStatus);
};

module.exports.disLikeCard = (req, res, next) => {
  const { _id: userId } = req.user;
  const likeStatus = { $pull: { likes: userId } }; // убрать _id пользователя из массива
  changeStatusCardLike(req, res, next, likeStatus);
};
