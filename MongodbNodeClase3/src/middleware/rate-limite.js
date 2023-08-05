import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config();

const checkPayloadSize = (req, res, next) => {
    const payloadSizeLimit = process.env.LIMIT_JSON
    const contentLength = req.headers["content-length"];
    if (contentLength > payloadSizeLimit) {
      return res.status(413).json({
        message: "Payload too large.",
      });
    }
    next();
  };


const configGET = rateLimit({
    windowMs: 30*1000,
    max : 5,
    standardHeaders : true,
    legacyHeaders : true,
    message : {
        menssage : 'Limit exceeded'
    }
})

export { configGET , checkPayloadSize }