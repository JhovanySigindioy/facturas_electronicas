import { getRabbitChannel } from "./rabbitmq.config";
import { logger } from "../../shared/logger";

export class RabbitProducer {
  private queue: string;

  constructor(queue: string) {
    this.queue = queue;
  }

  async sendMessage(message: any) {
    const channel = getRabbitChannel();

    await channel.assertQueue(this.queue, { durable: true });

    const buffer = Buffer.from(JSON.stringify(message));

    channel.sendToQueue(this.queue, buffer, { persistent: true });

    logger.info(`📩 Mensaje enviado a la cola ${this.queue}`);
  }
}
