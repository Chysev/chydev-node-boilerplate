import "../utils/env"
const appConfig = {
    PORT: process.env.PORT,
    VERSION: process.env.VERSION,
    BASEROUTE: process.env.BASEROUTE,

    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: process.env.DATABASE_PORT,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_NAME: process.env.DATABASE_NAME,

    REDIS_URL: process.env.REDIS_URL,

    ENC_KEY_SECRET: process.env.ENC_KEY_SECRET,
    CIPHER_KEY_SECRET: process.env.CIPHER_KEY_SECRET,
    API_KEY_SECRET: process.env.API_KEY_SECRET,
    API_KEY: process.env.API_KEY,

    NODE_ENV: process.env.NODE_ENV,

    API_BASE_URL: process.env.API_BASE_URL || `http://localhost:${process.env.PORT}`,

    WHITELIST: process.env.WHITELIST
        ? process.env.WHITELIST.split(",").map((s) => s.trim())
        : [],
}

export default appConfig