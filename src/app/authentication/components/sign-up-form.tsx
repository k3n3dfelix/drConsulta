
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {Loader2} from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

  const registeSchema = z.object({
  name: z.string().trim().min(1, { message: "Nome é obrigatório"}).max(50),
  email: z.string().trim().min(1, {message: "Email é obrigatorio"}).email({ message: "Email inválido"}).min(1, { message: "Email é obrigatório"}).max(100),
  password: z.string().min(6, { message: "Senha deve ter pelo menos 8 caracteres"}).max(50),
})

const SignUpForm = () => {

  const router = useRouter();

  const form = useForm<z.infer<typeof registeSchema>>({
      resolver: zodResolver(registeSchema),
      defaultValues: {
        name: "",
        email: "",
        password: "",
      },
    })
  
    async function onSubmit(values: z.infer<typeof registeSchema>) {
      await authClient.signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
        callbackURL: "/dashboard"
      },{
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (ctx) => {
          if(ctx.error.code === 'USER_ALREADY_EXISTS') {
              console.error('error: ', ctx.error);
              toast.error("E-mail já cadastrado");
          }
          else {  
            console.error('error: ', ctx.error);
            toast.error("Erro ao criar conta, tente novamente mais tarde");
          }
        } 
      })
    }

  return ( 
          <Card>
            <CardHeader>
              <CardTitle>Criar Conta</CardTitle>
              <CardDescription>
               Entre com os dados para criar uma nova conta.
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <CardContent className="grid gap-6">
                    <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                  <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                      />
                      <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                  <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                      />
                      <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                  <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                      />
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" className="w-full"
                      disabled={form.formState.isSubmitting || !form.formState.isValid}>
                      
                      {form.formState.isSubmitting ? <Loader2 className="mr-2 b-4 w-4 animate-spin" /> : "Criar Conta"}
                     
                    </Button>
                    
                  </CardFooter>
                  </form>
            </Form>
          </Card> );
}
 
export default SignUpForm;