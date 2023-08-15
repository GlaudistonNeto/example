import amqp from 'amqplib';

export async function publishMessage(message: string) {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const queueName = 'user_queue';

  await channel.assertQueue(queueName);
  await channel.sendToQueue(queueName, Buffer.from(message));

  await channel.close();
  await connection.close();
}
