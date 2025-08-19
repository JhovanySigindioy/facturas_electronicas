import { z } from "zod";

// Sub-schema ENC
const ENC_Schema = z.object({
  ENC_1: z.string(),
  ENC_2: z.number(),
  ENC_3: z.number(),
  ENC_4: z.string(),
  ENC_5: z.string(),
  ENC_6: z.string(),
  ENC_7: z.string(), // fecha
  ENC_8: z.string(), // hora
  ENC_9: z.number(),
  ENC_10: z.string(), // moneda
  ENC_15: z.number(),
  ENC_16: z.string(), // fecha vencimiento
  ENC_17: z.string().optional(),
  ENC_20: z.number(),
  ENC_21: z.string(),
});

// Sub-schema EMI (solo algunos campos, puedes expandirlo)
const EMI_Schema = z.object({
  EMI_1: z.number(),
  EMI_2: z.number(),
  EMI_3: z.number(),
  EMI_4: z.number(),
  EMI_6: z.string(),
  EMI_7: z.string(),
  EMI_10: z.string(),
  EMI_11: z.number(),
  EMI_13: z.string(),
  EMI_14: z.number(),
  EMI_15: z.string(),
  EMI_19: z.string(),
  EMI_21: z.string(),
});

// ANT (array)
const ANT_Schema = z.array(
  z.object({
    ANT_1: z.number(),
    ANT_2: z.string(),
    ANT_5: z.string(),
    ANT_6: z.string(),
  })
);

// ITE (array)
const ITE_Schema = z.array(
  z.object({
    ITE_1: z.number(),
    ITE_3: z.number(),
    ITE_4: z.string(),
    ITE_5: z.number(),
    ITE_6: z.string(),
    ITE_7: z.number(),
    ITE_8: z.string(),
    ITE_9: z.string(),
    ITE_11: z.string(),
    ITE_12: z.string().optional(),
    ITE_18: z.string(),
    ITE_19: z.number(),
    ITE_20: z.string(),
    ITE_21: z.number(),
    ITE_22: z.string(),
    ITE_27: z.number(),
    ITE_28: z.string(),
  })
);

// Schema principal
export const InvoiceSchema = z.object({
  UploadRequest: z.object({
    ClientId: z.string(),
    AccountId: z.string(),
    Invoice: z.object({
      ENC: ENC_Schema,
      EMI: EMI_Schema,
      ANT: ANT_Schema.optional(),
      ITE: ITE_Schema.optional(),
      // Aquí luego podemos añadir ADQ, TOT, etc.
    }),
  }),
});

export type InvoiceDTO = z.infer<typeof InvoiceSchema>;
