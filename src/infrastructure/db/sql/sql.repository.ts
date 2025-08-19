import { InvoiceSQL } from "./sql.model";

export class SqlRepository {
  async saveInvoice(data: {
    mongoId: string;
    clientId: string;
    accountId: string;
    payload: any;
  }) {
    const invoice = await InvoiceSQL.create({
      mongoId: data.mongoId,
      clientId: data.clientId,
      accountId: data.accountId,
      payload: data.payload,
      status: "PERSISTED",
    });

    return invoice;
  }
}
