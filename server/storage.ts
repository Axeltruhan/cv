import { 
  users, 
  type User, 
  type InsertUser, 
  type PersonalInfo, 
  type Experience, 
  type Education, 
  type Skill
} from "@shared/schema";

export interface CV {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
}

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveCV(cv: CV): Promise<CV>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private cvs: Map<string, CV>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.cvs = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async saveCV(cv: CV): Promise<CV> {
    const id = `cv_${Date.now()}`;
    this.cvs.set(id, cv);
    return cv;
  }
}

export const storage = new MemStorage();
