import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { DataTable } from "@/components/ui/data-table";
import { PageActions, PageContainer, PageContents, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";
import { db } from "@/db";
import { patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import AddPatientButton from "./_components/add-patient-button";
// import PatientCard from "./_components/patient-card";
import { patientsTableColumns } from "./_components/table-columns";

const PatientsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    redirect('/authentication');
  }

  const patients = await db.query.patientsTable.findMany({
    where: eq(patientsTable.clinicId, session.user.clinic?.id),
  });

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Pacientes</PageTitle>
          <PageDescription>
            Gerencie os pacientes da sua clínica
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <AddPatientButton />
        </PageActions>
      </PageHeader>
      <PageContents>
      <DataTable data={patients} columns={patientsTableColumns} />
        {/* Aqui você pode renderizar cards de pacientes futuramente */}
        {/* <div className="grid grid-cols-3 gap-6">
        
          {patients.map(patient => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div> */}
      </PageContents>
    </PageContainer>
  );
};

export default PatientsPage; 