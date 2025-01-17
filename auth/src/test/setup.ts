import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

// Setup

// 1. Connect to MongoDB
let mongo: any;
beforeAll(async () => {
    process.env.JWT_SECRET_KEY = "asdf";
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri.toString());
})

// 2. Clear the database before each test
beforeEach(async () => {
    const collections = await mongoose.connection.db?.collections();
    if(!collections) return;
    for(let collection of collections) {
        await collection.deleteMany({});
    }
})

// 3. Close the connection to MongoDB
afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
})
