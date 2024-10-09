"use client";
import React from "react";
import {
    contractsMockedData,
} from "@/app/corporate-user-management/mockedCustomerAccountData";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import MwebSliceContainer from "@/components/MwebSliceContainer";
import {Button} from "@/components/ui/button";
import {Select, SelectValue} from "@radix-ui/react-select";
import {SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select";

const UserProfiles: React.FC = () => {
    const Checkbox = ({ label, name, checked, onChange }: any) => (
        <label className="custom-checkbox flex">
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
            />
            <span className="checkmark"></span>
            {label}
        </label>
    );

    return (
        <>
            <MwebSliceContainer
                sectionId='corporate-user-management'
                bgColor='bg-mwBlueGrey-25 '
                padding='px-4 py-14 md:px-20 md:py-18 desktop:px-[182px] desktop:py-24'

            >
                <div className="w-full max-w-[1024px] mx-auto items-center">
                    <button className="back-button mb-8 text-[#255D7E]" onClick={() => {}}>Back to My Service Accounts</button>
                    <div className='mb-6'>
                        <h2 className='font-bold mb-4'>Managing User Profiles</h2>
                        <p>Add additional users and assign different access to help manage your Mweb accounts and products. Users can interact with your account both online and via our contact centre and will be considered to be acting on your behalf with the role that you have assigned to them.
                            Read more about user profiles and roles in this easy guide.</p>
                    </div>
                    <Button className='mb-4 bg-[#255d7e] text-white' variant="outline">Add User Profile</Button>
                    {contractsMockedData.flatMap((contract:any,i) => {
                        return (
                            <Accordion type="single" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>{contract.contactDisplayName} ({contract.contactType !== 'None'? contract.contactType: contract.accessLevel}) ({contract.contactUsername})</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="">
                                            <h3 className='font-bold pb-2'>Personal Details</h3>
                                        <hr/>
                                            <div key={i} className="grid grid-cols-2 gap-4 py-2">
                                                <span className="font-light">Name: {contract.contactDisplayName}</span>
                                                <span className='font-light'>ID Number: {contract.contactIdNumber}</span>
                                            </div>
                                            <div key={i} className="grid grid-cols-2 gap-4 py-2 mb-5">
                                                <span className="font-light">Date Of Birth: {contract.contactBirthDate}</span>
                                                <span className='font-light'>Username: {contract.contactUsername}</span>
                                            </div>
                                            <div className="">
                                                <h3 className='font-bold pb-2'>Contact Details</h3>
                                                <hr/>
                                                <div key={i} className="grid grid-cols-2 gap-4 py-2">
                                                    <span className="font-light">Home Tel: {contract.contactHomeNumber}</span>
                                                    <span className='font-light'>Mobile Number: {contract.contactCellNumber}</span>
                                                </div>
                                                <div key={i} className="grid grid-cols-2 gap-4 py-2">
                                                    <span className="font-light">OTP Number: {contract.contactOtpNumber}</span>
                                                    <span className='font-light'>Work Tel: {contract.contactWorkNumber}</span>
                                                </div>
                                                <div key={i} className="grid grid-cols-2 gap-4 py-2 mb-5">
                                                    <span className="font-light">Email: {contract.contactEmailAddress}</span>
                                                    <span className='font-light'></span>
                                                </div>
                                                <div className="">
                                                    <h3 className='font-bold pb-2'>Notifications</h3>
                                                    <hr/>
                                                    <div key={i} className="grid grid-cols-2 gap-4 py-2">
                                                        <Checkbox
                                                            label="Email"
                                                            name="Email"
                                                            checked={contract.optInEmails}
                                                        />
                                                        <Checkbox
                                                            label="SMS"
                                                            name="SMS"
                                                            checked={contract.optInSms}
                                                        />
                                                    </div>
                                                    <div key={i} className="grid grid-cols-2 gap-4 py-2 mb-5">
                                                        <Checkbox
                                                            label="Call"
                                                            name="Call"
                                                            checked={contract.optInCalls}
                                                        />
                                                        <Checkbox
                                                            label="WhatsApp"
                                                            name="WhatsApp"
                                                            checked={contract.optInWhatsApp}
                                                        />
                                                    </div>
                                                  <div>
                                                      <p className='text-[11px]'>Allow SMS Outage Notifications</p>
                                                      <div key={i} className="grid grid-cols-2 gap-4 py-2 mb-5">
                                                          <Select disabled={true}>
                                                              <SelectTrigger className="w-[180px]">
                                                                  <SelectValue placeholder= {contract.optInOutageSmsDisplay}/>
                                                              </SelectTrigger>
                                                              <SelectContent>
                                                              </SelectContent>
                                                          </Select>
                                                      </div>
                                                  </div>
                                                    <div className="">
                                                        <h3 className='font-bold pb-2'>Access Details</h3>
                                                        <hr/>
                                                        <div key={i} className="grid grid-cols-2 gap-4 py-2">
                                                            <span className="font-light">Username: {contract.contactUsername}</span>
                                                            <span className='font-light'>Access Role: {contract.accessLevel}</span>
                                                        </div>
                                                        <div key={i} className="grid grid-cols-2 gap-4 py-2 mb-4">
                                                            <span className="font-light">Last Updated: {contract.lastUpdated}</span>
                                                        </div>

                                                        <div key={i} className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 py-2">
                                                            <Button className='mb-4 bg-[#255d7e] text-white' variant="outline">Edit Details</Button>
                                                            <Button className='mb-4 bg-[#255d7e] text-white' variant="outline">Change Password</Button>
                                                            <Button className='mb-4 bg-[#255d7e] text-white' variant="outline">Change OTP Number</Button>
                                                            {contract.accessLevel === 'Administrator Access' && (
                                                                <Button className='mb-4 bg-[#ED1C28] text-white' variant="outline">Delete User</Button>
                                                            )}
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        )
                    })}
                </div>

            </MwebSliceContainer>
        </>
    )

}
export default UserProfiles;
