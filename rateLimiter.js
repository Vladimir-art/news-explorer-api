const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 50,
  message: 'Слишком много запросов по этому IP, попробуйте продолжить через 10 минут...',
});

module.exports = limiter;
