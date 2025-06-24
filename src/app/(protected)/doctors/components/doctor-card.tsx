"use client";

import { get } from "http";
import { CalendarIcon, ClockIcon, DollarSignIcon } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { doctorsTable } from "@/db/schema";
import { formatCurrencyInCents } from "@/helpers/currency";

import { getAvailability } from "../helpers/availability";
import UpsertDoctorForm from "./upsert-doctor-form";

interface DoctorCardProps {
  doctor: typeof doctorsTable.$inferSelect
}
const DoctorCard = ({ doctor}: DoctorCardProps) => {
  const [isUpsertDoctorDialogOpen, setIsUpsertDoctorDialogOpen] = useState(false);

  const doctorInitiais = doctor.name
  .split(" ")
  .map((name) => name[0])
  .join("");

  const availability = getAvailability(doctor);
  
  return ( 
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{doctorInitiais}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-medium">{doctor.name}</h3>
            <p className="text-sm text-muted-foreground">{doctor.speciality}</p>
          </div>
        </div>
      </CardHeader>
      <Separator ></Separator>
      <CardContent className="flex flex-col gap-2">
        <Badge variant="outline" >
          <CalendarIcon className="mr-1" />
        {availability.from.format('dddd')} as {availability.to.format('dddd')}
        </Badge>
        <Badge variant="outline" >
          <ClockIcon className="mr-1" />
          {doctor.availableFromTime} - {doctor.availableToTime}
        </Badge>
        <Badge variant="outline" >
          <DollarSignIcon className="mr-1" />
            {formatCurrencyInCents(doctor.appointmentPriceInCents)} 
        </Badge>
         <Separator ></Separator>
        <CardFooter >
          <Dialog 
            open={isUpsertDoctorDialogOpen}
            onOpenChange={setIsUpsertDoctorDialogOpen}
          >
            <DialogTrigger asChild>
              <div>
              <Button className="w-full">Ver Detalhes</Button>
              <UpsertDoctorForm 
                doctor={{
                  ...doctor,
                  availableFromTime: availability.from.format("HH:mm:ss"),
                  availableToTime: availability.to.format("HH:mm:ss"),
                }}
                onSuccess={() => {
                  setIsUpsertDoctorDialogOpen(false);
                }}
              />
              </div>
            </DialogTrigger>
          </Dialog>
        </CardFooter>
      </CardContent>
    </Card> 
  );
}
 
export default DoctorCard;