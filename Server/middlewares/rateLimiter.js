import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: {
    status: 429,
    message: "Too many login attempts. Please try again later.",
  },
});
