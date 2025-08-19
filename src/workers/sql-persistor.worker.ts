import { getRabbitChannel } from "../infrastructure/messaging/rabbitmq.config";
import { logger } from "../shared/logger";
import { SqlRepository } from "../infrastructure/db/sql/sql.repository";
import { InvoiceMongoModel } from "../infrastructure/db/mongo/mongo.model";

const QUEUE = "invoice_process_queue";
const sqlRepo = new SqlRepository();

export const startSqlPersistorWorker = async () => {
  const channel = getRabbitChannel();

  await channel.assertQueue(QUEUE, { durable: true });

  logger.info(`👷 Worker escuchando la cola: ${QUEUE}`);

  channel.consume(
    QUEUE,
    async (msg) => {
      if (msg) {
        try {
          const content = JSON.parse(msg.content.toString());
          logger.info("📥 Mensaje recibido en worker SQLPersistor", { content });

          // 1. Buscar el documento en Mongo
          const mongoDoc: any = await InvoiceMongoModel.findById(content.mongoId);

          if (!mongoDoc) {
            logger.error("❌ Documento no encontrado en Mongo", { id: content.mongoId });
            channel.ack(msg);
            return;
          }

          // 2. Guardar en SQL Server
          await sqlRepo.saveInvoice({
            mongoId: mongoDoc._id.toString(),
            clientId: mongoDoc.clientId,
            accountId: mongoDoc.accountId,
            payload: mongoDoc.invoice,
          });

          logger.info("✅ Factura persistida en SQL Server", { id: mongoDoc._id });

          // 3. Actualizar estado en Mongo
          mongoDoc.status = "PERSISTED";
          await mongoDoc.save();

          // 4. Confirmar mensaje procesado
          channel.ack(msg);
        } catch (err) {
          logger.error("❌ Error procesando mensaje en SQLPersistor", { error: (err as any).message });
          // No ACK → RabbitMQ reintentará
        }
      }
    },
    { noAck: false }
  );
};
