import app from "./app";
import { env } from "./config";
import { connectMongo } from "./infrastructure/db/mongo/mongo.config";
import { connectRabbitMQ } from "./infrastructure/messaging/rabbitmq.config";
import { startSqlPersistorWorker } from "./workers/sql-persistor.worker";
import { connectSql } from "./infrastructure/db/sql/sql.config";

const startServer = async () => {
  await connectMongo();
  await connectSql();
  await connectRabbitMQ();

  // Levantar worker
  await startSqlPersistorWorker();

  app.listen(env.port, () => {
    console.log(`🚀 Server running on http://localhost:${env.port}`);
  });
};

startServer();
