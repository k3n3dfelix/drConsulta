"use client";
import { Menu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const examplePages = [
  { label: "Exemplos de Componentes", href: "/component-examples" },
];

export default function ShadcnMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="fixed top-4 left-4 z-50"><Menu className="mr-2" />Menu</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu de Exemplos</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-2">
          {examplePages.map((item) => (
            <Button asChild variant="ghost" key={item.href} className="justify-start">
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
} 