import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || 3508,
  urlApi: process.env.URL_API || "",
  tipoFactura: process.env.TIPO_FACTURA || "FEDI",
  tipoNota: process.env.TIPO_NOTA || "NOC1",

  mongo: {
    host: process.env.MONGODB_HOST || "localhost",
    port: Number(process.env.MONGODB_PORT) || 27017,
    name: process.env.MONGODB_NAME || "institucional",
    user: process.env.MONGODB_USER || "",
    password: process.env.MONGODB_PASSWORD || "",
  },

  sql: {
    host: process.env.SQLSERVER_HOST || "localhost",
    port: Number(process.env.SQLSERVER_PORT) || 1433,
    user: process.env.SQLSERVER_USER || "sa",
    password: process.env.SQLSERVER_PASSWORD || "",
    db: process.env.SQLSERVER_DB || "eticos",
  },

  rabbit: {
    url: process.env.RABBITMQ_URL || "amqp://localhost:5672",
  },
};
