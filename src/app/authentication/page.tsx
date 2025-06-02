
"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

  const registeSchema = z.object({
  name: z.string().trim().min(1, { message: "Nome é obrigatório"}).max(50),
  email: z.string().trim().min(1, {message: "Email é obrigatorio"}).email({ message: "Email inválido"}).min(1, { message: "Email é obrigatório"}).max(100),
  password: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres"}).max(50),
})

export default function AuthenticationPage() {

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
    <div className="flex h-screen w-screen items-center justify-center">
      <Tabs defaultValue="login">
        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="create-account">Criar Conta</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Criar Conta</CardTitle>
              <CardDescription>
               Crie uma conta para continuar.
              </CardDescription>
            </CardHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
            <CardContent className="grid gap-6">
               
            </CardContent>
            <CardFooter>
              <Button>Continuar</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="create-account">
          <Card>
            <CardHeader>
              <CardTitle>Criar Conta</CardTitle>
              <CardDescription>
               Entre com os dados para criar uma nova conta.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Current create-account</Label>
                <Input id="tabs-demo-current" type="create-account" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New create-account</Label>
                <Input id="tabs-demo-new" type="create-account" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

