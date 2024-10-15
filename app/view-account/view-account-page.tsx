'use client';

import React, { useEffect, useState } from 'react';
import './view-account.css';
import { useRouter } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InfoIcon } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faScrewdriverWrench,faChartColumn,faCog  } from '@fortawesome/free-solid-svg-icons';
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
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  ChartData,
} from "chart.js";
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
  servicesInfo: any[];
  links: any[];
  cantChangeProductReasons: any[];
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

interface ServiceAccountDetailsProps {
  account: ServiceAccount;
  onBack: () => void;
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
interface Month {
  title: string;
  month: string;
}

interface Rating {
  ratingThreshold: number;
  level: string;
  ratingUsage: number;
  ratingPercentUsed: number;
}

interface Usage {
  date: string;
  totalUp: number;
  totalDown: number;
  total: number;
  totalOffPeak: number;
  peakUp: number;
  peakDown: number;
  totalPeak: number;
  offPeakUp: number;
  offPeakDown: number;
  ratings: Rating[]; 
  events: any[];
}



const ServiceAccountDetails: React.FC<ServiceAccountDetailsProps> = ({ account, onBack }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpen1, setIsDialogOpen1] = useState(false);
  const [isDialogOpenAction, setIsDialogOpenAction] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [friendlyName, setFriendlyName] = useState(account.customerFriendlyName);
  const [expandedServiceId, setExpandedServiceId] = useState<number | null>(null);
  const [serviceData, setServiceData] = useState<ServiceSettings | null>(null);
  const [providerData, setProviderData] = useState<ProviderInfo[] | null>(null);
  const [groups, setGroups] = useState<Group[] | null>(null);
  const [data, setData] = useState<MailboxData | null>(null); 
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [usageData, setUsageData] = useState<Usage[]>([]);
  const [months, setMonths] = useState<Month[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>('202410');
  const [chartData, setChartData] = useState<ChartData<'bar', number[], unknown>>({
    labels: [],
    datasets: [],
  });
  const router = useRouter();
  const [isDialogOpenChangeProduct, setIsDialogOpenForChangeProduct] = useState(false);
  

  const fetchLastTwelveMonthsData = async () => {
    const monthsToFetch = months.slice(0, 13);
    const promises = monthsToFetch.map(async (month) => {
      try {
        const response = await fetch(`/${month.month}SessionSummary.json`);
        const data = await response.json();
        console.log(month.month); 
        console.log(data); 
        return data.responseBody.usage; 
      } catch (error) {
        console.error(`Error fetching data for ${month.month}:`, error);
        return null;
      }
    });
  
    const results = await Promise.all(promises);
    const validResults = results.filter(data => data !== null && Array.isArray(data));
    const downloadData = usageData.map(item => item.totalDown);
      const uploadData = usageData.map(item => item.peakDown);
      const nightData = usageData.map(item => item.totalOffPeak);

  
    setChartData({
      labels: monthsToFetch.map(month => month.title),
      datasets: [
        {
          label: "Download",
          data: downloadData,
          backgroundColor: "#4dc9f6",
        },
        {
          label: "Upload",
          data: uploadData,
          backgroundColor: "#36a2eb",
        },
        {
          label: "Night time data",
          data: nightData,
          backgroundColor: "#ffcd56",
        },
      ],
    });
  };
  
  const handleFetchTwelveMonthsData = () => {
    fetchLastTwelveMonthsData();
  };

  useEffect(() => {
    if (usageData.length > 0) {
      const downloadData = usageData.map(item => item.totalDown);
      const uploadData = usageData.map(item => item.peakDown);
      const nightData = usageData.map(item => item.totalOffPeak);

      setChartData({
        labels: Array.from({ length: usageData.length }, (_, i) => i + 1),
        datasets: [
          {
            label: "Download",
            data: downloadData,
            backgroundColor: "#4dc9f6",
          },
          {
            label: "Upload",
            data: uploadData,
            backgroundColor: "#36a2eb",
          },
          {
            label: "Night time data",
            data: nightData,
            backgroundColor: "#ffcd56",
          },
        ],
      });
    }
  }, [usageData]);

  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: '',
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Usage in GB', 
        },
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
      try {
        const response = await fetch('/fibre-service.json');
        const data = await response.json();
        setProviderData(data.info); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const response = await fetch('/Months.json');
        const data: Month[] = await response.json();
        setMonths(data);
      } catch (error) {
        console.error('Error fetching the months:', error);
      }
    };

    fetchMonths();
  }, []);

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value); 
  };

  useEffect(() => {
    const fetchUsageData = async () => {
      if (selectedMonth) {
        try {
          const response = await fetch(`/${selectedMonth}SessionSummary.json`);
          const data = await response.json();
          setUsageData(data.responseBody.usage);
        } catch (error) {
          console.error('Error fetching usage data:', error);
        }
      }
    };

    fetchUsageData();
  }, [selectedMonth]);


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
      setData(result);
    };

    fetchData();
  }, []);
 
  


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, name: string) => {
    console.log(name, e.target.value);
  };

  const generalSettings = groups?.find(group => group.displayGroup === 'General')?.settings || [];

  const mobileNumberSetting = generalSettings.find(setting => setting.name === 'On-site Contact Mobile Number');
  const emailSetting = generalSettings.find(setting => setting.name === 'On-Site Contact Email Address');
  const telephoneSetting = generalSettings.find(setting => setting.name === 'On-Site Contact Telephone Number');
  const propertyOwnerSetting = generalSettings.find(setting => setting.name === 'Property Owner');
  const secondLineSetting = generalSettings.find(setting => setting.name === 'Second Line Installation');
 
  
  const getPassword = () => {
    if (groups && groups.length > 0) {
      const passwordSetting = groups[0].settings.find(setting => setting.name === 'password');
      return passwordSetting ? passwordSetting.value : '';
    }
    return '';
  };

  const password = getPassword();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  

    useEffect(() => {
        fetch('/settings.json')
            .then((response) => response.json())
            .then((data: ServiceSettings) => {
                setServiceData(data);
            })
            .catch((error) => console.error('Error fetching the JSON:', error));
    }, []);

  const viewUsageDataWithAccordion = (serviceId: number | null) => {
    setExpandedServiceId(prevId => (prevId === serviceId ? null : serviceId));
  };

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
    setFriendlyName(account.customerFriendlyName);
    setIsEditing(false);
  };
  const viewServiceActionActivationDialog = () => {
    setIsDialogOpen1(true);
  };

  const viewServiceSettingsDialog = () => {
    console.log('handleIconClickAction triggered');
    setIsDialogOpenAction(true);
  };
  

  const handleDialogClose = () => {
    setIsDialogOpen(false); 
  };

  const openChangeProductDialog = () => {
    setIsDialogOpenForChangeProduct(true);
  };



  const servicesTobeDisplayed = account.services.filter(service =>
    ![566, 4, 138, 50].includes(service.serviceTypeId)
  );

  return (
    <div className="w-full max-w-[1024px] mx-auto items-center">
      <button className="back-button" onClick={onBack}>
        Back to My Service Accounts
      </button>
  
      <div className="account-details-card">
        <div className="account-header">
          <h2 className="account-title" style={{ marginBottom: '0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {isEditing ? (
                <input
                  type="text"
                  value={friendlyName}
                  onChange={(e) => setFriendlyName(e.target.value)}
                  onBlur={handleSave} 
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
                    {friendlyName}
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
  
            <span className="account-price">
              R{account.contracts[0]?.activeRate} PM
            </span>
          </h2>
        </div>
  
        <div className="account-address">
          {account.serviceAccountPrimaryContactDisplayName}
        </div>

        <Button variant="outline" onClick={() => router.push('/my-service-accounts')}  className="mr-4">
         Get Faster Fibre
        </Button>
        <Button variant="outline" onClick={() => router.push('/my-service-accounts')}  className="mr-4">
         Add New Product
        </Button>
        {account.contracts[0]?.canChangeProduct &&(
        <Button variant="outline" onClick={() => openChangeProductDialog()}  className="mb-4">
         Change product
        </Button>
        )}
  
        <div className="contracts-section">
          <h3>Contracts</h3>
          {account.contracts.map((contract) => (
            <div key={contract.id} className="contract-row">
              <Badge variant="outline" style={{ backgroundColor: 'green', color: 'white' }}>{contract.status}</Badge>
              <span className="contract-description">{contract.displayName}</span>
              <span className="contract-price">R{contract.activeRate} PM</span>
            </div>
          ))}
        </div>

  
        <div className="included-services-section">
          <h3>Included Services</h3>
          <table className="included-services-table">
            <thead>
            </thead>
            <tbody>
              {servicesTobeDisplayed.length ? (
                servicesTobeDisplayed.map((service) => (
                  <React.Fragment key={service.id}>
                    <tr>
                      <td>
                      <Badge variant="outline" style={{ backgroundColor: 'green', color: 'white' }}>{service.status}</Badge>
                       
                      </td>
                      <td>{service.name}</td>
                      <td>{service.crm1 || 'N/A'}</td>
                      <td>
                        {/* Service Settings Icon */}
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
  
                        {/* Usage Data Icon */}
                        {service.hasUsageData && (
                          <FontAwesomeIcon
                            icon={faChartColumn}
                            size="lg"
                            onClick={() => viewUsageDataWithAccordion(service.id)}
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
  
                    {/* Accordion Details */}
                    {expandedServiceId === service.id && (
                      <tr>
                        <td colSpan={4}>
                          
                          <div className="flex items-center space-x-4">
                             <span className="font-semibold text-gray-600">Usage</span>

                              {/* Time Range Buttons */}
                          <div className="flex space-x-2">
                               <Button variant="outline">30 DAYS</Button>
                               <Button variant="outline" onClick={handleFetchTwelveMonthsData} className="mr-4">
                                  12 MONTHS
                               </Button>
                          </div>

                              {/* Dropdown */}
                              <Select onValueChange={handleMonthChange} defaultValue={selectedMonth}>
                                   <SelectTrigger className="w-[180px]">
                                          <SelectValue placeholder="Select Month" />
                                   </SelectTrigger>
                                   <SelectContent>
                                         {months.map((month, index) => (
                                         <SelectItem key={index} value={month.month}>
                                            {month.title}
                                 </SelectItem>
                                 ))}
                                  </SelectContent>
                              </Select>
                          </div>
                            
                          
                          <div className="chart-container">
                            <Bar data={chartData} options={options} />
                          </div>
                          <Button variant="outline" onClick={() => router.push('/my-usage')}  className="mb-4">
                            View Session
                          </Button>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center">
                    No included services available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
  
        <div className="additional-info">
          <span></span>
          <span></span>
        </div>
      </div>
  
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
                <AccordionContent>
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
              {data?.dialogTitle} Settings - {data?.username}
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
              {data?.dialogTitle} Settings - {data?.serviceIdentifier}
            </DialogTitle>
            <DialogDescription>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Information</AccordionTrigger>
                  <AccordionContent>
                    {data?.info.map((item) => (
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
                    {data?.settings.map((setting) => (
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



      <Dialog open={isDialogOpenChangeProduct} onOpenChange={setIsDialogOpenForChangeProduct}>
        <DialogTrigger asChild>
          <button style={{ display: 'none' }}>Open</button>
        </DialogTrigger>
        <DialogContent style={{ backgroundColor: 'white' }}>
          <DialogHeader>
            <DialogTitle>
              I want to :
            </DialogTitle>
            <Button variant="outline">Upgrade Products</Button>
            <Button variant="outline">Downgrage product</Button>
            <Button variant="outline">Apply Promotion Voucher</Button>
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
    </div>
  );
  
};

export default ServiceAccountDetails;

 