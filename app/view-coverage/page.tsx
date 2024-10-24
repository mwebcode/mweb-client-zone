 "use client"
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion';
import { Button } from '@/components/ui/button';


const FibreProductPage = () => {
  // State to manage collapsible sections
  const [isTermsOpen, setIsTermsOpen] = useState(true);
  const [isInstallOpen, setIsInstallOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);

  // Function to toggle section visibility
  const toggleSection = (section: string) => {
    if (section === 'terms') setIsTermsOpen(!isTermsOpen);
    if (section === 'install') setIsInstallOpen(!isInstallOpen);
    if (section === 'tracking') setIsTrackingOpen(!isTrackingOpen);
  };

  return (
    <Card className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-100 to-white">
    {/* Back to Fibre Products */}
    <a href="/fibre-products" className="text-gray-600 flex items-center mb-4">
      <i className="fas fa-arrow-left mr-2"></i> Back to Fibre Products
    </a>
  
    <div className="flex bg-gradient-to-b from-blue-100 to-white">
      {/* Product Details */}
      <div className="w-3/4">
        <Card className="p-4 bg-gradient-to-b from-blue-100 to-white">
          <h1 className="text-2xl font-bold">50/25Mbps Uncapped Fibre</h1>
          <p className="text-gray-700 mb-2">Download 50 Mbps | Upload 25 Mbps</p>
          <p className="text-gray-600 mb-4">
            Never run out of data with Uncapped Fibre. Enjoy fast and reliable access,
            connected all devices and save on monthly data bills. Sign up now and pay
            no upfront costs AND get a Free-to-use Fibre router.
          </p>
  
          <div className="flex space-x-4 mb-4">
                <div className="text-teal-600 flex items-center">
          <FontAwesomeIcon icon={faSquare} className="mr-2" />
           Free-to-use router
           </div>
            <div className="text-teal-600 flex items-center">
            <FontAwesomeIcon icon={faSquare} className="mr-2" />
              <i className="fas fa-check mr-2"></i> Free setup worth R2732
            </div>
            <div className="text-teal-600 flex items-center">
            <FontAwesomeIcon icon={faSquare} className="mr-2" />
              <i className="fas fa-check mr-2"></i> Installation time: 7 days
            </div>
          </div>


          <div className="space-y-4">
  {/* Card for Terms & Conditions */}
  <div className="bg-white shadow-md rounded-lg p-4">
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex items-center">
          <span className="mr-2 cursor-pointer">+</span>
          Terms & Conditions
        </AccordionTrigger>
        <AccordionContent>
          T&C's apply. Night time data period is 00:00 to 08:00 daily
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>

  {/* Card for Installation Addresses */}
  <div className="bg-white shadow-md rounded-lg p-4">
    <Accordion type="single" collapsible>
      <AccordionItem value="item-2">
        <AccordionTrigger className="flex items-center">
          <span className="mr-2 cursor-pointer">+</span>
          Installation addresses
        </AccordionTrigger>
        <AccordionContent>
          As you complete the check-out process, ensure your installation address (the address where you want to have Fibre installed) is fully and accurately completed and that all required fields are entered. This will ensure that the order process flows as smoothly as possible.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>

  {/* Card for How to Track Your Order Online */}
  <div className="bg-white shadow-md rounded-lg p-4">
    <Accordion type="single" collapsible>
      <AccordionItem value="item-3">
        <AccordionTrigger className="flex items-center">
          <span className="mr-2 cursor-pointer">+</span>
          How to track your order online
        </AccordionTrigger>
        <AccordionContent>
          Once you have placed your Fibre order and it has been confirmed by Mweb, you will be sent the login details to your online Mweb account and a link to track your order online. You can either use this link or log in to your online account to track the status of your order online. If you want to read more about the full process, visit the Mweb Help center/Fibre section.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>

  {/* Card for Length of Fibre Installation Process */}
  <div className="bg-white shadow-md rounded-lg p-4">
    <Accordion type="single" collapsible>
      <AccordionItem value="item-4">
        <AccordionTrigger className="flex items-center">
          <span className="mr-2 cursor-pointer">+</span>
          Length of Fibre installation process
        </AccordionTrigger>
        <AccordionContent>
          Average time for Fibre installation for orders placed is 10 days, depending on availability. Pre-orders take longer depending on when Fibre is rolled out in your neighbourhood.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>

  {/* Card for Fibre Activation */}
  <div className="bg-white shadow-md rounded-lg p-4">
    <Accordion type="single" collapsible>
      <AccordionItem value="item-5">
        <AccordionTrigger className="flex items-center">
          <span className="mr-2 cursor-pointer">+</span>
          Fibre Activation
        </AccordionTrigger>
        <AccordionContent>
          It takes 2 days after Fibre installation has been completed for your product to go active. You are only billed for product usage from when the product is active. Track your order online and look out for Emails and SMS’s that tell you when your product is active.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>

  {/* Card for Billing Explained */}
  <div className="bg-white shadow-md rounded-lg p-4">
    <Accordion type="single" collapsible>
      <AccordionItem value="item-6">
        <AccordionTrigger className="flex items-center">
          <span className="mr-2 cursor-pointer">+</span>
          Billing explained
        </AccordionTrigger>
        <AccordionContent>
          Payment will be collected within five days of a new product being activated. If the product is activated after the 26th of the month, the first payment will include the pro-rata amount for that month, as well as the full amount for the following month. After that, payment will be collected on the last working day of each month. If you have signed up for any hardware, such as a router or elected to pay the installation fee, these fees will be collected immediately.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>

  {/* Card for Pro-rata Billing */}
  <div className="bg-white shadow-md rounded-lg p-4">
    <Accordion type="single" collapsible>
      <AccordionItem value="item-7">
        <AccordionTrigger className="flex items-center">
          <span className="mr-2 cursor-pointer">+</span>
          Pro-rata billing
        </AccordionTrigger>
        <AccordionContent>
          If you sign up for a new Fibre product halfway through a month, you’ll only be billed for the days in that month that your new product is active.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>

  {/* Card for Mweb Statements and Invoices */}
  <div className="bg-white shadow-md rounded-lg p-4">
    <Accordion type="single" collapsible>
      <AccordionItem value="item-8">
        <AccordionTrigger className="flex items-center">
          <span className="mr-2 cursor-pointer">+</span>
          Mweb Statements and invoices
        </AccordionTrigger>
        <AccordionContent>
          Your statement shows you all of the payment-related interactions on your account for the past six months. You can access this via your online Mweb Account.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</div>

        </Card>
      </div>
  
      {/* Cart Summary */}
      <div className="w-1/4 ml-4">
        <Card className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-bold">Your Cart:</h2>
          <p className="text-gray-600 mb-4">What you pay:</p>
          <p className="text-2xl font-bold mb-4">R619PM</p>
          Terms and Condition 
          <Button className="border border-gray-400 py-2 px-4 rounded-lg w-full">
            CHECKOUT
          </Button>
          <p className="">
            Apply Promo Voucher Code
          </p>
        </Card>
      </div>
    </div>
  </Card>
   );
};
export default FibreProductPage;
