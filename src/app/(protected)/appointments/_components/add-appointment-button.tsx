"use client";
import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { doctorsTable,patientsTable } from "@/db/schema";

import UpsertAppointmentForm from "./upsert-appointment-form";

interface AddAppointmentButtonProps {
  patients: typeof patientsTable.$inferSelect[];
  doctors: typeof doctorsTable.$inferSelect[];
}

const AddAppointmentButton = ({ patients, doctors }: AddAppointmentButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Novo Agendamento
        </Button>
      </DialogTrigger>
      <UpsertAppointmentForm
        isOpen={isOpen}
        onSuccess={() => setIsOpen(false)}
        patients={patients}
        doctors={doctors}
      />
    </Dialog>
  );
};

export default AddAppointmentButton; 