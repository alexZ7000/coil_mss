import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { handler as get_user } from './src/modules/get_user/app/get_user_presenter';
import { handler as assign_user } from './src/modules/assign_user/app/assign_user_presenter';
import { handler as get_activity } from './src/modules/get_activity/app/get_activity_presenter';
import { handler as update_activity } from './src/modules/update_activity/app/update_activity_presenter';
import { handler as get_institution } from './src/modules/get_institution/app/get_institution_presenter';
import { handler as create_activity } from './src/modules/create_activity/app/create_activity_presenter';
import { handler as create_moderator } from './src/modules/create_moderator/app/create_moderator_presenter';
import { handler as create_institution } from './src/modules/create_institution/app/create_institution_presenter';
import { handler as update_institution } from './src/modules/update_institution/app/update_institution_presenter';
import { handler as get_all_activities } from './src/modules/get_all_activities/app/get_all_activities_presenter';
import { handler as update_user_activity } from './src/modules/update_user_activity/app/update_user_activity_presenter';
import { handler as get_all_institutions } from './src/modules/get_all_institutions/app/get_all_institutions_presenter';
import { handler as get_activity_requirements } from './src/modules/get_activity_requirements/app/get_activity_requirements_presenter';
import { handler as get_all_activities_enrolled } from './src/modules/get_all_activities_enrolled/app/get_all_activities_enrolled_presenter';

dotenv.config();
function RequestFormatter(headers: any, body: any, queryStringParameters: any) {
    return {
        headers: {
            Authorization: headers.authorization
        },
        body: body,
        queryStringParameters: queryStringParameters
    }
}

const app: Express = express();
app.use(express.json());
const port = 3000;

// Checked
app.get('/get-user', async (req: Request, res: Response) => {
    const request = RequestFormatter(req.headers, req.body, req.query);
    const response = await get_user(request, null);
    res.status(response.statusCode).send(response.body);
})

// Checked
app.get('/get-activity-requirements', async (req: Request, res: Response) => {
    const request = RequestFormatter(req.headers, req.body, req.query);
    const response = await get_activity_requirements(request, null);
    res.status(response.statusCode).send(response.body);
})

// Checked
app.get('/get-activity', async (req: Request, res: Response) => {
    const request = RequestFormatter(req.headers, req.body, req.query);
    const response = await get_activity(request, null);
    res.status(response.statusCode).send(response.body);
})

// Checked
app.get('/get-institution', async (req: Request, res: Response) => {
    const request = RequestFormatter(req.headers, req.body, req.query);
    const response = await get_institution(request, null);
    res.status(response.statusCode).send(response.body);
})

// Checked
app.get('/get-all-activities', async (req: Request, res: Response) => {
    const request = RequestFormatter(req.headers, req.body, req.query);
    const response = await get_all_activities(request, null);
    res.status(response.statusCode).send(response.body);
})

// Checked
app.get('/get-all-institutions', async (req: Request, res: Response) => {
    const request = RequestFormatter(req.headers, req.body, req.query);
    const response = await get_all_institutions(request, null);
    res.status(response.statusCode).send(response.body);
})

// Checked
app.get('/get-all-activities-enrolled', async (req: Request, res: Response) => {
    const request = RequestFormatter(req.headers, req.body, req.query);
    const response = await get_all_activities_enrolled(request, null);
    res.status(response.statusCode).send(response.body);
})

// Checked
app.post('/create-activity', async (req: Request, res: Response) => {
    const request = RequestFormatter(req.headers, req.body, req.query);
    const response = await create_activity(request, null);
    res.status(response.statusCode).send(response.body);
})

// Checked
app.post('/create-institution', async (req: Request, res: Response) => {
    const request = RequestFormatter(req.headers, req.body, req.query);
    const response = await create_institution(request, null);
    res.status(response.statusCode).send(response.body);
})

// 
app.post('/create-moderator', async (req: Request, res: Response) => {
    const request = RequestFormatter(req.headers, req.body, req.query);
    const response = await create_moderator(request, null);
    res.status(response.statusCode).send(response.body);
})

// Checked
app.get('/assign-user', async (req: Request, res: Response) => {
    const request = RequestFormatter(req.headers, req.body, req.query);
    const response = await assign_user(request, null);
    res.status(response.statusCode).send(response.body);
})

// 
app.post('/update-activity', async (req: Request, res: Response) => {
    const request = RequestFormatter(req.headers, req.body, req.query);
    const response = await update_activity(request, null);
    res.status(response.statusCode).send(response.body);
})

// Checked
app.post('/update-institution', async (req: Request, res: Response) => {
    const request = RequestFormatter(req.headers, req.body, req.query);
    const response = await update_institution(request, null);
    res.status(response.statusCode).send(response.body);
})

// Checked
app.post('/update-user-activity', async (req: Request, res: Response) => {
    const request = RequestFormatter(req.headers, req.body, req.query);
    const response = await update_user_activity(request, null);
    res.status(response.statusCode).send(response.body);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});