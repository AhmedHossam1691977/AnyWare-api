import rateLimit from "express-rate-limit";

export const limiter = (limit = 100, hours = 0.25) => {
  const windowMs = hours * 60 * 60 * 1000; 

  return rateLimit({
    windowMs,
    limit,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    handler: (req, res, next, options) => {
      return res.status(429).json({
        success: false,
        message: `Too many requests, please try again after ${hours} hour(s).`,
        limit: options.limit,
        window: `${hours * 60} minutes`,
      });
    },
  });
};
