import { Sequelize } from "sequelize";
import { env } from "../../../config/env";
import { logger } from "../../../shared/logger";

export const sequelize = new Sequelize(env.sql.db, env.sql.user, env.sql.password, {
    host: env.sql.host,
    port: env.sql.port,
    dialect: "mssql",
    logging: false,
    dialectOptions: {
        encrypt: false, // cambia a true si tu SQL requiere SSL
        trustServerCertificate: true,
        options: {
            encrypt: false, // cambia a true si tu SQL requiere SSL
            trustServerCertificate: true,
        },
    },
});

export const connectSql = async () => {
    try {
        await sequelize.authenticate();
        logger.info("✅ Conectado a SQL Server");
    } catch (error) {
        logger.error("❌ Error al conectar a SQL Server", { error: (error as any).message });
        process.exit(1);
    }
};
