import request from "supertest";
import { app } from "../../app";

it("returns 401 when not signed in", async () => {
    return request(app)
        .post("/api/orders/create")
        .send({})
        .expect(401);
});

it("returns 400 when invalid request body is provided", async () => {
    return request(app)
        .post("/api/orders/create")
        .set("Cookie", global.signin())
        .send({})
        .expect(400);
});
