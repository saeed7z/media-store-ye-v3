import {
  users,
  orders,
  reviews,
  type User,
  type UpsertUser,
  type InsertOrder,
  type Order,
  type InsertReview,
  type Review,
} from "../shared/schema";
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByPhone(phoneNumber: string, countryCode: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Order operations
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: string): Promise<Order | undefined>;
  getUserOrders(userId: string): Promise<Order[]>;
  updateOrderStatus(id: string, status: string): Promise<void>;
  
  // Review operations
  createReview(review: InsertReview): Promise<Review>;
  getServiceReviews(serviceId: string): Promise<Review[]>;
  getRecentReviews(limit?: number): Promise<Review[]>;
  getOrderReview(orderId: string): Promise<Review | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async getUserByPhone(phoneNumber: string, countryCode: string): Promise<User | undefined> {
    const [user] = await db.select().from(users)
      .where(sql`${users.phoneNumber} = ${phoneNumber} AND ${users.countryCode} = ${countryCode}`);
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Order operations
  async createOrder(orderData: InsertOrder): Promise<Order> {
    const [order] = await db
      .insert(orders)
      .values(orderData)
      .returning();
    return order;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    return await db.select().from(orders)
      .where(eq(orders.userId, userId))
      .orderBy(desc(orders.createdAt));
  }

  async updateOrderStatus(id: string, status: string): Promise<void> {
    await db.update(orders)
      .set({ status, updatedAt: new Date() })
      .where(eq(orders.id, id));
  }

  // Review operations
  async createReview(reviewData: InsertReview): Promise<Review> {
    const [review] = await db
      .insert(reviews)
      .values(reviewData)
      .returning();
    return review;
  }

  async getServiceReviews(serviceId: string): Promise<Review[]> {
    return await db.select({
      id: reviews.id,
      userId: reviews.userId,
      orderId: reviews.orderId,
      serviceId: reviews.serviceId,
      rating: reviews.rating,
      comment: reviews.comment,
      isVerified: reviews.isVerified,
      isVisible: reviews.isVisible,
      createdAt: reviews.createdAt,
      updatedAt: reviews.updatedAt,
      userName: sql<string>`COALESCE(${users.firstName} || ' ' || ${users.lastName}, 'مستخدم مجهول')`,
      userImage: users.profileImageUrl,
    })
    .from(reviews)
    .leftJoin(users, eq(reviews.userId, users.id))
    .where(sql`${reviews.serviceId} = ${serviceId} AND ${reviews.isVisible} = true`)
    .orderBy(desc(reviews.createdAt));
  }

  async getRecentReviews(limit: number = 10): Promise<Review[]> {
    return await db.select({
      id: reviews.id,
      userId: reviews.userId,
      orderId: reviews.orderId,
      serviceId: reviews.serviceId,
      rating: reviews.rating,
      comment: reviews.comment,
      isVerified: reviews.isVerified,
      isVisible: reviews.isVisible,
      createdAt: reviews.createdAt,
      updatedAt: reviews.updatedAt,
      userName: sql<string>`COALESCE(${users.firstName} || ' ' || ${users.lastName}, 'مستخدم مجهول')`,
      userImage: users.profileImageUrl,
    })
    .from(reviews)
    .leftJoin(users, eq(reviews.userId, users.id))
    .where(eq(reviews.isVisible, true))
    .orderBy(desc(reviews.createdAt))
    .limit(limit);
  }

  async getOrderReview(orderId: string): Promise<Review | undefined> {
    const [review] = await db.select().from(reviews).where(eq(reviews.orderId, orderId));
    return review;
  }
}

export const storage = new DatabaseStorage();