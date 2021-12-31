const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();


const{
    PORT,
    HOST,
    DATABASE_USER,
    PASSWORD,
    DATABASE_NAME,
    DATABASE_PORT,
    URI

} = process.env;

assert(PORT, 'PORT is required');

module.exports = {

    port: PORT,
    host: HOST,
    user: DATABASE_USER,
    password: PASSWORD,
    name: DATABASE_NAME,
    database_port: DATABASE_PORT,
    uri: URI
    
}