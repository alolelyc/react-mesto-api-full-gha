// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://alolelyc.nomoredomains.monster',
  'http://alolelyc.nomoredomains.monster',
  'http://localhost:3000',
  'https://localhost:3000',

];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  res.header('Access-Control-Allow-Credentials', true);
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return res.status(200).end();
  }

  return next();
};

module.exports = cors;
