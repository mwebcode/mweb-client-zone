'use client';

import React, { useEffect, useState } from 'react';
import { FaMoneyBillWave } from 'react-icons/fa';

// import './view-account.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Button } from "@/components/ui/button"
import {
  Card,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

  



interface Product {
    productCode: string;
    productName: string;
    category: string;
    subcategory: string;
    consumerCategory: string;
    productDescription: string;
    productRate: number;
    productDiscountType: string;
    productDiscountAmount: number;
    productDiscountPeriod: number;
    productDiscountSequence: number;
    onceOffCharge: boolean;
    summary: string;
    isHero: boolean;
    heroOption: string;
    heroTagLine: string;
    heroImage: string;
    sellOnline: boolean;
    accessLimit: number;
    accessLimitUnits: string;
    highlight1: string;
    highlight2: string;
    highlight3: string;
    highlight1Icon: string;
    highlight2Icon: string;
    highlight3Icon: string;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string[];
    includes: string[];
    highlights: string[];
    technicalTerms: string;
    lineSpeed: number;
    parameters: {
        name: string;
        value: string;
    }[];
    hasPreProduct: boolean;
    preProduct: any;
    genericWorkflowImplementation: any;
    productDescriptionAlternative: string;
    friendlyName: string;
    invoiceRollupDescription: string;
    minimumContractMonths: number;
    chargePeriod: string;
    displayPrice: number;
    tagLine: string;
    promoCode: string;
    promoCodeTagLine: string;
    productCap: number;
    productCapNightTime: number;
    productCapType: string;
    lineSpeedUpload: number;
    infrastructureProvider: string;
    productThrottlingType: string;
    recommendedProducts: any[];
}
    
 const ChangeProductPage: React.FC = () => {   
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const speedOptions = [
        '0-25Mbps',
        '25-50Mbps',
        '50-100Mbps',
        '100+Mbps',
      ];
      const priceOptions = [
        'R0 - R699',
        'R700 - R999',
        'R1000+',
      ];
        const [dropdownOpen, setDropdownOpen] = useState(false);
        const [selectedSpeeds, setSelectedSpeeds] = useState(new Array(speedOptions.length).fill(false));
        const [selectedPrices, setSelectedPrices] = useState(new Array(priceOptions.length).fill(false));
        const toggleDropdown = () => setDropdownOpen(prevState => !prevState);



  useEffect(() => {
    fetch('/FilteredProduct.json')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.error('Error fetching the products:', error));
  }, []);

  const filterProducts = () => {
    let filtered = products;

    // Filter by speed
    const speedRanges = [
      { range: [0, 25], condition: selectedSpeeds[0] },
      { range: [25, 50], condition: selectedSpeeds[1] },
      { range: [50, 100], condition: selectedSpeeds[2] },
      { range: [100, Infinity], condition: selectedSpeeds[3] },
    ];

    const selectedSpeedRanges = speedRanges
      .filter(speed => speed.condition)
      .map(speed => speed.range);

    if (selectedSpeedRanges.length) {
      filtered = filtered.filter(product =>
        selectedSpeedRanges.some(([min, max]) =>
          product.lineSpeedUpload / 1024 >= min && product.lineSpeedUpload / 1024 < max
        )
      );
    }

    // Filter by price
    const priceRanges = [
      { range: [0, 699], condition: selectedPrices[0] },
      { range: [700, 999], condition: selectedPrices[1] },
      { range: [1000, Infinity], condition: selectedPrices[2] },
    ];

    const selectedPriceRanges = priceRanges
      .filter(price => price.condition)
      .map(price => price.range);

    if (selectedPriceRanges.length) {
      filtered = filtered.filter(product =>
        selectedPriceRanges.some(([min, max]) =>
          product.productRate >= min && product.productRate < max
        )
      );
    }

    setFilteredProducts(filtered);
  };

  const handleSpeedCheckboxChange = (index: number) => {
    const newSelectedSpeeds = [...selectedSpeeds];
    newSelectedSpeeds[index] = !newSelectedSpeeds[index];
    setSelectedSpeeds(newSelectedSpeeds);
    filterProducts();
  };

  const handlePriceCheckboxChange = (index: number) => {
    const newSelectedPrices = [...selectedPrices];
    newSelectedPrices[index] = !newSelectedPrices[index];
    setSelectedPrices(newSelectedPrices);
    filterProducts();
  };

  // Function to render filter buttons
  const renderFilterButtons = () => {
    return (
        <Card className="bg-white max-w-[1024px] container mx-auto p-4 mb-9">
        <div className="flex space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-700 hover:bg-gray-100 transition duration-200 ease-in-out shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
               Speed
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Select Speed</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {speedOptions.map((option, index) => (
                <DropdownMenuItem key={index}>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedSpeeds[index]}
                      onChange={() => handleSpeedCheckboxChange(index)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
  
          <DropdownMenu>
            <DropdownMenuTrigger className="border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-700 hover:bg-gray-100 transition duration-200 ease-in-out shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <FaMoneyBillWave className="inline-block mr-2" /> Price
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Select Price Range</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {priceOptions.map((option, index) => (
                <DropdownMenuItem key={index}>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedPrices[index]}
                      onChange={() => handlePriceCheckboxChange(index)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>
    );
  };

  // Function to render filtered products
  const renderFilteredProducts = () => {
    return (
      <Card className="p-4 border rounded-lg bg-white mt-6">
        <h2 className="text-2xl font-semibold mb-4">
          Fibre Infrastructure Available:
        </h2>
        <div className="flex flex-wrap gap-4">
          {filteredProducts.map((product) => (
            <Card
              key={product.productCode}
              className="flex-1 min-w-[300px] flex justify-between items-center bg-white mb-4 p-6 border rounded-lg shadow"
            >
              <div>
                <p className="text-lg font-bold">{product.productName}</p>
                <p className="text-sm text-gray-500">
                  {product.productThrottlingType}
                </p>
                <p className="text-sm text-gray-500">Upgrade/Downgrade</p>
                <p className="text-2xl font-bold mt-2">R{product.productRate}pm</p>
              </div>
              <div className="text-right">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faArrowDown} className="mr-2" />
                  <p className="font-bold">{product.lineSpeed / 1024}Mbps</p>
                </div>
                <div className="flex items-center mt-1">
                  <FontAwesomeIcon icon={faArrowUp} className="mr-2" />
                  <p className="font-bold">{product.lineSpeedUpload / 1024}Mbps</p>
                </div>
                <img
                  src="https://via.placeholder.com/60"
                  alt={`${product.infrastructureProvider} logo`}
                  className="w-12 h-12 mt-4"
                />
                <Button variant="outline" className="mt-4 bg-red-500 text-white">
                  Check coverage
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    );
  };

  return (
    <div className="max-w-[1024px] mx-auto items-center mt-4">
      {renderFilterButtons()}
      {renderFilteredProducts()}
    </div>
  );
};
  export default ChangeProductPage;


