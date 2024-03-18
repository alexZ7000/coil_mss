import https from 'https';
import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserNotAuthenticated } from '../errors/ModuleError';

dotenv.config();

class AzureProps {
    displayName: string;
    mail: string;
}


export class TokenAuth {
    secret: string;

    constructor() {
        this.secret = process.env.SECRET_KEY || "";
    }

    async generate_token(user_id: string): Promise<string> {
        return jwt.sign({ user_id }, this.secret, { expiresIn: '1d' });
    }

    async decode_token(token: string): Promise<string> {
        const decode_token = jwt.verify(token, this.secret) as JwtPayload;
        if (!decode_token.user_id) {
            throw new UserNotAuthenticated('Invalid or expired token.');
        }
        return decode_token.user_id;
    }

    async verify_azure_token(token): Promise<AzureProps> {
        const url = process.env.AZURE_URL || "";
        console.log('url', url);
        const options = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        return await new Promise((resolve, reject) => {
            https.get(url, options, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    data = JSON.parse(data);
                    if (!data["displayName"] || !data["mail"]) {
                        reject(new UserNotAuthenticated('Invalid or expired token.'));
                    }
                    resolve({
                        displayName: data["displayName"],
                        mail: data["mail"] 
                    });
                });
            }).on("error", (err) => {
                reject(err);
            });
        });
    }
}


