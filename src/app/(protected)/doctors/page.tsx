import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageActions, PageContainer, PageContents, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";


const DoctorsPage = () => {
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
          <Button> 
            <Plus />
            Adicionar Médico
          </Button>
        </PageActions>
      </PageHeader>
      <PageContents>
        <p>Médicos</p>
      </PageContents>
    </PageContainer>
  )
};


  
 
export default DoctorsPage;