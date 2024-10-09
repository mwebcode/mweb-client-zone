"use client";
import {
    CorporateUser,
    MockedCustomerAccountData,
    MockedCustomerAccountLite
} from "@/app/corporate-user-management/mockedCustomerAccountData";
import {columns, IPayment} from "./columns"
import {DataTable} from "./data-table"
import MwebSliceContainer from "@/components/MwebSliceContainer";
import React, {useEffect, useState} from "react";

const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options).replace(',', '');
};

function getSelfAsUser(): CorporateUser | null {
    const  customerAccount = MockedCustomerAccountData;
    const customerAccountLite = MockedCustomerAccountLite;
    const formattedDate = formatDate(customerAccount.createDate);
    if (customerAccountLite && customerAccountLite?.serviceAccountCount > 0) {
        const selfUser: CorporateUser = {
            accountId: customerAccount.accountNumber,
            contactUsername: customerAccountLite.username,
            emailAddress: customerAccountLite.emailAddress,
            contactFullName: `${customerAccountLite.firstName} ${customerAccountLite.lastName}`,
            firstName: customerAccountLite.firstName,
            lastName: customerAccountLite.lastName,
            masterAccountCreateDate: formattedDate,
            masterAccountStatus: customerAccount.status?.toUpperCase(),
            title: ''
        };
        return selfUser;
    } else {
        return null;
    }
}
const selfUser: any = getSelfAsUser();
 const payments: IPayment[] = [
    {
        status:  selfUser?.masterAccountStatus.charAt(0).toUpperCase() + selfUser?.masterAccountStatus.slice(1).toLowerCase(),
        accountId: selfUser?.accountId,
        name: selfUser?.firstName,
        emailAddress: selfUser?.emailAddress,
        username: selfUser?.contactUsername,
        createDate: selfUser?.masterAccountCreateDate
    }
]

async function getData(): Promise<IPayment[]> {
    return payments;
}
const CorporateUserManagementPage: React.FC = () => {
    getSelfAsUser();
    const handleRowSelect = (row: any) => {
        // getCustomerAccount(row).then(r => r)
    };
    const [data, setData] = useState<any[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await getData();
            setData(result);
        };
        fetchData().then(data => data);
    }, [])



    return (
        <MwebSliceContainer
            sectionId='corporate-user-management'
            bgColor='bg-mwBlueGrey-25 '
            padding='px-4 py-14 md:px-20 md:py-18 desktop:px-[182px] desktop:py-24'
        >
            <div className="  flex flex-col justify-center items-center">
                <DataTable columns={columns} data={data}  onRowSelect={handleRowSelect}/>
            </div>
        </MwebSliceContainer>
    )
}
export default CorporateUserManagementPage;
