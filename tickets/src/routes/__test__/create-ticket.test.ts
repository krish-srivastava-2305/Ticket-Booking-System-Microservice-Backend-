import request from "supertest";
import { app } from "../../app";
import { fakeCookie } from "../../test/fakeCookie";

// it("api listens at /api/tickets", async () => {
//     const response = await request(app).post("/api/tickets/create").send({});
//     expect(response.status).toEqual(200);
// })

it("user is not authenticated", async () => {
    return request(app)
        .post("/api/tickets/create")
        .send({
            title: "test",
            price: "10"
        })
        .expect(401);
})

it("invalid title", async () => {
    const response = await request(app)
        .post("/api/tickets/create")
        .set("Cookie", fakeCookie())
        .send({ title: "", price: "10" })
        .expect(400);
    expect(response.body.errors[0].message).toEqual("Title is required");
})

it("invalid price", async () => {
    const response = await request(app)
        .post("/api/tickets/create")
        .set("Cookie", fakeCookie())
        .send({ title: "test", price: "-10" })
        .expect(400);
    expect(response.body.errors[0].message).toEqual("Price must be greater than 0");    
})

it("valid inputs returns 201 with ticket", async () => {
    const title = "test";
    const price = "10";
    const response = await request(app)
        .post("/api/tickets/create")
        .set("Cookie", fakeCookie())
        .send({ title, price })
        .expect(201);
    expect(response.body.title).toEqual(title);
    expect(response.body.price).toEqual(price);
})
