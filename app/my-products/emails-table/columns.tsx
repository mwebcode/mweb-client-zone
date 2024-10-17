import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { faGear, faChartColumn, faCog, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
  } from "@/components/ui/dialog"
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";

 
  

export type ServiceAccount = {
    username: string;
    serviceAccountId: number;
    serviceAccountPrimaryContactId: number;
    serviceAccountPrimaryContactDisplayName: string;
    customerFriendlyName: string;
    status: string;
    accessLevel: string;
    hasPendingOrder: boolean;
    contracts: {
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
      bundleMasterUsername: string;
      bundleMasterServiceAccountId: number;
      bundleChildServiceAccounts: any[]; 
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
      appliedVoucher: any; 
      services: number[];
      servicesInfo: {
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
        links: {
          type: string;
          title: string;
          displayTitle: string | null;
          rel: string | null;
          group: string;
          method: string;
        }[];
      }[];
      links: any[]; 
      cantChangeProductReasons: any[]; 
      bundleProductDto: any[]; 
      vouchersAvailableDiscountInfo: any[]; 
      vouchersAvailableInfo: any[]; 
      appliedVoucherProductDescription: string | null;
      appliedVoucherDiscountInclVat: number;
      appliedVoucherEffectiveFrom: string | null;
      tokenTopups: any[]; 
    }[];
    services: {
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
      links: {
        type: string;
        title: string;
        displayTitle: string | null;
        rel: string | null;
        group: string;
        method: string;
      }[];
    }[];
    links: any[]; 
    serviceInstanceValues: any[];
  };

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

  const fetchActionsSettingsData = async (): Promise<MailboxData[]> => {
    try {
      const response = await fetch('/actionsSetting.json');
      if (!response.ok) {
        throw new Error('Failed to fetch actions settings data');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return []; // Return an empty array on error
    }
  };
  
  
  

export const columns: ColumnDef<ServiceAccount>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorFn: (row) =>
      row.contracts?.[0]?.servicesInfo?.[0]?.crm1 || "N/A", 
    id: "servicesInfo.crm1",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email Address
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: 'customerFriendlyName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Action
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
        const service = row.original.contracts?.[0]?.servicesInfo?.[0];
        const hasServiceSettings = service?.hasServiceSettings || false;
        const hasServiceActions = service?.hasServiceActions || false;
        const hasUsageData = service?.hasUsageData || false;
       
 
        const [data, setData] = useState<MailboxData | null>(null); 

        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await fetch('/actionsSetting.json');
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              const result: MailboxData = await response.json();
              console.log('Fetched data:', result); 
              if (result && typeof result === 'object') {
                setData(result);
              } else {
                console.error('Fetched data is not an object:', result);
              }
            } catch (error) {
              console.error('Error fetching actions settings:', error);
            }
          };
      
          fetchData();
        }, []);
      
        

        const foundData = data?.serviceTypeId === service?.serviceTypeId ? data : null;

        console.log('action settings', foundData);


  
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Service Settings Icon */}
            {hasServiceSettings && !hasServiceActions && (
              <FontAwesomeIcon
                icon={faGear}
                size="lg"
                onClick={() => {
                  console.log('Service Settings clicked:', {
                    hasServiceSettings,
                    hasServiceActions,
                    hasUsageData,
                  });
                  // handleIconClick();
                }}
                style={{
                  cursor: 'pointer',
                  color: '#000',
                  marginRight: '8px',
                }}
              />
            )}
  
            {/* Usage Data Icon */}
            {hasUsageData && (
              <Dialog>
              <DialogTrigger asChild>
                <FontAwesomeIcon
                icon={faChartColumn}
                size="lg"
                style={{
                  cursor: 'pointer',
                  color: '#000',
                  marginRight: '8px',
                }}
              />
              </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        Service Settings
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
            )}
  
            {/* Service Actions Icons */}
            {hasServiceActions && (
              <>
                {/* Service Action with Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <FontAwesomeIcon
                      icon={faCog}
                      size="lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Service Actions clicked:', {
                          hasServiceSettings,
                          hasServiceActions,
                          hasUsageData,
                        });
                      }}
                      style={{
                        cursor: 'pointer',
                        color: '#000',
                        marginRight: '8px',
                      }}
                    />
                  </DialogTrigger>
                  <DialogContent style={{ backgroundColor: 'white' }}>
          <DialogHeader>
            <DialogTitle>
              {foundData?.dialogTitle} Settings - {foundData?.serviceIdentifier}
            </DialogTitle>
            <DialogDescription>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Information</AccordionTrigger>
                  <AccordionContent>
                    {foundData?.info.map((item) => (
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
                    {foundData?.settings.map((setting) => (
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
              // onClick={() => setIsDialogOpenAction(false)}
            >
              Close
            </Button>
            <Button variant="outline">Save</Button>
          </DialogFooter>
        </DialogContent>
                </Dialog>
  
                {/* Additional Service Action */}
                <Dialog>
                  <DialogTrigger asChild>
                    <FontAwesomeIcon
                  icon={faScrewdriverWrench}
                  size="lg"
                  onClick={() => {
                    console.log('Service Actions (ScrewdriverWrench) clicked:', {
                      hasServiceActions,
                      hasUsageData,
                    });
                  }}
                  style={{
                    cursor: 'pointer',
                    color: '#000',
                    marginRight: '8px',
                  }}
                />
                </DialogTrigger >
                  <DialogContent style={{ backgroundColor: 'white' }}>
                    <DialogHeader>
                      <DialogTitle>
                      {service?.crm1} Settings - {service?.crm1}
                      </DialogTitle>
                      <DialogDescription>
                        Activate your free mailbox as it has not been created or was removed due to no-use
                      </DialogDescription>
                      <Button variant="outline">Activate Mailbox</Button>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        );
      },
    },
  ];