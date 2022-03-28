import { Branch } from "./branch";

export interface Mall {
  name: string;
  coordinates: Coordinates;
  imageUrl: string;
  branches?: Branch[];
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Coordinates {
  lat: number;
  long: number;
}
