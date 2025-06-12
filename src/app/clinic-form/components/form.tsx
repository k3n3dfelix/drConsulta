"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { createClinicAction } from "@/actions/create-clinic";
import { Button } from "@/components/ui/button"
import {
  DialogFooter,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

  const newClinicSchema = z.object({
  name: z.string().trim().min(1, {message: "Nome é obrigatorio"}).min(1, { message: "Nome é obrigatório"}).max(100),
})

const ClinicForm = () => {
  
   const form = useForm<z.infer<typeof newClinicSchema>>({
        resolver: zodResolver(newClinicSchema),
        defaultValues: {
          name: "",
        },
      })

      const onSubmit = async (data: z.infer<typeof newClinicSchema>) => {
       try{
        await createClinicAction(data.name);
       }catch (error) {
        if(isRedirectError(error)){
          return;
        }
         console.error('error: ', error);
         toast.error("Erro ao criar clínica. Tente novamente.");
       }
      }
  return (
    <>
      <Form {...form}  >
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
            
                  <FormItem>
                    <FormLabel>Nome da Clínica</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
          />
          <DialogFooter>
             <Button 
                type="submit" className="w-full"
                disabled={form.formState.isSubmitting || !form.formState.isValid}>
                {form.formState.isSubmitting ? <Loader2 className="mr-2 b-4 w-4 animate-spin" /> : "Criar Clínica"}
              </Button>
          </DialogFooter>
        </form>
      </Form>
      </>
  );
}
 
export default ClinicForm;