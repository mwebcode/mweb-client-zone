 "use client"
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-solid-svg-icons';


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
    <Card className="container mx-auto p-6">
    {/* Back to Fibre Products */}
    <a href="/fibre-products" className="text-gray-600 flex items-center mb-4">
      <i className="fas fa-arrow-left mr-2"></i> Back to Fibre Products
    </a>
  
    <div className="flex">
      {/* Product Details */}
      <div className="w-3/4">
        <Card className="p-4">
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
  
          {/* Collapsible Sections */}
          <div className="border-t border-gray-300">
            <button
              className="flex justify-between w-full py-4 focus:outline-none"
              onClick={() => toggleSection('terms')}
            >
              <span>Terms & Conditions</span>
              <i className={`fas fa-${isTermsOpen ? 'minus' : 'plus'}`}></i>
            </button>
            {isTermsOpen && (
              <div id="terms" className="mb-4">
                <p>T&C's apply. Night time data period is 00:00 to 08:00 daily</p>
              </div>
            )}
          </div>
  
          <div className="border-t border-gray-300">
            <button
              className="flex justify-between w-full py-4 focus:outline-none"
              onClick={() => toggleSection('install')}
            >
              <span>Installation addresses</span>
              <i className={`fas fa-${isInstallOpen ? 'minus' : 'plus'}`}></i>
            </button>
            {isInstallOpen && (
              <div id="install" className="mb-4">
                {/* Installation details can go here */}
              </div>
            )}
          </div>
  
          <div className="border-t border-gray-300">
            <button
              className="flex justify-between w-full py-4 focus:outline-none"
              onClick={() => toggleSection('tracking')}
            >
              <span>How to track your order online</span>
              <i className={`fas fa-${isTrackingOpen ? 'minus' : 'plus'}`}></i>
            </button>
            {isTrackingOpen && (
              <div id="tracking" className="mb-4">
                {/* Tracking details can go here */}
              </div>
            )}
          </div>
          <div className="border-t border-gray-300">
            <button
              className="flex justify-between w-full py-4 focus:outline-none"
              onClick={() => toggleSection('tracking')}
            >
              <span>Length of Fibre installation process</span>
              <i className={`fas fa-${isTrackingOpen ? 'minus' : 'plus'}`}></i>
            </button>
            {isTrackingOpen && (
              <div id="tracking" className="mb-4">
                Average time for Fibre installation for orders placed is 10 days, depending
                 on availability. Pre – orders take longer depending on when Fibre is rolled
                  out in your neighbourhood.
              </div>
            )}
          </div>
          <div className="border-t border-gray-300">
            <button
              className="flex justify-between w-full py-4 focus:outline-none"
              onClick={() => toggleSection('tracking')}
            >
              <span>Fibre Activation</span>
              <i className={`fas fa-${isTrackingOpen ? 'minus' : 'plus'}`}></i>
            </button>
            {isTrackingOpen && (
              <div id="tracking" className="mb-4">
               It takes 2 days after Fibre installation has been completed for your product to go active.
                You are only billed for product usage from when the product is active.
                 Track your order online and look out for Emails and SMS’s that tell you when your product is active.
              </div>
            )}
          </div>
          <div className="border-t border-gray-300">
            <button
              className="flex justify-between w-full py-4 focus:outline-none"
              onClick={() => toggleSection('tracking')}
            >
              <span>Billing explained</span>
              <i className={`fas fa-${isTrackingOpen ? 'minus' : 'plus'}`}></i>
            </button>
            {isTrackingOpen && (
              <div id="tracking" className="mb-4">
               Payment will be collected within five days of a new product being activated.
                If the product is activated after the 26th of the month, the first payment will include the pro-rata amount for that month, as well as the full amount for the following month.
                 After that, payment will be collected on the last working day of each month.
                  If you have signed up for any hardware, such as a router or elected to pay the installation fee, these fees will be collected immediately.
              </div>
            )}
          </div>
          <div className="border-t border-gray-300">
            <button
              className="flex justify-between w-full py-4 focus:outline-none"
              onClick={() => toggleSection('tracking')}
            >
              <span>Pro-rata billing</span>
              <i className={`fas fa-${isTrackingOpen ? 'minus' : 'plus'}`}></i>
            </button>
            {isTrackingOpen && (
              <div id="tracking" className="mb-4">
                If you sign-up for a new Fibre product halfway through a month,
                 you’ll only be billed for the days in that month that your new product is active.
              </div>
            )}
          </div>
          <div className="border-t border-gray-300">
            <button
              className="flex justify-between w-full py-4 focus:outline-none"
              onClick={() => toggleSection('tracking')}
            >
              <span>Mweb Statements and invoices</span>
              <i className={`fas fa-${isTrackingOpen ? 'minus' : 'plus'}`}></i>
            </button>
            {isTrackingOpen && (
              <div id="tracking" className="mb-4">
                Your statement shows you all of the payment-related interactions on your account for the past six months.
                 You can access this via your online Mweb Account.
              </div>
            )}
          </div>
        </Card>
      </div>
  
      {/* Cart Summary */}
      <div className="w-1/4 ml-4">
        <Card className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-bold">Your Cart:</h2>
          <p className="text-gray-600 mb-4">What you pay:</p>
          <p className="text-2xl font-bold mb-4">R619PM</p>
  
          <button className="bg-red-500 text-white py-2 px-4 rounded-lg w-full mb-4">
            CHECKOUT
          </button>
          <button className="border border-gray-400 py-2 px-4 rounded-lg w-full">
            Apply Promo Voucher Code
          </button>
        </Card>
      </div>
    </div>
  </Card>
  
  );
};

export default FibreProductPage;
