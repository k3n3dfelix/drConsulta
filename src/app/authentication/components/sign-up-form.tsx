
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

  const registeSchema = z.object({
  name: z.string().trim().min(1, { message: "Nome é obrigatório"}).max(50),
  email: z.string().trim().min(1, {message: "Email é obrigatorio"}).email({ message: "Email inválido"}).min(1, { message: "Email é obrigatório"}).max(100),
  password: z.string().min(6, { message: "Senha deve ter pelo menos 8 caracteres"}).max(50),
})

const SignUpForm = () => {

  const form = useForm<z.infer<typeof registeSchema>>({
      resolver: zodResolver(registeSchema),
      defaultValues: {
        name: "",
        email: "",
        password: "",
      },
    })
  
    function onSubmit(values: z.infer<typeof registeSchema>) {
     
      console.log(values)
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
                  <Button type="submit" className="w-full">Criar Conta</Button>
                    
                  </CardFooter>
                  </form>
            </Form>
          </Card> );
}
 
export default SignUpForm;