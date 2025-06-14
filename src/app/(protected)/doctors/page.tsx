
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { PageActions, PageContainer, PageContents, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";
import { auth } from "@/lib/auth";

import AddDoctorButton from "./components/add-doctot-button";


const DoctorsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  }
  );

  if(!session?.user){
    redirect('/authentication');
  }
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
        <p>Médicos</p>
      </PageContents>
    </PageContainer>
  )
};


  
 
export default DoctorsPage;