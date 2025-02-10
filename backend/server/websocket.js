import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";
import { createClient } from "redis";

const prisma = new PrismaClient();
const redis = createClient();

redis.connect();

export function setupWebSocket(server) {
  const io = new Server(server, {
    cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinConversation", (conversationId) => {
      socket.join(conversationId);
    });

    socket.on("sendMessage", async ({ senderId, conversationId, content }) => {
      const message = await prisma.message.create({
        data: { senderId, conversationId, content },
        include: { sender: true },
      });

      // Publish message to Redis (for multi-server setups)
      await redis.publish(`conversation:${conversationId}`, JSON.stringify(message));

      // Emit message to participants
      io.to(conversationId).emit("receiveMessage", message);
    });

    socket.on("typing", ({ conversationId, senderId }) => {
      socket.to(conversationId).emit("userTyping", senderId);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
}
