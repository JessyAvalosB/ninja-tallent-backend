import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

// MongoDB config
const mongoUser = process.env.MONGODB_USER;
const mongoPassword = process.env.MONGODB_PASSWORD;
const mongodbURI = `mongodb+srv://${mongoUser}:${mongoPassword}@ninja-talent-challenge.kmrqv4t.mongodb.net`;

export const dbName = "ninja_talent_challenge";

export const client = new MongoClient(mongodbURI);
