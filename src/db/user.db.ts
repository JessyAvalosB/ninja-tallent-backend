import {
  WithId,
  ObjectId,
  InsertOneResult,
  UpdateResult,
  DeleteResult,
  Document,
} from "mongodb";

import { client, dbName } from "./mongodbConfig";
import { User } from "../interfaces/db/user.interface";

/**
 * Function to get all users from the DB.
 * @returns Promise<WithId<Document>>
 */
export const getAllUsersDB = async (): Promise<WithId<Document>[]> => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("users");
  const users = await collection.find({}).toArray();
  client.close();
  return users;
};

/**
 * Function to get user information by _id
 * @param _id: string
 * @returns Promise<WithId<Document>>
 */
export const getUserDB = async (
  _id: string
): Promise<WithId<Document> | null> => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("users");
  const user = await collection.findOne({ _id: new ObjectId(_id) });
  client.close();
  return user;
};

/**
 * Function to create a new user.
 * @param user: User
 * @returns Promise<InsertOneResult<Document>>
 */
export const addUserDB = async (
  user: User
): Promise<InsertOneResult<Document>> => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("users");
  const didInserted = await collection.insertOne(user);
  client.close();
  return didInserted;
};

/**
 * Function to update a user.
 * @param user: User
 * @returns Promise<UpdateResult>
 */
export const updateUserDB = async (user: User): Promise<UpdateResult> => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("users");
  const didUpdate = await collection.updateOne(
    { _id: new ObjectId(user._id) },
    {
      $set: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        birthDate: user.birthDate,
        address: user.address,
      },
    }
  );
  client.close();
  return didUpdate;
};

/**
 * Function to delete a user by their _id.
 * @param _id: string
 * @returns Promise<DeleteResult>
 */
export const deleteUserDB = async (_id: string): Promise<DeleteResult> => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("users");
  const didDeleted = await collection.deleteOne({ _id: new ObjectId(_id) });
  client.close();
  return didDeleted;
};
