import { app } from "../../app";
import request from "supertest";

// 1. Test for successful signin
it("return a 200 on successful signin", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(201)
    return request(app)
        .post("/api/users/signin")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(200)
})

// 2. Test for invalid email or password
it("return a 400 with invalid email or password", async () => {
    await request(app)
        .post("/api/users/signin")
        .send({
            email: "test@test.com",
            password: "p"
        })
        .expect(400)
    return request(app)
        .post("/api/users/signin")
        .send({
            email: "nkasjcn",
            password: "password"
        })
        .expect(400)
})

// 3. Test for missing email and password
it("return a 400 with missing email and password", async () => {
    return request(app)
        .post("/api/users/signin")
        .send({})
        .expect(400)
})

// 4. Test for setting a cookie after successful signin
it("Sets a cookie after successful signin", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(201)
    const response = await request(app)
                        .post("/api/users/signin")
                        .send({
                            email: "test@test.com",
                            password: "password"
                        })
                        .expect(200)
    expect(response.get("Set-Cookie"))
})

