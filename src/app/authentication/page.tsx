
"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import LoginForm from "./components/login-form";
import SignUpForm from "./components/sign-up-form";

export default function AuthenticationPage() {

 
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="w-full">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="create-account">Criar Conta</TabsTrigger>
        </TabsList>
         <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="create-account">
          <SignUpForm />
        </TabsContent>
        
      </Tabs>
    </div>
  );
}

