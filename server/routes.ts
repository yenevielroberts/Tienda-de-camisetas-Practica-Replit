import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Health endpoint that returns sports t-shirts
  app.get("/health", async (req, res) => {
    const sportsTshirts = [
      {
        id: 1,
        name: "Performance Dry-Fit",
        category: "sports",
        price: 39.99,
        color: "Black",
        material: "100% Polyester Mesh",
        features: ["Moisture-wicking", "Breathable", "Lightweight"],
        inStock: true,
      },
      {
        id: 2,
        name: "Runner's Elite",
        category: "sports",
        price: 44.99,
        color: "Navy Blue",
        material: "85% Polyester, 15% Spandex",
        features: ["Stretch fabric", "Reflective strips", "Odor-resistant"],
        inStock: true,
      },
      {
        id: 3,
        name: "Gym Beast",
        category: "sports",
        price: 34.99,
        color: "Gray",
        material: "90% Cotton, 10% Polyester",
        features: ["Comfortable fit", "Durable", "Machine washable"],
        inStock: true,
      },
      {
        id: 4,
        name: "Athlete's Choice",
        category: "sports",
        price: 49.99,
        color: "White",
        material: "100% Polyester",
        features: ["Quick-dry", "UV protection", "Anti-microbial"],
        inStock: true,
      },
      {
        id: 5,
        name: "Yoga Flow",
        category: "sports",
        price: 42.99,
        color: "Purple",
        material: "92% Nylon, 8% Spandex",
        features: ["Four-way stretch", "Moisture-wicking", "Eco-friendly"],
        inStock: true,
      },
      {
        id: 6,
        name: "Training Max",
        category: "sports",
        price: 37.99,
        color: "Red",
        material: "87% Polyester, 13% Spandex",
        features: ["Flat-lock seams", "Ventilation panels", "Lightweight"],
        inStock: true,
      },
    ];

    res.json({
      status: "healthy",
      message: "Sports t-shirts collection",
      timestamp: new Date().toISOString(),
      data: sportsTshirts,
      count: sportsTshirts.length,
    });
  });

  app.get(api.messages.list.path, async (req, res) => {
    const messages = await storage.getMessages();
    res.json(messages);
  });

  app.post(api.messages.create.path, async (req, res) => {
    try {
      const input = api.messages.create.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  await seedDatabase();

  return httpServer;
}

// Seed function to be called if needed, or just let the app start empty
export async function seedDatabase() {
  const existingMessages = await storage.getMessages();
  if (existingMessages.length === 0) {
    await storage.createMessage({ content: "Welcome to your new project!" });
    await storage.createMessage({ content: "This is a full-stack starter." });
  }
}
