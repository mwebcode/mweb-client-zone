import Image from "next/image";
import { Button } from "@/components/ui/button"
import DemoPage from "./my-service-accounts/page";
import ServiceAccounts from "./view-account/view-account-page";

export default function Home() {
  return (
    
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-white">
          {/* Render the DemoPage which contains the table */}
        <DemoPage />
        {/* <ServiceAccounts /> */}
        </main>
    
  );
}
