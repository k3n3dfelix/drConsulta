
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { PageActions, PageContainer, PageContents, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";
import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import AddDoctorButton from "./components/add-doctot-button";
import DoctorCard from "./components/doctor-card";


const DoctorsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  }
  );

  if(!session?.user){
    redirect('/authentication');
  }

  const doctors = await db.query.doctorsTable.findMany({
    where: eq(doctorsTable.clinicId, session.user.clinic?.id),
  })

  return (  
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Médicos</PageTitle>
          <PageDescription>
            Gerencie os médicos da sua clínica
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <AddDoctorButton />
        </PageActions>
      </PageHeader>
      <PageContents>
        <div className="grid grid-cols-3 gap-6"> {doctors.map(doctor => <DoctorCard key={doctor.id} doctor={doctor}></DoctorCard>)}</div>
       
      </PageContents>
    </PageContainer>
  )
};

export default DoctorsPage;