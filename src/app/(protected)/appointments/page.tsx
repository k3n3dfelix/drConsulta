import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { PageActions, PageContainer, PageContents,PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";
import { db } from "@/db";
import { doctorsTable,patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import AddAppointmentButton from "./_components/add-appointment-button";

const AppointmentsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  const doctors = await db.query.doctorsTable.findMany({
    where: eq(doctorsTable.clinicId, session.user.clinic?.id),
  })

  const patients = await db.query.patientsTable.findMany({
    where: eq(patientsTable.clinicId, session.user.clinic?.id),
  });
  // const [patients, doctors] = await Promise.all([
  //   db.query.patientsTable.findMany({
  //     where: (patientsTable.clinicId).eq(session.user.clinic?.id),
  //   }),
  //   db.query.doctorsTable.findMany({
  //     where: (doctorsTable.clinicId).eq(session.user.clinic?.id),
  //   }),
  // ]);

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Agendamentos</PageTitle>
          <PageDescription>Gerencie os agendamentos da sua clínica</PageDescription>
        </PageHeaderContent>
        <PageActions>
          <AddAppointmentButton patients={patients} doctors={doctors} />
        </PageActions>
      </PageHeader>
      <PageContents>
        Listagem de agendamentos futuramente
      </PageContents>
    </PageContainer>
  );
};

export default AppointmentsPage; 