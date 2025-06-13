import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ClinicForm from "./components/form";

const ClinicFormPage = () => {

  return (  
      <Dialog open>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Clinica</DialogTitle>
              <DialogDescription>
               Adicione uma clínica para continuar.
              </DialogDescription>
            </DialogHeader>
             <ClinicForm />
          </DialogContent>
    </Dialog>);
}
 
export default ClinicFormPage;