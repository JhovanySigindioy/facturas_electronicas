import { InvoiceDTO } from "../../schemas/invoice.schema";
import { InvoiceMongoModel } from "./mongo.model";

export class MongoRepository {
    async saveInvoice(data: InvoiceDTO) {
        const doc = new InvoiceMongoModel({
            clientId: data.UploadRequest.ClientId,
            accountId: data.UploadRequest.AccountId,
            invoice: data.UploadRequest.Invoice,
            status: "PENDING",
        });

        return await doc.save();
    }
}
