'use client';

import React, { useEffect, useState } from 'react';
// import './view-account.css';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InfoIcon } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faScrewdriverWrench,faChartColumn,faCog,faEnvelope, faWifi, faShield,faList, faTrash} from '@fortawesome/free-solid-svg-icons';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Bar } from "react-chartjs-2";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
} from "chart.js";
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

ChartJS.register(BarElement, CategoryScale, LinearScale, Legend);




export interface Contract {
  id: number;
  contractNumber: string;
  displayName: string;
  contractType: string;
  promoCode: string;
  productCode: string;
  productCategory: string;
  productSubcategory: string;
  isUncappedProduct: boolean;
  displayGroup: string;
  activeRate: number;
  totalDiscount: number;
  spend: number;
  isBundleMaster: boolean;
  isBundleChild: boolean;
  isStandalone: boolean;
  status: string;
  billingPeriod: string;
  renewalPeriod: string;
  salesChannel: string;
  startDate: string;
  endDate: string | null;
  billedToDate: string;
  renewalDate: string | null;
  minimumContractPeriodMonths: number;
  canChangeProduct: boolean;
  appliedVoucher: string | null;
  services: Service[];
  servicesInfo: ServiceInfo[];
  links: any[];
  cantChangeProductReasons: any[];
}

export interface ServiceInfo {
  id: number;
  serviceTypeId: number;
  name: string;
  status: string;
  crm1: string;
  crm2: string | null;
  provider: string;
  hasInstallationAddress: boolean;
  installationAddress: string | null;
  hasUsageData: boolean;
  hasServiceSettings: boolean;
  hasServiceActions: boolean;
  links: any[];
}

export interface ServiceAccount {
  username: string;
  serviceAccountId: number;
  serviceAccountPrimaryContactId: number;
  serviceAccountPrimaryContactDisplayName: string;
  customerFriendlyName: string;
  status: string;
  accessLevel: string;
  hasPendingOrder: boolean;
  contracts: Contract[];
  services: Service[];
  links: any[];
  serviceInstanceValues: any[];
}

interface InstallationAddress {
  type: string;
  unitDesc: string | null;
  streetNumber: string;
  streetName: string;
  unitNumber: string;
  buildingName: string;
  buildingFloor: string;
  complexName: string;
  estateName: string;
  estateUnitStreetNumber: string;
  estateUnitStreetName: string;
  companyName: string;
  suburb: string;
  city: string;
  province: string;
  postalCode: string;
  instruction: string | null;
  buildingType: string;
  coordinates: {
    lon: number;
    lat: number;
    status: string;
  };
  line1: string | null;
  line2: string | null;
  legacyAddress: boolean;
}

interface ServiceLink {
  type: string;
  title: string;
  displayTitle: string | null;
  rel: string | null;
  group: string;
  method: string;
}

interface Service {
  id: number;
  serviceTypeId: number;
  name: string;
  status: string;
  crm1: string | null;
  crm2: string | null;
  provider: string;
  hasInstallationAddress: boolean;
  installationAddress: InstallationAddress | null;
  hasUsageData: boolean;
  hasServiceSettings: boolean;
  hasServiceActions: boolean;
  links: ServiceLink[];
}

interface ServiceSettings {
  dialogTitle: string;
  username: string;
  serviceTypeId: number;
  settings: any; 
}
interface InfoItem {
  id: number;
  name: string;
  description: string;
  value: string;
  insertValue: string;
}

interface ServiceData {
  serviceTypeId: number;
  username: string;
  serviceIdentifier: string;
  info: InfoItem[];
}

interface ProviderInfo {
  id: number;
  name: string;
  description: string;
  value: string;
}

interface Group {
  displayGroup: string;
  displayOrder: number;
  settings: Setting[];
}

interface Setting {
  serviceTypeParameterId: number;
  name: string;
  description: string;
  value: string | number;
  displayValue: string;
  selected: boolean;
  dataType: string;
  inputType: string;
  password?: string;
  mandatory: boolean;
  displayGroup: string;
  displayOrder: number;
  validationPatterns: any;
  options: { key: string; value: any }[];
  originalValue: string | number;
  wasTouched: boolean;
  fieldName: string;
}
interface InfoItem {
  id: number;
  displayGroup: string | null;
  displayOrder: number;
  name: string;
  description: string;
  value: string;
  insertValue: string;
}

