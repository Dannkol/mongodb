import dotenv  from "dotenv";

dotenv.config();

const jwt_config = {
    'secret_key': process.env.SECRET_KEY
}

export default jwt_config