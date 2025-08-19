import amqplib from "amqplib";
import { env } from "../../config/env";
import { logger } from "../../shared";

// ¡IMPORTANTE!: Cambia el tipo de Connection a ChannelModel
let connection: amqplib.ChannelModel;
let channel: amqplib.Channel;

export const connectRabbitMQ = async () => {
    try {
        // La conexión se asigna a la variable 'connection'
        connection = await amqplib.connect(env.rabbit.url);
        
        // Ahora, usa la variable 'connection' (que es un ChannelModel) para crear el canal
        channel = await connection.createChannel();

        logger.info("✅ Conectado a RabbitMQ", { url: env.rabbit.url });

        return channel;
    } catch (err) {
        logger.error("❌ Error al conectar a RabbitMQ", { error: (err as any).message });
        process.exit(1);
    }
};

export const getRabbitChannel = () => {
    if (!channel) throw new Error("RabbitMQ channel no inicializado");
    return channel;
};