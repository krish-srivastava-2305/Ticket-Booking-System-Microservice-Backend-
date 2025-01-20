export const fakeCookie = () => {
    return `express:sess=${Buffer.from(JSON.stringify({
        jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1NiIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTYxMjEzNzEyM30.QD9jVtjs9yF_tFKdxRvPvHu7wQjOK_31mVTbUvLXvkE"
    })).toString("base64")}`;
}