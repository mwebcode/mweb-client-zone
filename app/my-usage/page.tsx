"use client"
import React, { useEffect, useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Month {
  title: string;
  month: string;
}

interface Usage {
  date: string;
  totalUp: number;
  totalDown: number;
  total: number;
}

const UsageTable = () => {
  const [months, setMonths] = useState<Month[]>([]);
  const [usageData, setUsageData] = useState<Usage[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>('202410'); // Set October as the default

  // Fetch months from Months.json file
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

  // Fetch usage data when selected month changes
  useEffect(() => {
    const fetchUsageData = async () => {
      if (selectedMonth) {
        try {
          const response = await fetch(`/${selectedMonth}SessionSummary.json`);
          console.log(response) 
          const data = await response.json();
          setUsageData(data.responseBody.usage);
        } catch (error) {
          console.error('Error fetching usage data:', error);
        }
      }
    };

    fetchUsageData();
  }, [selectedMonth]); // Trigger fetching when selectedMonth changes

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value); // Update selected month when user selects an option
  };

   // Function to format date
   const formatDate = (dateString: string) => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    
    // Create a Date object (month is 0-indexed)
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    
    // Format the date to 'dd Mon yyyy'
    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).format(date);
};

  return (
    <Card>
    <div className="max-w-[1024px] container mx-auto p-4 mb-9">
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

      {/* Render table only when usage data is available */}
      
      {usageData.length > 0 && (
        <table className="min-w-full border border-gray-300 mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="w-[100px] p-2 border-b text-left">Date</th>
              <th className="p-2 border-b text-right">Data Sent (GB)</th>
              <th className="p-2 border-b text-right">Data Received (GB)</th>
              <th className="p-2 border-b text-right">Total (GB)</th>
            </tr>
          </thead>
          <tbody>
            {usageData.map((usage, index) => (
              <tr key={index}>
                <td className="p-2 font-medium border-b text-left">{formatDate(usage.date)}</td>
                <td className="p-2 border-b text-right">{(usage.totalUp / 1024).toFixed(2)} GB</td>
                <td className="p-2 border-b text-right">{(usage.totalDown / 1024).toFixed(2)} GB</td>
                <td className="p-2 border-b text-right">{(usage.total / 1024).toFixed(2)} GB</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
      }
       <Button variant="outline" className="mb-4">
         Print
        </Button>
    </div>
    </Card>
  );
};

export default UsageTable;
