import { Router } from "express";
import { createInvoiceController } from "./invoice.controller";

const router = Router();

// Ruta principal para facturas
router.post("/invoice", createInvoiceController);

export default router;
