import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const admin_id = "764f9730-433c-42df-b0bc-517fcf3778be"

console.log(jwt.sign({ user_id: admin_id }, process.env.SECRET_KEY || "", { expiresIn: '1d' }));