interface event {
    headers: string | { [key: string]: any };
    body: string | { [key: string]: any };
    queryStringParameters: string | { [key: string]: any };
}

export class HttpResponse {
    statusCode: number;
    headers: {
        'Content-Type': 'application/json';
        'Access-Control-Allow-Origin': string;
    };
    body: { "message": string; "data": { [key: string]: any } };

    constructor(statusCode: number, body: { [key: string]: any }, message: string) {
        this.statusCode = statusCode;
        this.headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        };
        this.body = {
            "message": message,
            "data": body
        };
    }
}

export class HttpRequest {
    headers: {
        "Authorization": string | null;
    };
    body: {
        body: { [key: string]: any };
        queryStringParameters: { [key: string]: any };
    };
    constructor(event: event) {
        this.headers = { Authorization: this.get_authorization(event.headers) };
        this.body = this.get_body(event);
    }

    private get_authorization(headers: event["headers"]) {
        if (!headers) return null;
        if (typeof headers === "string") {
            headers = JSON.parse(headers);
        }
        return headers["Authorization"] || null;
    }

    private get_body(event: event) {
        let body: { body: { [key: string]: any }; queryStringParameters: { [key: string]: any } } = { body: {}, queryStringParameters: {} };
        if (typeof event.body === "string") {
            body.body = JSON.parse(event.body);
        } else {
            body.body = event.body;
        }
        if (typeof event.queryStringParameters === "string") {
            body["queryStringParameters"] = JSON.parse(event.queryStringParameters);
        } else {
            body["queryStringParameters"] = event.queryStringParameters;
        }
        
        return body;
    }
}

export class OK extends HttpResponse {
    constructor(body: { [key: string]: any }, message: string) {
        super(200, body, message);
    }
}

export class Created extends HttpResponse {
    constructor(body: { [key: string]: any }, message: string) {
        super(201, body, message);
    }
}

export class BadRequest extends HttpResponse {
    constructor(body: { [key: string]: any }, message: string) {
        super(400, body, message);
    }
}

export class Unauthorized extends HttpResponse {
    constructor(body: { [key: string]: any }, message: string) {
        super(401, body, message);
    }
}

export class Forbidden extends HttpResponse {
    constructor(body: { [key: string]: any }, message: string) {
        super(403, body, message);
    }
}

export class NotFound extends HttpResponse {
    constructor(body: { [key: string]: any }, message: string) {
        super(404, body, message);
    }
}

export class ParameterError extends HttpResponse {
    constructor(body: { [key: string]: any }, message: string) {
        super(422, body, message);
    }
}

export class InternalServerError extends HttpResponse {
    constructor(body: { [key: string]: any }, message: string) {
        super(500, body, message);
    }
}