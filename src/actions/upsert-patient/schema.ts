import { z } from "zod";

export const upsertPatientSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2, "Nome obrigatório"),
  email: z.string().email("Email inválido"),
  phoneNumber: z.string().min(10, "Telefone obrigatório"),
  sex: z.enum(["male", "female"], { required_error: "Sexo obrigatório" }),
}); 