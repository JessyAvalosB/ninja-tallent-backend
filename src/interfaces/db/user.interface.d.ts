import { ObjectId } from "mongodb";

export interface User {
  _id: ObjectId;
  firstname: string;
  lastname: string;
  email: string;
  birthDate: Date;
  address?: Address[] | null;
}

export interface Address {
  street: string;
  city: string;
  country: string;
  postalcode: string;
}
