'"use client";'
import { headers } from "next/headers";
import { redirect } from "next/navigation";

//import { auth } from "@/lib/auth";
import { auth } from "@/lib/auth";

import SignOutButton from "./components/sign-out-button";

const DashboardPage = async () => {
  //com ServerComponent 
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  //Com ClientComponent
  // const session = authClient.useSession();
  
  if(!session?.user) {
    redirect("/authentication")
  }
  return ( 
    <>
      <p>Dashboard</p> 
       {/* com ServerComponent  */}
      {/* <h1>{session?.user.name}</h1>
      <h1>{session?.user.email}</h1> */}

        {/* Com ClientComponent  */}
      <h1>{session?.user.name}</h1>
      <h1>{session?.user.email}</h1>
      <SignOutButton />
      
    </>
);
}
 
export default DashboardPage;