import request from "supertest";
import { app } from "../../app";
import { signup } from "../../test/signup-helper";

it("clears the cookie after signing out", async () => {
    const cookie = await signup();

    const response = await request(app)
                        .post("/api/users/signout")
                        .set("Cookie", cookie!)
                        .send({})
                        .expect(200)

    expect(response.get("Set-Cookie"))
})
