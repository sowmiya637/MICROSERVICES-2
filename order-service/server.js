import express from "express";
import amqp from "amqplib";
import { sendEvent } from "../../event-bus/kafka.js";

const app = express();
app.use(express.json());

app.post("/orders", async (req, res) => {
  const order = req.body;

  // Send async message (RabbitMQ)
  const conn = await amqp.connect("amqp://localhost");
  const ch = await conn.createChannel();
  await ch.assertQueue("email_queue");
  ch.sendToQueue("email_queue", Buffer.from(JSON.stringify(order)));

  // Event sourcing (Kafka)
  sendEvent("order-created", order);

  res.json({ message: "Order placed", order });
});

app.listen(3002, () => {
  console.log(" Order Service running on 3002");
});
