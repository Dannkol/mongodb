import rateLimit from "express-rate-limit";

const configGET = rateLimit({
    windowMs: 30*1000,
    max : 5,
    standardHeaders : true,
    legacyHeaders : true,
    message : {
        menssage : 'Limit exceeded'
    }
})

export { configGET }