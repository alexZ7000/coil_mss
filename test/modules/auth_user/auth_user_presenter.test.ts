import { it, expect, describe } from 'vitest';
import { MockRepo } from '../../../src/core/repositories/MockRepo';
import { handler } from '../../../src/modules/auth_user/app/auth_user_presenter';

describe("Assert Auth User Presenter", () => {
    // const mockRepo = new MockRepo();
    
    // it("should return a valid response", async () => {
    //     const event = {
    //         headers: {
    //             "Authorization": "eyJ0eXAiOiJKV1QiLCJub25jZSI6ImozOHRaUXhyZ25GdUpnSXhzRFNabWtBTk14R2QwVnA5X3Z2Z0xRTGxpalUiLCJhbGciOiJSUzI1NiIsIng1dCI6IlhSdmtvOFA3QTNVYVdTblU3Yk05blQwTWpoQSIsImtpZCI6IlhSdmtvOFA3QTNVYVdTblU3Yk05blQwTWpoQSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9jNDllMTkzOS00YjUzLTQ3MzgtYmI2NC00MWZiMjk5MGU0MWMvIiwiaWF0IjoxNzEwNjk5MzUyLCJuYmYiOjE3MTA2OTkzNTIsImV4cCI6MTcxMDcwMzY1NSwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFWUUFxLzhXQUFBQThLcGE5MVoyT0JCbGd5YTNvNXpPWVhkK3Axak1iMk16YlRvRkhibmsvdHUwa002U0ZTODB0K01wcmRTYlJjU1JjYUwza08zeEFmSDl5Q1R5NDJFTjB5bGVzL1NlZGVqaGp0S0NYMERXSlRJPSIsImFtciI6WyJwd2QiLCJyc2EiXSwiYXBwX2Rpc3BsYXluYW1lIjoiQ29sbGFib3JhdGl2ZSBPbmxpbmUgSW50ZXJuYXRpb25hbCBMZWFybmluZyBQcm9ncmFtIChDT0lMKSAtIElNVCIsImFwcGlkIjoiNjk0MWViYzYtOTc5Ny00ZDAyLTkyNTktZDQ1NDliOTllN2RkIiwiYXBwaWRhY3IiOiIwIiwiZGV2aWNlaWQiOiI2NDFmNzEyYy1hNzkzLTQ1NDgtYmJiYy00MzNiNDY3OWQyOWEiLCJmYW1pbHlfbmFtZSI6IkNBUklMTE8iLCJnaXZlbl9uYW1lIjoiRkVMSVBFIiwiaWR0eXAiOiJ1c2VyIiwiaXBhZGRyIjoiMjgwNDoxNGM6YmY1Mjo5NGQ0OjM1NmQ6M2ZlNzpkZjNhOjUyNGUiLCJuYW1lIjoiRkVMSVBFIENBUklMTE8iLCJvaWQiOiJkZTE1NTg1NS1jNzE5LTQ1MmItYTEzZi03OGRmZWE3Zjc0MDkiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMTI1MTA5MjMyNS0xMDA3MzgzNTc4LTkyOTcwMTAwMC02MTcwNCIsInBsYXRmIjoiMyIsInB1aWQiOiIxMDAzMjAwMjU3OTBENjVDIiwicmgiOiIwLkFROEFPUm1leEZOTE9FZTdaRUg3S1pEa0hBTUFBQUFBQUFBQXdBQUFBQUFBQUFBUEFDMC4iLCJzY3AiOiJvcGVuaWQgcHJvZmlsZSBVc2VyLlJlYWQgZW1haWwiLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJDZkhLV0xNREhCdk8ydExpdTZSYzdvOXA0N0VfbTFWNE9IVUJyQ0t2NjhrIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IlNBIiwidGlkIjoiYzQ5ZTE5MzktNGI1My00NzM4LWJiNjQtNDFmYjI5OTBlNDFjIiwidW5pcXVlX25hbWUiOiIyMy4wMDc2NS02QG1hdWEuYnIiLCJ1cG4iOiIyMy4wMDc2NS02QG1hdWEuYnIiLCJ1dGkiOiJnS2ZVa1pSaUcwV2lKS3NXZlF1c0FBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX3N0Ijp7InN1YiI6ImhoV2E4aGVVY2JHNG1UdVpZWWFZdEo5NlhEVml0c3p3VWl3c1VkSUhDb00ifSwieG1zX3RjZHQiOjE0NDM0ODcxNTV9.gMdXVK4-TsbUa9WyvmxymzrYJjItV1-pzkT9jlxnSBwdULlEDaA6Dl6-oknPXSDlD8GbNxZTI9uU8xpxvZMRNjXCv95Ecg2b-HDfr-MkJ80wjawS9SBJUBSGKneSqN6_ZxmaGBvF9RjD0CfdnCgdFVN6mY7cy-refqqZPBU1ALH8OV1vmj8Fs6FObOAwQhMbvNlm85yoBwbJ51Dewl5hYwvFBpPNjkXedDI1XwvYET8ZRPHeu5poTzpHxJNbV-2NnJfaZ9t3jpDzvlVFQxepryGHFfZmTpYgTqQkdgNMctW_3LHlQcwj3S0xGSF1YDHje8V_DNFRs-UhdTvTDcuquQ"
    //         },
    //         body: null,
    //         queryStringParameters: null,
    //     };

    //     const context = {};

    //     const response = await handler(event, context);

    //     console.log(response);

    //     expect(response?.statusCode).toBe(200);
    //     expect(JSON.parse(response?.body).data.token).toBeDefined();
    // });
});
