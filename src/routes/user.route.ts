import { Router } from "express";
import { addUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.controller";

const router = Router();

router.get("/", getAllUsers);

router.post("/", addUser);

router.get("/:id", getUser);

router.put("/", updateUser);

router.delete("/:id", deleteUser);

export default router;
