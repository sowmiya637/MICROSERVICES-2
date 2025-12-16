import amqp from "amqplib";

async function start() {
  const conn = await amqp.connect("amqp://localhost");
  const ch = await conn.createChannel();
  await ch.assertQueue("email_queue");

  ch.consume("email_queue", msg => {
    const data = JSON.parse(msg.content.toString());
    console.log(" Email sent for order:", data);
    ch.ack(msg);
  });
}

start();
