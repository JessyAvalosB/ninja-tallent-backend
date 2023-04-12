import { Document, WithId } from "mongodb";
import { Request, Response } from "express";
import {
  addUserDB,
  deleteUserDB,
  getAllUsersDB,
  getUserDB,
  updateUserDB,
} from "../db/user.db";

// Get all users
const getAllUsers = async (req: Request, res: Response) => {
  let status: number = 200;
  let response: string = "";
  let users: WithId<Document>[] = [];

  await getAllUsersDB()
    .then((data) => {
      users = data;
      response = "Get all users successfully";
    })
    .catch((err) => {
      status = 400;
      response = err.message;
    });

  res.status(status).send({ response, data: users });
};

// Add a new user
const addUser = async (req: Request, res: Response) => {
  const { user } = req.body;
  let status: number = 200;
  let response: string = "";
  let didInserted: boolean = false;

  await addUserDB(user)
    .then((data) => {
      response = `User added successfully: ${data.insertedId}`;
      didInserted = true;
    })
    .catch((err) => {
      status = 400;
      response = err.message;
    });

  res.status(status).send({ response, didInserted });
};

// Get user by Id
const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  let status: number = 200;
  let response: string = `Get user with id ${id}`;
  let user: WithId<Document> | null = null;

  await getUserDB(id)
    .then((data) => {
      user = data;
    })
    .catch((err) => {
      status = 400;
      response = err.message;
    });

  res.status(status).send({ response, data: user });
};

// Update User
const updateUser = async (req: Request, res: Response) => {
  const { user } = req.body;
  let status: number = 200;
  let response: string = `User with id: ${user._id} updated!`;
  let didUpdate: boolean = false;

  await updateUserDB(user)
    .then((data) => {
      didUpdate = data.modifiedCount === 1;
    })
    .catch((err) => {
      status = 400;
      response = err.message;
    });

  res.status(status).send({ response, didUpdate });
};

// Delete User
const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  let status: number = 200;
  let response: string = `Delete user with id ${id} successfully.`;
  let didDeleted: boolean = false;

  await deleteUserDB(id)
    .then((data) => {
      didDeleted = data.deletedCount === 1;
    })
    .catch((err) => {
      status = 400;
      response = err.message;
    });

  res.status(status).send({ response, didDeleted });
};

export { getAllUsers, addUser, getUser, updateUser, deleteUser };
