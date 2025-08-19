import mongoose from "mongoose";
import { env } from "../../../config/";
import { logger } from "../../../shared";

const mongoUri = `mongodb://${env.mongo.host}:${env.mongo.port}/${env.mongo.name}`;

export const connectMongo = async () => {
    try {
        await mongoose.connect(mongoUri, {
            user: env.mongo.user || undefined,
            pass: env.mongo.password || undefined,
            authSource: env.mongo.user ? "admin" : undefined,
        });

        logger.info("✅ Conectado a MongoDB", { uri: mongoUri });
    } catch (err) {
        logger.error("❌ Error al conectar a MongoDB", { error: (err as any).message });
        process.exit(1);
    }
};
