export interface Mall {
  name: string;
  coordinates: Coordinates;
  imageUrl: string;
  branches?: any[];
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Coordinates {
  lat: number;
  long: number;
}
