import mongoose, { Schema, Document } from "mongoose";

export interface InvoiceMongo extends Document {
  clientId: string;
  accountId: string;
  invoice: any; // Mantendremos el payload completo
  status: string;
  createdAt: Date;
}

const InvoiceSchema = new Schema<InvoiceMongo>({
  clientId: { type: String, required: true },
  accountId: { type: String, required: true },
  invoice: { type: Object, required: true },
  status: { type: String, default: "PENDING" }, // Estados: PENDING, PERSISTED, FAILED
  createdAt: { type: Date, default: Date.now },
});

export const InvoiceMongoModel = mongoose.model<InvoiceMongo>(
  "Invoice",
  InvoiceSchema
);
