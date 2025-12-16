import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "microservice-app",
  brokers: ["localhost:9092"]
});

const producer = kafka.producer();

export async function sendEvent(type, data) {
  await producer.connect();
  await producer.send({
    topic: "events",
    messages: [{ value: JSON.stringify({ type, data }) }]
  });
}
