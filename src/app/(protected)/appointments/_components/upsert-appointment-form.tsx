"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent,PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { doctorsTable,patientsTable } from "@/db/schema";

const formSchema = z.object({
  patientId: z.string().min(1, "Selecione um paciente"),
  doctorId: z.string().min(1, "Selecione um médico"),
  appointmentPrice: z.number().min(1, "Valor obrigatório"),
  date: z.date({ required_error: "Selecione uma data" }),
  time: z.string().optional(),
});

interface UpsertAppointmentFormProps {
  patients: typeof patientsTable.$inferSelect[];
  doctors: typeof doctorsTable.$inferSelect[];
}

const UpsertAppointmentForm = ({ patients, doctors }: UpsertAppointmentFormProps) => {
  const [selectedDoctor, setSelectedDoctor] = useState<typeof doctorsTable.$inferSelect | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<typeof patientsTable.$inferSelect | null>(null);
  const [date, setDate] = useState<Date | undefined>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientId: "",
      doctorId: "",
      appointmentPrice: 0,
      date: undefined,
      time: "",
    },
  });

  // Atualiza o valor do médico ao selecionar
  const handleDoctorChange = (doctorId: string) => {
    const doctor = doctors.find((d) => d.id === doctorId);
    setSelectedDoctor(doctor ? doctor : null);
    form.setValue("doctorId", doctorId);
    if (doctor) {
      form.setValue("appointmentPrice", doctor.appointmentPriceInCents / 100);
    } else {
      form.setValue("appointmentPrice", 0);
    }
  };

  const handlePatientChange = (patientId: string) => {
    const patient = patients.find((p) => p.id === patientId);
    setSelectedPatient(patient ? patient : null);
    form.setValue("patientId", patientId);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Novo Agendamento</DialogTitle>
        <DialogDescription>Preencha os dados para criar um novo agendamento.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="patientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paciente</FormLabel>
                <Select
                  onValueChange={handlePatientChange}
                  value={field.value}
                  disabled={patients.length === 0}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o paciente" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="doctorId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Médico</FormLabel>
                <Select
                  onValueChange={handleDoctorChange}
                  value={field.value}
                  disabled={doctors.length === 0}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o médico" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id}>
                        {doctor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="appointmentPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor da Consulta</FormLabel>
                <FormControl>
                  <NumericFormat
                    value={field.value}
                    customInput={Input}
                    thousandSeparator="."
                    decimalSeparator="," 
                    allowNegative={false}
                    allowLeadingZeros={false}
                    prefix="R$ "
                    decimalScale={2}
                    fixedDecimalScale
                    onValueChange={(value) => {
                      field.onChange(value.floatValue || 0);
                    }}
                    placeholder="R$ 0,00"
                    disabled={!selectedDoctor}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      data-empty={!date}
                      className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
                      disabled={!selectedDoctor || !selectedPatient}
                    >
                      <CalendarIcon />
                      {date ? format(date, "PPP") : <span>Escolha uma data</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(d) => {
                        setDate(d);
                        form.setValue("date", d!);
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time"
            render={() => (
              <FormItem>
                <FormLabel>Horário</FormLabel>
                <Select disabled={!selectedDoctor || !selectedPatient}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o horário" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* Horários disponíveis serão implementados futuramente */}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit" className="w-full" disabled>
              Salvar (em breve)
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsertAppointmentForm; 