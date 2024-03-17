import https from 'https';
import jwt, { JwtPayload } from 'jsonwebtoken';


class AzureProps {
    displayName: string;
    mail: string;
}


export class TokenAuth {
    secret: string;

    constructor() {
        this.secret = process.env.SECRET || "";
    }

    async generate_token(user_id: string): Promise<string> {
        return jwt.sign({ user_id }, this.secret, { expiresIn: '1d' });
    }

    async decode_token(token: string): Promise<string | JwtPayload | null> {
        try {
            return jwt.verify(token, this.secret);
        }
        catch (error) {
            return null;
        }
    }

    async verify_azure_token(token): Promise<AzureProps> {
        const url = process.env.AZURE_URL || "";
        const options = {
            headers: {
                Authorizaiton: `Bearer ${token}`
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


