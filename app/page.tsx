import Image from "next/image";
import { Button } from "@/components/ui/button"
import ServiceAccountPage from "./my-service-accounts/page";
import ServiceAccounts from "./view-account/view-account-page";



export default function Home() {
  return (
    
      <>
          {/* Render the DemoPage which contains the table */}
        <ServiceAccountPage />
        {/* {DemoPage} */}
        </>
    
  );
}
