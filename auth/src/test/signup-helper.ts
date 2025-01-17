import request from "supertest";
import { app } from "../app";

export const signup = async () => {
    const response = await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        });
    
    const cookie = response.get('Set-Cookie');
    return cookie;
}
