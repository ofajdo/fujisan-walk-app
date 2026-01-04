import Dexie, { Table } from "dexie";

export interface Locations {
  id: string;
  createdAt: Date;
}

export class LocationsLocalDB extends Dexie {
  items!: Table<Locations>;

  constructor() {
    super("locations");
    this.version(1).stores({
      items: "++id, createdAt",
    });
  }
}

export interface Courses {
  id: string;
  createdAt: Date;
}

export class CoursesLocalDB extends Dexie {
  items!: Table<Courses>;

  constructor() {
    super("courses");
    this.version(1).stores({
      items: "++id, createdAt",
    });
  }
}

export const locationsDB = new LocationsLocalDB();
export const coursesDB = new CoursesLocalDB();
