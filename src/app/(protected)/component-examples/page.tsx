"use client";
import { useState } from "react";

import { AlertDialog, AlertDialogAction, AlertDialogCancel,AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter,CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter,DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem,SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle,SheetTrigger } from "@/components/ui/sheet";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton,SidebarMenuItem } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent,TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ComponentExamplesPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Exemplos de Componentes Shadcn/UI</h1>
      <section>
        <h2 className="font-semibold mb-2">Button</h2>
        <Button>Botão padrão</Button>
        <Button variant="outline" className="ml-2">Outline</Button>
        <Button variant="destructive" className="ml-2">Destrutivo</Button>
      </section>
      <section>
        <h2 className="font-semibold mb-2">Badge</h2>
        <Badge>Badge padrão</Badge>
      </section>
      <section>
        <h2 className="font-semibold mb-2">Card</h2>
        <Card className="max-w-xs">
          <CardHeader>
            <CardTitle>Título do Card</CardTitle>
            <CardDescription>Descrição do Card</CardDescription>
          </CardHeader>
          <CardContent>Conteúdo do Card</CardContent>
          <CardFooter>Rodapé do Card</CardFooter>
        </Card>
      </section>
      <section>
        <h2 className="font-semibold mb-2">Dialog</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>Abrir Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Exemplo de Dialog</DialogTitle>
              <DialogDescription>Conteúdo do dialog.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setDialogOpen(false)}>Fechar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
      <section>
        <h2 className="font-semibold mb-2">AlertDialog</h2>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Abrir AlertDialog</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
              <AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogAction>Confirmar</AlertDialogAction>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialog>
      </section>
      <section>
        <h2 className="font-semibold mb-2">Select</h2>
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Selecione uma opção" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Opção 1</SelectItem>
            <SelectItem value="2">Opção 2</SelectItem>
          </SelectContent>
        </Select>
      </section>
      <section>
        <h2 className="font-semibold mb-2">Form</h2>
        {/* <Form>
          <form className="space-y-2 max-w-xs">
            <FormField name="nome" render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Digite seu nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </form>
        </Form> */}
      </section>
      <section>
        <h2 className="font-semibold mb-2">Sheet</h2>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button>Abrir Sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Exemplo de Sheet</SheetTitle>
            </SheetHeader>
            <div>Conteúdo do Sheet</div>
          </SheetContent>
        </Sheet>
      </section>
      <section>
        <h2 className="font-semibold mb-2">Sidebar</h2>
        <Sidebar>
          <SidebarHeader>Header</SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>Item 1</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </section>
      <section>
        <h2 className="font-semibold mb-2">Skeleton</h2>
        <Skeleton className="w-32 h-6" />
      </section>
      <section>
        <h2 className="font-semibold mb-2">Tabs</h2>
        <Tabs defaultValue="tab1" className="w-64">
          <TabsList>
            <TabsTrigger value="tab1">Aba 1</TabsTrigger>
            <TabsTrigger value="tab2">Aba 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Conteúdo da Aba 1</TabsContent>
          <TabsContent value="tab2">Conteúdo da Aba 2</TabsContent>
        </Tabs>
      </section>
      <Toaster />
    </div>
  );
} 