interface SettingItem {
  serviceTypeParameterId: number;
  name: string;
  description: string;
  value: string;
  displayValue: string;
  selected: boolean;
  dataType: string;
  inputType: string;
  mandatory: boolean;
  displayGroup: string;
  displayOrder: number;
  originalValue: string;
}

interface MailboxData {
  dialogTitle: string;
  serviceTypeId: number;
  username: string;
  serviceIdentifier: string;
  info: InfoItem[];
  settings: SettingItem[];
  links: any[]; 
  status: any[];
}



   
  
   
    async function getData(): Promise<ServiceAccount[]> {
        const response = await fetch("/MockedServiceAccount.json");
        const data = await response.json();
        const serviceAccounts = data.customerData?.serviceAccounts || [];
        return serviceAccounts;
    }
    
    const ProductPage: React.FC = () => {
      const [data, setData] = useState<ServiceAccount[]>([]);
      const [filteredData, setFilteredData] = useState<ServiceAccount[]>([]); 
      const [loading, setLoading] = useState<boolean>(true);
      const [isEditing, setIsEditing] = useState(false);
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const [isDialogOpen1, setIsDialogOpen1] = useState(false);
      const [isDialogOpenAction, setIsDialogOpenAction] = useState(false);
      const [serviceData, setServiceData] = useState<ServiceSettings | null>(null);
      const [groups, setGroups] = useState<Group[] | null>(null);
      const [providerData, setProviderData] = useState<ProviderInfo[] | null>(null);
      const [passwordVisible, setPasswordVisible] = useState(false);
      const [data1, setData1] = useState<MailboxData | null>(null); 
      const [isOpen, setIsOpen] = useState(false);
      const [filter, setFilter] = useState<string>('Show All'); 
      const router = useRouter();
      const data2 = {
        labels: Array.from({ length: 31 }, (_, i) => i + 1),
        datasets: [
          {
            label: "Download",
            data: [50, 60, 80, 70, 90, 40, 60, 85, 65, 30, 50, 60, 70, 65, 55, 60, 55, 45, 40, 50, 60, 40, 55, 45, 50, 55, 75, 65, 40, 50, 65],
            backgroundColor: "#4dc9f6",
          },
          {
            label: "Upload",
            data: [10, 20, 25, 15, 30, 10, 20, 40, 30, 20, 15, 30, 20, 25, 20, 10, 15, 20, 15, 25, 20, 10, 20, 15, 25, 15, 30, 25, 20, 15, 10],
            backgroundColor: "#36a2eb",
          },
          {
            label: "Night time data",
            data: [5, 10, 15, 10, 20, 5, 10, 25, 20, 10, 10, 15, 10, 15, 10, 5, 10, 15, 10, 15, 10, 5, 15, 10, 15, 10, 20, 15, 10, 5, 10],
            backgroundColor: "#ffcd56",
          },
        ],
      };
    
      const options = {
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            position: "top" as "top", 
          },
        },
      };
      
      
      useEffect(() => {
        const fetchData = async () => {
          const result = await getData();
          setData(result);
          console.log('data :', result)
          setLoading(false);
        };
    
        fetchData();
      }, []);


      // Fetching service settings
      useEffect(() => {
        const fetchServiceData = async () => {
          try {
            const response = await fetch('/fibre-service.json');
            const data = await response.json();
            setServiceData(data);
            setGroups(data.groups);
          } catch (error) {
            console.error('Error fetching service data:', error);
          }
        };
    
        fetchServiceData();
      }, []);

      // Fetch service settings data, groups and settings
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await fetch('/fibre-service.json');
        const data = await response.json();
        setServiceData(data);
        setGroups(data.groups);
      } catch (error) {
        console.error('Error fetching service data:', error);
      }
    };

    fetchServiceData();
  }, []);

  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/actionsSetting.json');
      const result = await response.json();
      setData1(result);
    };

    fetchData();
  }, []);

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, name: string) => {
        // Handle input changes here
        console.log(name, e.target.value);
      };

      const generalSettings = groups?.find(group => group.displayGroup === 'General')?.settings || [];
      const mobileNumberSetting = generalSettings.find(setting => setting.name === 'On-site Contact Mobile Number');
      const emailSetting = generalSettings.find(setting => setting.name === 'On-Site Contact Email Address');
      const telephoneSetting = generalSettings.find(setting => setting.name === 'On-Site Contact Telephone Number');
      const propertyOwnerSetting = generalSettings.find(setting => setting.name === 'Property Owner');
      const secondLineSetting = generalSettings.find(setting => setting.name === 'Second Line Installation');


      const handleIconClick = () => {
        setIsDialogOpen(true);
      };

      const closeDialog = () => {
        setIsDialogOpen(false);
      };

      const handleEditClick = () => {
        setIsEditing(true);
      };
    
      const handleSave = () => {
        setIsEditing(false);
      };
    
      const handleCancel = () => {
        // setFriendlyName(account.customerFriendlyName);
        setIsEditing(false);
      };

      const viewServiceActionActivationDialog = () => {
        setIsDialogOpen1(true);
      };

      const viewServiceSettingsDialog = () => {
        console.log('handleIconClickAction triggered');
        setIsDialogOpenAction(true);
      };

      const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
      };

      const toggleAccordion = () => {
        setIsOpen(!isOpen);
      };

      useEffect(() => {
        if (filter === 'Show All') {
          setFilteredData(data); // Show all data if 'Show All' is clicked
        } else if (filter === 'Fibre') {
          // Filter data for "Fibre" services (using service ID 564)
          const fibreData = data.filter(account =>
            account.contracts.some(contract =>
              contract.servicesInfo.some(serviceInfo => serviceInfo.serviceTypeId === 564)
            )
          );
          console.log('filter data :', fibreData)
          setFilteredData(fibreData);
        } else if (filter === 'Other') {
          const otherData = data.filter(account =>
            account.contracts.some(contract =>
              contract.servicesInfo.some(serviceInfo => serviceInfo.serviceTypeId !== 564)
            )
          )
          setFilteredData(otherData);
        }
      }, [filter, data]);
    
      // Button click handlers to update the filter
      const handleShowAll = () => {
        setFilter('Show All');
      };
    
      const handleFibreFilter = () => {
        setFilter('Fibre');
      };

      const handleOtherFilter = () => {
        setFilter('Other');
      };

    
  return (
    <div className="w-full max-w-[1024px] mx-auto items-center">
      {/* Filter Section */}
      <Card className=" bg-white flex items-center space-x-4 py-2">
        <span className="text-blue-800 font-semibold flex items-center">
          <i className="fas fa-filter mr-2"></i> Filter my products:
        </span>
        <Button variant="outline" onClick={() => router.push('/my-products/emails-table')}>
        <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '8px' }} /> Email
        </Button>
        <Button variant="outline" onClick={handleFibreFilter}>
        <FontAwesomeIcon icon={faWifi} style={{ marginRight: '8px' }} />
        Fibre
        </Button>
        <Button variant="outline" onClick={handleOtherFilter}>
        <FontAwesomeIcon icon={faShield} style={{ marginRight: '8px' }} />
        Other
      </Button>
        <Button variant="outline" onClick={handleShowAll}>
        Show All
        </Button>
        <Button variant="outline" onClick={() => router.push('/my-service-accounts')}>
        <FontAwesomeIcon icon={faList} style={{ marginRight: '8px' }}/> My Service Accounts
        </Button>
      </Card>
      

      {/* Filtered Results Section */}
      {filteredData.map((account) => {
        // Filter services based on serviceTypeId
        const servicesTobeDisplayed = account.services.filter(service =>
          ![566, 4, 138, 50].includes(service.serviceTypeId)
        );
        
        
        return (
          <Card key={account.serviceAccountId} className="mt-6 p-4  rounded bg-white grid grid-cols-3 gap-4">
            {/* Product Info Section (Left side) */}
            <Card className="bg-white col-span-2 p-6 ">
            <div className="account-header">
          <h2 className="account-title" style={{ marginBottom: '0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {isEditing ? (
                <input
                  type="text"
                  value={account.customerFriendlyName}
                //   onChange={(e) => setFriendlyName(e.target.value)}
                  onBlur={handleSave} // Save on blur
                  onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                  style={{
                    width: '200px',
                    marginRight: '8px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#004D6E',
                  }}
                />
              ) : (
                <>
                  <span
                    style={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: '#004D6E',
                    }}
                  >
                    {account.customerFriendlyName}
                  </span>
                  <img
                    src="https://img.icons8.com/?size=100&id=ltMOGtgNYnUg&format=png&color=000000"
                    alt="Edit Icon"
                    onClick={handleEditClick}
                    style={{
                      width: '20px',
                      height: '20px',
                      marginLeft: '8px',
                      cursor: 'pointer',
                    }}
                  />
                </>
              )}
  
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <img
                      src="https://img.icons8.com/?size=100&id=CWiCmUhQTh3E&format=png&color=000000"
                      alt="Tooltip Icon"
                      style={{
                        width: '20px',
                        height: '20px',
                        marginLeft: '8px',
                        cursor: 'pointer',
                      }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Struggling to keep track of all of your products? You can
                      assign a friendly name to each of your Mweb products, e.g.
                      "Business Website", or "Mom's Fibre" and they'll appear like
                      that everywhere - including your statements.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
  
            <span 
            style={{
              fontSize: '19px',
              fontWeight: 'bold',
              color: '#004D6E',
            }}>
              R{account.contracts[0]?.displayName} PM
            </span>
          </h2>
        </div>
        <p className="text-gray-600 mb-6">
           {`R${account.contracts[0]?.activeRate} PM`}
        </p>

        <Button variant="outline" onClick={() => router.push('/my-service-accounts')}  className="mr-4">
         Get Faster Fibre
        </Button>
        <Button variant="outline" onClick={() => router.push('/my-service-accounts')}  className="mr-4">
         Add New Product
        </Button>
        {account.contracts[0]?.canChangeProduct &&(
        <Button variant="outline" onClick={() => router.push('/my-service-accounts')}  className="mb-4">
         Change product
        </Button>
        )}

{servicesTobeDisplayed.length > 0 ? (
      <div className="w-full">
      {/* Header Section */}
      <div className="flex items-center space-x-4">
        <span className="font-semibold text-gray-600">Usage</span>

        {/* Time Range Buttons */}
        <div className="flex space-x-2">
          <Button variant="outline">30 DAYS</Button>
          <Button variant="outline">12 MONTHS</Button>
        </div>

        {/* Dropdown */}
        <div className="relative">
          <Button variant="outline">
            VIEW BY MONTH <span className="ml-2">▼</span>
          </Button>
          {/* Dropdown content */}
          <div className="absolute mt-2 w-full rounded-md shadow-lg hidden">
            <div className="py-1 bg-white rounded-md shadow-xs">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700">Option 1</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700">Option 2</a>
            </div>
          </div>
        </div>

        {/* Plus Icon for Accordion */}
        <div className="ml-auto">
          <button
            className="text-xl font-bold text-gray-800 mb-6"
            onClick={toggleAccordion} // Toggles the accordion
          >
            {isOpen ? '-' : '+'}
          </button>
        </div>
      </div>

      {/* Accordion Content Below */}
      {isOpen && (
        <Card className="bg-white">
          <div className="chart-container">
                <Bar data={data2} options={options} />
          </div>
          {/* Add more content here as needed */}
        </Card>
      )}
    </div>
    ) : (
      <p className="text-gray-600"></p>
    )}

 
              {/* Included Services Section */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Included Services</h2>

                {/* Display services in a table */}
                {servicesTobeDisplayed.length > 0 ? (
                  <table className="table-auto w-full text-left">
                    <thead>
                      <tr>
                      </tr>
                    </thead>
                    <tbody>
                      {servicesTobeDisplayed.map((service, index) => (
                        <tr key={index} className="border-t">
                          <td className="px-4 py-2">
                            <Badge variant="outline">{service.status}</Badge>
                          </td>
                          <td className="px-4 py-2 text-gray-700">{service.name}</td>
                          <td className="px-4 py-2 text-gray-600">{service.crm1 || 'N/A'}</td>
                          <td className="px-4 py-2">
                           {/* Service Settings Icon - Remove this entirely if hasServiceActions is true */}
                        {service.hasServiceSettings &&
                          !service.hasServiceActions && (
                            <FontAwesomeIcon
                              icon={faGear}
                              size="lg"
                              onClick={() => {
                                console.log('Service Settings clicked:', {
                                  hasServiceSettings: service.hasServiceSettings,
                                  hasServiceActions: service.hasServiceActions,
                                  hasUsageData: service.hasUsageData,
                                });
                                handleIconClick();
                              }}
                              style={{
                                cursor: 'pointer',
                                color: '#000',
                                marginRight: '8px',
                              }}
                            />
                          )}
  
                        {/* Service Actions Icons */}
                        {service.hasServiceActions && (
                          <>
                            <FontAwesomeIcon
                              icon={faCog}
                              size="lg"
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log('Service Actions clicked:', {
                                  hasServiceSettings: service.hasServiceSettings,
                                  hasServiceActions: service.hasServiceActions,
                                  hasUsageData: service.hasUsageData,
                                });
                                viewServiceSettingsDialog();
                              }}
                              style={{
                                cursor: 'pointer',
                                color: '#000',
                                marginRight: '8px',
                              }}
                            />
  
                            <FontAwesomeIcon
                              icon={faScrewdriverWrench}
                              size="lg"
                              onClick={() => {
                                console.log(
                                  'Service Actions (ScrewdriverWrench) clicked:',
                                  {
                                    hasServiceActions: service.hasServiceActions,
                                    hasUsageData: service.hasUsageData,
                                  }
                                );
                                viewServiceActionActivationDialog();
                              }}
                              style={{
                                cursor: 'pointer',
                                color: '#000',
                                marginRight: '8px',
                              }}
                            />
                          </>
                        )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    
                     <FontAwesomeIcon 
                     icon={faTrash} 
                     style={{ color: "#c60606" }} 
                     /> 
                  </table>
                ) : (
                  <p className="text-gray-600">No services available</p>
                )}
              </div>
            </Card>
            {/* Dialog for Settings */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button
            onClick={() => setIsDialogOpen(true)}
            style={{ display: 'none' }}
          >
            Open Dialog
          </button>
        </DialogTrigger>
  
        <DialogContent className="dialog-content">
          <div className="modal-settings">
            <h3>
              {serviceData?.dialogTitle} Settings - {serviceData?.username}
            </h3>
  
            {/* Information Section */}
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Information</AccordionTrigger>
                <AccordionContent>
                  <div className="network-provider-details">
                    {providerData?.map((item) => (
                      <div key={item.id} className="provider-detail">
                        <h4>
                          {item.name}: {item.value}
                        </h4>
                        <p>{item.description}</p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
  
            {/* Access Details Section */}
            <Accordion type="single" collapsible>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  {groups && groups.length > 0
                    ? groups[0].displayGroup
                    : 'Default Group Name'}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="router-credentials">
                    <h4>
                      Username: {serviceData?.username}@mwb.com
                    </h4>
                    <p>
                      The username to enter into your Fibre router. Note: this
                      may be different from your email address.
                    </p>
  
                    <label htmlFor="password">Password</label>
                  <div className="password-field">
                      <input
                      type={passwordVisible ? "text" : "password"}
                      id="password"
                      placeholder="********"
                      value={
                            groups && groups.length > 0 && groups[0].settings[0].value
                           ? groups[0].settings[0].value
                           : ''
                           }
                     readOnly
                      />
                    <button type="button" onClick={togglePasswordVisibility}>
                       {passwordVisible ? "Hide" : "Show"} Password
                    </button>
                  </div>
                    <p>
                      {groups && groups.length > 0
                        ? groups[0].settings[0].description
                        : 'Password to enter into your Fibre router.'}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
  
            {/* General Section */}
            <Accordion type="single" collapsible>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  {groups && groups.length > 0
                    ? groups[1].displayGroup
                    : 'Default Group Name'}
                </AccordionTrigger>
                <AccordionContent style={{ backgroundColor: 'white' }}>
                  <div className="form-container">
                    <div className="form-group">
                      <label htmlFor="mobileNumber">
                        On-site Contact Mobile Number
                      </label>
                      <input
                        type="text"
                        id="mobileNumber"
                        placeholder="Enter mobile number"
                        value={mobileNumberSetting?.value || ''}
                        onChange={(e) =>
                          handleInputChange(e, 'mobileNumber')
                        }
                      />
                      <small>
                        {mobileNumberSetting?.description}
                      </small>
                    </div>
  
                    <div className="form-group">
                      <label htmlFor="email">
                        On-Site Contact Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Enter email address"
                        value={emailSetting?.value || ''}
                        onChange={(e) => handleInputChange(e, 'email')}
                      />
                      <small>{emailSetting?.description}</small>
                    </div>
  
                    <div className="form-group">
                      <label htmlFor="telephoneNumber">
                        On-Site Contact Telephone Number
                      </label>
                      <input
                        type="text"
                        id="telephoneNumber"
                        placeholder="Enter telephone number"
                        value={telephoneSetting?.value || ''}
                        onChange={(e) =>
                          handleInputChange(e, 'telephoneNumber')
                        }
                      />
                      <small>
                        {telephoneSetting?.description}
                      </small>
                    </div>
  
                    <div className="form-group">
                      <label htmlFor="propertyOwner">Property Owner</label>
                      <select
                        id="propertyOwner"
                        value={
                          propertyOwnerSetting?.value === 1
                            ? 'yes'
                            : 'no'
                        }
                        onChange={(e) =>
                          handleInputChange(e, 'propertyOwner')
                        }
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      <small>
                        {propertyOwnerSetting?.description}
                      </small>
                    </div>
  
                    <div className="form-group">
                      <div className="flex items-center space-x-2">
                        <RadioGroup defaultValue="option-one">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="option-one"
                              id="option-one"
                            />
                            <Label htmlFor="option-one">
                              {secondLineSetting?.description}
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              Close
            </Button>
            <Button variant="outline">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
            
            {/* Spanel */}
      <Dialog open={isDialogOpen1} onOpenChange={setIsDialogOpen1}>
        <DialogTrigger asChild>
          <button style={{ display: 'none' }}>Open</button>
        </DialogTrigger>
        <DialogContent style={{ backgroundColor: 'white' }}>
          <DialogHeader>
            <DialogTitle>
              {data1?.dialogTitle} Settings - {data1?.username}
            </DialogTitle>
            <DialogDescription>
              Activate your free mailbox as it has not been created or was
              removed due to non-use
            </DialogDescription>
            <Button variant="outline">Activate Mailbox</Button>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen1(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  
      {/* Dialog for Additional Actions */}
      <Dialog
        open={isDialogOpenAction}
        onOpenChange={setIsDialogOpenAction}
      >
        <DialogContent style={{ backgroundColor: 'white' }}>
          <DialogHeader>
            <DialogTitle>
              {data1?.dialogTitle} Settings - {data1?.serviceIdentifier}
            </DialogTitle>
            <DialogDescription>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Information</AccordionTrigger>
                  <AccordionContent>
                    {data1?.info.map((item) => (
                      <div key={item.id}>
                        <strong>{item.name}</strong>: 
                        <p>{item.description}</p>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
  
              <Accordion type="single" collapsible>
                <AccordionItem value="aliases">
                  <AccordionTrigger>Aliases</AccordionTrigger>
                  <AccordionContent>
                    {data1?.settings.map((setting) => (
                      <div key={setting.serviceTypeParameterId}>
                        <strong>{setting.name}</strong>: {setting.description}
                        <input
                          type="text"
                          defaultValue={setting.value}
                          onChange={(e) => {
                            console.log(
                              `New value for ${setting.name}: ${e.target.value}`
                            );
                          }}
                        />
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpenAction(false)}
            >
              Close
            </Button>
            <Button variant="outline">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

            {/* Recommendation Section (Right side) */}
            <Card className="p-4  border rounded-lg bg-white">
              <h2 className="text-2xl font-semibold mb-4">Recommended for you:</h2>
              {/* Second Recommendation Card */}
              <Card className="bg-white mb-4">
                 <CardHeader>
                     <CardTitle>Microsoft 365 Personal - Monthly</CardTitle>
                  </CardHeader>
                 <CardContent>
                      <img src="https://via.placeholder.com/60" alt="Microsoft 365 icon" className="w-12 h-12 my-4" />
                 </CardContent>
                 <CardFooter>
                 <div className="flex justify-between items-end">
                  <p className="text-xl font-bold">R107pm</p>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Terms and conditions apply</p>
                    <Button variant="outline" >
                      Order Now
                    </Button>
                  </div>
                </div>
                 </CardFooter>
               </Card>

              <Card className="bg-white">
                 <CardHeader>
                     <CardTitle>Microsoft 365 Personal - Monthly</CardTitle>
                  </CardHeader>
                 <CardContent>
                      <img src="https://via.placeholder.com/60" alt="Microsoft 365 icon" className="w-12 h-12 my-4" />
                 </CardContent>
                 <CardFooter>
                 <div className="flex justify-between items-end">
                  <p className="text-xl font-bold">R107pm</p>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Terms and conditions apply</p>
                    <Button variant="outline" >
                      Order Now
                    </Button>
                  </div>
                </div>
                 </CardFooter>
               </Card>
            </Card>
          </Card>
        );
      })}
    </div>
  );
};
  export default ProductPage;


