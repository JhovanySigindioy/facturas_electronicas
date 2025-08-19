import { Request, Response } from "express";
import { InvoiceSchema } from "../schemas/invoice.schema";
import { MongoRepository } from "../db/mongo/mongo.repository";
import { RabbitProducer } from "../messaging/rabbitmq.producer";

const mongoRepo = new MongoRepository();
const producer = new RabbitProducer("invoice_process_queue");

export const createInvoiceController = async (req: Request, res: Response) => {
  try {
    // Validar payload
    const parsed = InvoiceSchema.parse(req.body);

    // Guardar en MongoDB
    const saved = await mongoRepo.saveInvoice(parsed);

    // Enviar mensaje a RabbitMQ
    await producer.sendMessage({
      mongoId: saved._id,
      clientId: parsed.UploadRequest.ClientId,
      accountId: parsed.UploadRequest.AccountId,
    });

    return res.status(200).json({
      message: "Factura guardada en MongoDB y enviada a RabbitMQ",
      mongoId: saved._id,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: "Error en procesamiento",
        error: error.message,
      });
    }
  }
};
