import request from "supertest";
import { app } from "../../app";
import { signup } from "../../test/signup-helper";

it("returns user details when authenticated", async () => {
    const cookie = await signup();
    expect(cookie).toBeDefined();
    
    const response = await request(app)
        .get("/api/users/get-user")
        .set("Cookie", cookie!) 
        .send()
        .expect(200);

    expect(response.body.currentUser).toBeDefined();
    expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("returns null when not authenticated", async () => {
    const response = await request(app)
        .get("/api/users/get-user")
        .send()
        .expect(200);
    expect(response.body.currentUser).toBeNull();
});
