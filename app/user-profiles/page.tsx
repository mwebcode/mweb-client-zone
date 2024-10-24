"use client";
import React, {useState} from "react";
import {
    contractsMockedData,
    MockedCustomerAccountData,
    MockedCustomerAccountLite,
} from "@/app/corporate-user-management/mockedCustomerAccountData";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import MwebSliceContainer from "@/components/MwebSliceContainer";
import {Button} from "@/components/ui/button";
import {Select, SelectValue} from "@radix-ui/react-select";
import {SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select";
import {DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Dialog, DialogTrigger} from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import {Checkbox} from "@/components/ui/checkbox";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
});

const UserProfiles: React.FC = () => {
    // const Checkbox = ({ label, name, checked, onChange }: any) => (
    //     <label className="custom-checkbox flex">
    //         <input
    //             type="checkbox"
    //             name={name}
    //             checked={checked}
    //             onChange={onChange}
    //         />
    //         <span className="checkmark bg-accent"></span>
    //         {label}
    //     </label>
    // );
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState<boolean>(false);
    const [isChangeOtpDialogOpen, setIsChangeOtpDialogOpen] = useState<boolean>(false);
    const [isDeleteUserDialogOpen, setIsDeleteUserDialogOpen] = useState<boolean>(false);
    const [isAddUserProfileDialogOpen, setIsAddUserProfileDialogOpen] = useState<boolean>(false);


    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    // Managing each password input's state separately
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
    const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible);


    // Defining state variables for each input

    const [workNumber, setWorkNumber] = useState('');
    const [homeNumber, setHomeNumber] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [initials, setInitials] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [userProfilePassword, setUserProfilePassword] = useState('');
    const [userProfilePasswordConfirm, setUserProfilePasswordConfirm] = useState('');

    const form: any = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    const [workNumbers, setWorkNumbers] = useState<any>({});
    const [homeNumbers, setHomeNumbers] = useState<any>({});
    const [mobileNumbers, setMobileNumbers] = useState<any>({});
    const [userEmails, setUserEmails] = useState<any>({});
    const handleWorkNumberInputChange = (index:number, value:string) => {
        setWorkNumbers((prev:any) => ({
            ...prev,
            [index]: value,
        }));
    };


    const handleHomeNumberInputChange = (index:number, value:string) => {
        setHomeNumbers((prev:any) => ({
            ...prev,
            [index]: value,
        }));
    }
    const handleMobileNumberInputChange = (index:number, value:string) => {
        setMobileNumbers((prev:any) => ({
            ...prev,
            [index]: value,
        }));
    }

    const handleEmailInputChange = (index:number, value:string) => {
        setUserEmails((prev:any) => ({
            ...prev,
            [index]: value,
        }));
    }
    const handleIconClick = (index:number) => {
        setIsDialogOpen(true);
    };
    const closeDialog = () => {
        setIsDialogOpen(false);
    };
    const handleChangePassword = () => {
        setIsPasswordDialogOpen(true);
    }
    const handleChangeOtpNumber = () => {
        setIsChangeOtpDialogOpen(true);
    }
    const handleDeleteUser = () => {
        setIsDeleteUserDialogOpen(true);
    }
    const handleAdderUserProfile = () => {
        setIsAddUserProfileDialogOpen(true);
    }

    const  customerAccount = MockedCustomerAccountData;
    const accessLevelPermissions = MockedCustomerAccountLite.accessPermissions;
    console.log('accessLevelPermissions:::', accessLevelPermissions);
    console.log('MockedCustomerAccountLite::', MockedCustomerAccountLite);

    return (
        <>
            <MwebSliceContainer
                sectionId='corporate-user-management'
                bgColor=''
                padding='px-4 py-14 md:px-20 md:py-18 desktop:px-[182px] desktop:py-24'

            >
                <div className="w-full max-w-[1024px] mx-auto items-center">
                    <button className="back-button mb-8 text-primary" onClick={() => {}}>Back to My Service Accounts</button>
                    <div className='mb-6'>
                        <h2 className='font-bold mb-4'>Managing User Profiles</h2>
                        <p>Add additional users and assign different access to help manage your Mweb accounts and products. Users can interact with your account both online and via our contact centre and will be considered to be acting on your behalf with the role that you have assigned to them.
                            Read more about user profiles and roles in this easy guide.</p>
                    </div>
                    <Button className='mb-4 bg-primary text-primary-foreground' variant="outline" onClick={() => {handleAdderUserProfile()}}>Add User Profile</Button>
                    {contractsMockedData.flatMap((contract:any,i) => {
                        return (
                            <>
                                <Accordion type="single" collapsible className=''>
                                    <AccordionItem value="item-1" className='px-4 mb-2'>
                                        <AccordionTrigger className='hover:no-underline'>{contract.contactDisplayName} ({contract.contactType !== 'None'? contract.contactType: contract.accessLevel}) ({contract.contactUsername})</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="">
                                                <h3 className='font-bold pb-2'>Personal Details</h3>
                                                <hr/>
                                                <div key={i} className="grid grid-cols-2 gap-4 py-2">
                                                    <span className="">Name: {contract.contactDisplayName}</span>
                                                    <span className=''>ID Number: {contract.contactIdNumber}</span>
                                                </div>
                                                <div key={i} className="grid grid-cols-2 gap-4 py-2 mb-5">
                                                    <span className="">Date Of Birth: {contract.contactBirthDate}</span>
                                                    <span className=''>Username: {contract.contactUsername}</span>
                                                </div>
                                                <div className="">
                                                    <h3 className='font-bold pb-2'>Contact Details</h3>
                                                    <hr/>
                                                    <div key={i} className="grid grid-cols-2 gap-4 py-2 ">
                                                        <span className="">Home Tel: {contract.contactHomeNumber}</span>
                                                        <span className=''>Mobile Number: {contract.contactCellNumber}</span>
                                                    </div>
                                                    <div key={i} className="grid grid-cols-2 gap-4 py-2 ">
                                                        <span className="">OTP Number: {contract.contactOtpNumber}</span>
                                                        <span className=''>Work Tel: {contract.contactWorkNumber}</span>
                                                    </div>
                                                    <div key={i} className="grid grid-cols-2 gap-4 py-2 mb-5 ">
                                                        <span className="">Email: {contract.contactEmailAddress}</span>
                                                        <span className='f'></span>
                                                    </div>
                                                    <div className="">
                                                        <h3 className='font-bold pb-2'>Notifications</h3>
                                                        <hr/>
                                                        <div key={i} className="grid grid-cols-2 gap-4 py-2">
                                                            <div className="flex gap-2 items-center">
                                                                <Checkbox
                                                                    id="email"
                                                                    name="email"
                                                                    checked={contract.optInEmails}
                                                                    // onCheckedChange={(checked) => console.log(checked)}
                                                                />
                                                                <label htmlFor="email">
                                                                    Email
                                                                </label>
                                                            </div>
                                                            <div className="flex gap-2 items-center">
                                                                <Checkbox
                                                                    id="sms"
                                                                    name="sms"
                                                                    checked={contract.optInSms}
                                                                    // onCheckedChange={(checked) => console.log(checked)}
                                                                />
                                                                <label htmlFor="sms">
                                                                    SMS
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div key={i} className="grid grid-cols-2 gap-4 py-2 mb-5">
                                                            <div className="flex gap-2 items-center">
                                                                <Checkbox
                                                                    id="call"
                                                                    name="call"
                                                                    checked={contract.optInCalls}
                                                                    // onCheckedChange={(checked) => console.log(checked)}
                                                                />
                                                                <label htmlFor="call">
                                                                    Call
                                                                </label>
                                                            </div>
                                                            <div className="flex gap-2 items-center">
                                                                <Checkbox
                                                                    id="whatsApp"
                                                                    name="whatsApp"
                                                                    checked={contract.optInWhatsApp}
                                                                    // onCheckedChange={(checked) => console.log(checked)}
                                                                />
                                                                <label htmlFor="whatsApp">
                                                                    Whatsapp
                                                                </label>
                                                            </div>

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
                                                                <Button className='mb-4 bg-primary text-primary-foreground ' variant="outline" onClick={() => {handleIconClick(i)}}>Edit Details</Button>
                                                                <Button className='mb-4 bg-primary text-primary-foreground ' variant="outline" onClick={() => {handleChangePassword()}}>Change Password</Button>
                                                                <Button className='mb-4 bg-primary text-primary-foreground' variant="outline" onClick={() => {handleChangeOtpNumber()}}>Change OTP Number</Button>
                                                                {contract.accessLevel === 'Administrator Access' && (
                                                                    <Button className='mb-4 bg-destructive hover:bg-destructive hover:text-primary-foreground text-primary-foreground' variant="outline" onClick={() => {handleDeleteUser()}}>Delete User</Button>
                                                                )}
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                                <DialogTrigger asChild>
                                                    <button style={{ display: 'none' }}>Open</button>
                                                </DialogTrigger>
                                                <DialogContent className='bg-primary-foreground'>
                                                    <DialogHeader>
                                                        <DialogTitle>Admin User profile - {contract?.contactDisplayName}</DialogTitle>
                                                        <DialogDescription>
                                                            <Accordion type="single" collapsible>
                                                                <AccordionItem value="item-1">
                                                                    <AccordionTrigger className='font-bold hover:no-underline'>Personal Details</AccordionTrigger>
                                                                    <AccordionContent>
                                                                        <div className="network-provider-details">
                                                                            <div key={i} className="provider-detail">
                                                                                <h4 className='mb-4'> Display Name: {contract.contactDisplayName}</h4>
                                                                                <h4 className='mb-4'>ID Number Type: {contract.contactIdNumberType}</h4>
                                                                                <h4 className='mb-4'>ID Number:  {contract.contactIdNumber}</h4>
                                                                                <h4 className='mb-4'>Date Of Birth:  {contract.contactBirthDate}</h4>
                                                                            </div>

                                                                        </div>
                                                                    </AccordionContent>
                                                                </AccordionItem>
                                                                <AccordionItem value="item-2">
                                                                    <AccordionTrigger className='font-bold hover:no-underline'>Contact Details</AccordionTrigger>
                                                                    <AccordionContent>
                                                                        <div className="network-provider-details">
                                                                            <div key={i} className=" mb-4">
                                                                                <p>Work Number</p>
                                                                                <div className="flex w-full max-w-sm items-center space-x-2">
                                                                                    <Input
                                                                                        type="text"
                                                                                        placeholder="Enter work number"
                                                                                        value={workNumbers[i] !== undefined ? workNumbers[i] : contract.contactWorkNumber}
                                                                                        onChange={(e) => handleWorkNumberInputChange(i, e.target.value)}
                                                                                    />
                                                                                    {/*<Input type="text" placeholder="" value={workNumbers[i] || contract.contactWorkNumber} onChange={(e) => handleInputChange(i, e.target.value)} />*/}
                                                                                </div>
                                                                            </div>
                                                                            <div key={i} className=" mb-4">
                                                                                <p>Home number</p>
                                                                                <div className="flex w-full max-w-sm items-center space-x-2">
                                                                                    <Input
                                                                                        type="text"
                                                                                        placeholder="Enter home number"
                                                                                        value={homeNumbers[i] !== undefined ? homeNumbers[i] : contract.contactHomeNumber}
                                                                                        onChange={(e) => handleHomeNumberInputChange(i, e.target.value)}
                                                                                    />
                                                                                    {/*<Input type="text" placeholder="" value={homeNumber} onChange={(e) => setHomeNumber(e.target.value)} />*/}
                                                                                </div>
                                                                            </div>
                                                                            <div key={i} className=" mb-4">
                                                                                <p>Mobile Number</p>
                                                                                <div className="flex w-full max-w-sm items-center space-x-2">
                                                                                    <Input
                                                                                        type="text"
                                                                                        placeholder="Enter mobile number"
                                                                                        value={mobileNumbers[i] !== undefined ? mobileNumbers[i] : contract.contactCellNumber}
                                                                                        onChange={(e) => handleMobileNumberInputChange(i, e.target.value)}
                                                                                    />
                                                                                    {/*<Input type="text" placeholder="" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value) } />*/}
                                                                                </div>
                                                                            </div>
                                                                            <div key={i} className=" mb-4">
                                                                                <p>Email Address</p>
                                                                                <div className="flex w-full max-w-sm items-center space-x-2">
                                                                                    <Input
                                                                                        type="email"
                                                                                        placeholder="Enter your email"
                                                                                        value={userEmails[i] !== undefined ? userEmails[i] : contract.contactEmailAddress}
                                                                                        onChange={(e) => handleEmailInputChange(i, e.target.value)}
                                                                                    />
                                                                                    {/*<Input type="email" placeholder="" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value) } />*/}
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </AccordionContent>
                                                                </AccordionItem>
                                                                <AccordionItem value="item-3">
                                                                    <AccordionTrigger className='font-bold hover:no-underline'>Notifications</AccordionTrigger>
                                                                    <AccordionContent>
                                                                        <div className="network-provider-details mb-4">
                                                                            <div key={i} className="grid grid-cols-2 gap-4 py-2">
                                                                                <div className="flex gap-2 items-center">
                                                                                    <Checkbox
                                                                                        id="email"
                                                                                        name="email"
                                                                                        checked={contract.optInEmails}
                                                                                        onCheckedChange={(checked) => console.log(checked)}
                                                                                    />
                                                                                    <label htmlFor="email">
                                                                                        Email
                                                                                    </label>
                                                                                </div>
                                                                                <div className="flex gap-2 items-center">
                                                                                    <Checkbox
                                                                                        id="sms"
                                                                                        name="sms"
                                                                                        checked={contract.optInSms}
                                                                                        onCheckedChange={(checked) => console.log(checked)}
                                                                                    />
                                                                                    <label htmlFor="sms">
                                                                                        SMS
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                            <div key={i} className="grid grid-cols-2 gap-4 py-2 mb-5">
                                                                                <div className="flex gap-2 items-center">
                                                                                    <Checkbox
                                                                                        id="call"
                                                                                        name="call"
                                                                                        checked={contract.optInCalls}
                                                                                        onCheckedChange={(checked) => console.log(checked)}
                                                                                    />
                                                                                    <label htmlFor="call">
                                                                                        Call
                                                                                    </label>
                                                                                </div>
                                                                                <div className="flex gap-2 items-center">
                                                                                    <Checkbox
                                                                                        id="whatsApp"
                                                                                        name="whatsApp"
                                                                                        checked={contract.optInWhatsApp}
                                                                                        onCheckedChange={(checked) => console.log(checked)}
                                                                                    />
                                                                                    <label htmlFor="whatsApp">
                                                                                        Whatsapp
                                                                                    </label>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                        <h3>Service Notifications</h3>
                                                                        <div className='mb-4'>
                                                                            <p className='text-[11px]'>Allow SMS Outage Notifications</p>
                                                                            <div key={i} className="grid grid-cols-2 gap-4 py-2 mb-5">
                                                                                <Select>
                                                                                    <SelectTrigger className="w-[180px]">
                                                                                        <SelectValue placeholder={contract.optInOutageSmsDisplay} />
                                                                                    </SelectTrigger>
                                                                                    <SelectContent>
                                                                                        <SelectItem value="no">No</SelectItem>
                                                                                        <SelectItem value="inclHours">Yes - Incl Restricted hours</SelectItem>
                                                                                        <SelectItem value="exclHours">Yes - Excl Restricted hours</SelectItem>
                                                                                    </SelectContent>
                                                                                </Select>
                                                                            </div>
                                                                        </div>
                                                                        <p>Please note restricted hours are between 22:00 and 07:00</p>
                                                                    </AccordionContent>
                                                                </AccordionItem>
                                                            </Accordion>
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter>
                                                        <Button type="submit" onClick={() => {setIsDialogOpen(false)}}>Save</Button>
                                                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
                                                    </DialogFooter>
                                                    {/*<DialogFooter>*/}
                                                    {/*    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Save</Button>*/}
                                                    {/*    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>*/}
                                                    {/*</DialogFooter>*/}
                                                </DialogContent>
                                            </Dialog>




                                            <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                                                <DialogTrigger asChild>
                                                    <button style={{ display: 'none' }}>Open</button>
                                                </DialogTrigger>
                                                <DialogContent className='bg-primary-foreground'>
                                                    <DialogHeader>
                                                        <DialogTitle>Edit User Profile Password - {contract?.contactDisplayName}</DialogTitle>
                                                        <DialogDescription>
                                                        </DialogDescription>
                                                        <Form {...form}>
                                                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                                                {/* New Password Field */}
                                                                <FormField
                                                                    control={form.control}
                                                                    name="newPassword"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel>New Password</FormLabel>
                                                                            <FormControl>
                                                                                <div style={{ position: 'relative' }}>
                                                                                    <Input
                                                                                        type={isPasswordVisible ? 'text' : 'password'}
                                                                                        // value={newPassword}
                                                                                        // onChange={(e) => setNewPassword(e.target.value)}
                                                                                        placeholder=""
                                                                                        {...field}
                                                                                    />
                                                                                    <button
                                                                                        type="button"
                                                                                        onClick={togglePasswordVisibility}
                                                                                        style={{
                                                                                            position: 'absolute',
                                                                                            right: '10px',
                                                                                            top: '50%',
                                                                                            transform: 'translateY(-50%)',
                                                                                            background: 'none',
                                                                                            border: 'none',
                                                                                            cursor: 'pointer',
                                                                                        }}
                                                                                    >
                                                                                        {isPasswordVisible ? (
                                                                                            <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                                                                                        ) : (
                                                                                            <EyeIcon className="h-5 w-5 text-gray-500" />
                                                                                        )}
                                                                                    </button>
                                                                                </div>
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />

                                                                {/* Confirm Password Field */}
                                                                <FormField
                                                                    control={form.control}
                                                                    name="confirmPassword"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel>Confirm New Password</FormLabel>
                                                                            <FormControl>
                                                                                <div style={{ position: 'relative' }}>
                                                                                    <Input
                                                                                        type={isConfirmPasswordVisible ? 'text' : 'password'}
                                                                                        // value={confirmPassword}
                                                                                        // onChange={(e) => setConfirmPassword(e.target.value)}
                                                                                        placeholder=""
                                                                                        {...field}
                                                                                    />
                                                                                    <button
                                                                                        type="button"
                                                                                        onClick={toggleConfirmPasswordVisibility}
                                                                                        style={{
                                                                                            position: 'absolute',
                                                                                            right: '10px',
                                                                                            top: '50%',
                                                                                            transform: 'translateY(-50%)',
                                                                                            background: 'none',
                                                                                            border: 'none',
                                                                                            cursor: 'pointer',
                                                                                        }}
                                                                                    >
                                                                                        {isConfirmPasswordVisible ? (
                                                                                            <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                                                                                        ) : (
                                                                                            <EyeIcon className="h-5 w-5 text-gray-500" />
                                                                                        )}
                                                                                    </button>
                                                                                </div>
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                            </form>
                                                        </Form>
                                                    </DialogHeader>
                                                    <DialogFooter>
                                                        <Button type="submit" onClick={() => {setIsPasswordDialogOpen(false)}}>Save</Button>
                                                        <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>Close</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                            <Dialog open={isChangeOtpDialogOpen} onOpenChange={setIsChangeOtpDialogOpen}>
                                                <DialogTrigger asChild>
                                                    <button style={{ display: 'none' }}>Open</button>
                                                </DialogTrigger>
                                                <DialogContent className='bg-primary-foreground'>
                                                    <DialogHeader>
                                                        <DialogTitle className='mb-4'>Change One Time Pin - {contract?.contactDisplayName}</DialogTitle>
                                                        <DialogDescription className='mb-5'>
                                                            All interactions with Mweb are secured by two factor authentication using One Time Pin’s (OTP). Please enter a valid mobile number for this user and click on Request pin to complete the process.
                                                        </DialogDescription>
                                                        <Form {...form}>
                                                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                                                <FormField
                                                                    control={form.control}
                                                                    name="phone"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel>Mobile Number</FormLabel>
                                                                            <FormControl>
                                                                                <Input type='text' placeholder="" {...field} />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>

                                                                    )}
                                                                />
                                                            </form>
                                                        </Form>
                                                    </DialogHeader>
                                                    <DialogFooter>
                                                        <Button type="submit" onClick={() => {setIsChangeOtpDialogOpen(false)}}>Save</Button>
                                                        <Button variant="outline" onClick={() => setIsChangeOtpDialogOpen(false)}>Close</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>


                                            <Dialog open={isDeleteUserDialogOpen} onOpenChange={setIsDeleteUserDialogOpen}>
                                                <DialogTrigger asChild>
                                                    <button style={{ display: 'none' }}>Open</button>
                                                </DialogTrigger>
                                                <DialogContent className='bg-primary-foreground'>
                                                    <DialogHeader className='mb-5'>
                                                        <DialogTitle className='mb-5'>Confirmation - {contract?.contactDisplayName}</DialogTitle>
                                                        <DialogDescription className='mb-5'>
                                                            Are you sure you want to delete this User Profile?
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter>
                                                        <Button type="submit" onClick={() => {setIsDeleteUserDialogOpen(false)}}>Delete User Profile</Button>
                                                        <Button variant="outline" onClick={() => setIsDeleteUserDialogOpen(false)}>Close</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>



                                {/*Add User Profile*/}
                                <div>
                                    <Dialog open={isAddUserProfileDialogOpen} onOpenChange={setIsAddUserProfileDialogOpen}>
                                        <DialogTrigger asChild>
                                            <button style={{ display: 'none' }}>Open</button>
                                        </DialogTrigger>
                                        <DialogContent className='bg-primary-foreground' style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                                            <DialogHeader>
                                                {/*<DialogTitle>{data?.dialogTitle} Settings - {data?.username}</DialogTitle>*/}
                                                <DialogDescription>
                                                    <Accordion type="single" collapsible>
                                                        <AccordionItem value="item-1">
                                                            <AccordionTrigger className='font-bold hover:no-underline'>Personal Details</AccordionTrigger>
                                                            <AccordionContent>
                                                                <div className="network-provider-details">
                                                                    <div className="mb-4">
                                                                        <p>First Name</p>
                                                                        <div className="flex w-full max-w-sm items-center space-x-2">
                                                                            <Input
                                                                                type="text"
                                                                                placeholder=""
                                                                                value={firstName}
                                                                                onChange={(e) => setFirstName(e.target.value)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="mb-4">
                                                                        <p>Last Name</p>
                                                                        <div className="flex w-full max-w-sm items-center space-x-2">
                                                                            <Input
                                                                                type="text"
                                                                                placeholder=""
                                                                                value={lastName}
                                                                                onChange={(e) => setLastName(e.target.value)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="mb-4">
                                                                        <p>Initials</p>
                                                                        <div className="flex w-full max-w-sm items-center space-x-2">
                                                                            <Input
                                                                                type="text"
                                                                                placeholder=""
                                                                                value={initials}
                                                                                onChange={(e) => setInitials(e.target.value)}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="mb-4">
                                                                        <p>Work Number</p>
                                                                        <div className="flex w-full max-w-sm items-center space-x-2">
                                                                            <Input
                                                                                type="text"
                                                                                placeholder=""
                                                                                value={workNumber}
                                                                                onChange={(e) => setWorkNumber(e.target.value)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="mb-4">
                                                                        <p>Mobile Number</p>
                                                                        <div className="flex w-full max-w-sm items-center space-x-2">
                                                                            <Input
                                                                                type="text"
                                                                                placeholder=""
                                                                                value={mobileNumber}
                                                                                onChange={(e) => setMobileNumber(e.target.value)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="mb-4">
                                                                        <p>Home number</p>
                                                                        <div className="flex w-full max-w-sm items-center space-x-2">
                                                                            <Input
                                                                                type="text"
                                                                                placeholder=""
                                                                                value={homeNumber}
                                                                                onChange={(e) => setHomeNumber(e.target.value)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="mb-4">
                                                                        <p>OTP Number</p>
                                                                        <div className="flex w-full max-w-sm items-center space-x-2">
                                                                            <Input
                                                                                type="text"
                                                                                placeholder=""
                                                                                value={mobileNumber}
                                                                                onChange={(e) => setMobileNumber(e.target.value)}
                                                                            />
                                                                            <Button variant="outline">Request Pin</Button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="mb-4">
                                                                        <p>Email Address</p>
                                                                        <div className="flex w-full max-w-sm items-center space-x-2">
                                                                            <Input
                                                                                type="email"
                                                                                placeholder=""
                                                                                value={emailAddress}
                                                                                onChange={(e) => setEmailAddress(e.target.value)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className='mb-4'>
                                                                        <p >ID Number Type</p>
                                                                        <div key={i} className="grid grid-cols-2 gap-4 py-2 mb-5">
                                                                            <Select>
                                                                                <SelectTrigger className="w-[180px]">
                                                                                    <SelectValue placeholder={''} />
                                                                                </SelectTrigger>
                                                                                <SelectContent>
                                                                                    <SelectItem value="rsaIdNumber">RSA ID Number</SelectItem>
                                                                                    <SelectItem value="passport">Passport</SelectItem>
                                                                                </SelectContent>
                                                                            </Select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="mb-4">
                                                                        <p>ID number</p>
                                                                        <div className="flex w-full max-w-sm items-center space-x-2">
                                                                            <Input
                                                                                type="text"
                                                                                placeholder=""
                                                                                value={idNumber}
                                                                                onChange={(e) => setIdNumber(e.target.value)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="mb-4">
                                                                        <p>Date of Birth</p>
                                                                        <div className="flex w-full max-w-sm items-center space-x-2">
                                                                            <Input
                                                                                type="date"
                                                                                placeholder=""
                                                                                value={dateOfBirth}
                                                                                onChange={(e) => setDateOfBirth(e.target.value)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </AccordionContent>
                                                        </AccordionItem>

                                                        <AccordionItem value="item-2">
                                                            <AccordionTrigger className='font-bold hover:no-underline'>Authentication Details</AccordionTrigger>
                                                            <AccordionContent>
                                                                <div className='mb-4'>
                                                                    <p className=''>Access Level</p>
                                                                    <div key={i} className="grid grid-cols-2 gap-4 py-2 mb-5">
                                                                        <Select>
                                                                            <SelectTrigger className="w-[180px]">
                                                                                <SelectValue placeholder='' />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectItem value="administrator">Administrator</SelectItem>
                                                                                <SelectItem value="invoiceReadOnly">Invoice Read Only</SelectItem>
                                                                                <SelectItem value="technical">Technical</SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </div>
                                                                </div>
                                                                <div className="mb-4">
                                                                    <p>Password</p>
                                                                    <div className="flex w-full max-w-sm items-center space-x-2">
                                                                        <Input
                                                                            type="password"
                                                                            placeholder=""
                                                                            value={userProfilePassword}
                                                                            onChange={(e) => setUserProfilePassword(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="mb-4">
                                                                    <p>Confirm Password</p>
                                                                    <div className="flex w-full max-w-sm items-center space-x-2">
                                                                        <Input
                                                                            type="password"
                                                                            placeholder=""
                                                                            value={userProfilePasswordConfirm}
                                                                            onChange={(e) => setUserProfilePasswordConfirm(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </AccordionContent>
                                                        </AccordionItem>

                                                        <AccordionItem value="item-3">
                                                            <AccordionTrigger className='font-bold hover:no-underline'>Notifications</AccordionTrigger>
                                                            <AccordionContent>
                                                                <div className="network-provider-details mb-4">
                                                                    <div key={i} className="grid grid-cols-2 gap-4 py-2">
                                                                        <div className="flex gap-2 items-center">
                                                                            <Checkbox
                                                                                id="email"
                                                                                name="email"
                                                                                // checked={contract.optInEmails}
                                                                                onCheckedChange={(checked) => console.log(checked)}
                                                                            />
                                                                            <label htmlFor="email">
                                                                                Email
                                                                            </label>
                                                                        </div>
                                                                        <div className="flex gap-2 items-center">
                                                                            <Checkbox
                                                                                id="sms"
                                                                                name="sms"
                                                                                // checked={contract.optInEmails}
                                                                                onCheckedChange={(checked) => console.log(checked)}
                                                                            />
                                                                            <label htmlFor="sms">
                                                                                SMS
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div key={i} className="grid grid-cols-2 gap-4 py-2 mb-5">
                                                                        <div className="flex gap-2 items-center">
                                                                            <Checkbox
                                                                                id="call"
                                                                                name="call"
                                                                                // checked={contract.optInEmails}
                                                                                onCheckedChange={(checked) => console.log(checked)}
                                                                            />
                                                                            <label htmlFor="call">
                                                                                Call
                                                                            </label>
                                                                        </div>
                                                                        <div className="flex gap-2 items-center">
                                                                            <Checkbox
                                                                                id="whatsApp"
                                                                                name="whatsApp"
                                                                                // checked={contract.optInEmails}
                                                                                onCheckedChange={(checked) => console.log(checked)}
                                                                            />
                                                                            <label htmlFor="whatsApp">
                                                                                Whatsapp
                                                                            </label>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <h3>Service Notifications</h3>
                                                                <div className='mb-4'>
                                                                    <p className='text-[11px]'>Allow SMS Outage Notifications</p>
                                                                    <div key={i} className="grid grid-cols-2 gap-4 py-2 mb-5">
                                                                        <Select>
                                                                            <SelectTrigger className="w-[180px]">
                                                                                <SelectValue placeholder={contract.optInOutageSmsDisplay} />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectItem value="no">No</SelectItem>
                                                                                <SelectItem value="inclHours">Yes - Incl Restricted hours</SelectItem>
                                                                                <SelectItem value="exclHours">Yes - Excl Restricted hours</SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </div>
                                                                </div>
                                                                <p>Please note restricted hours are between 22:00 and 07:00</p>
                                                            </AccordionContent>
                                                        </AccordionItem>
                                                    </Accordion>
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <Button variant="outline" onClick={() => setIsAddUserProfileDialogOpen(false)}>Save</Button>
                                                <Button variant="outline" onClick={() => setIsAddUserProfileDialogOpen(false)}>Close</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                {/*Add User Profile*/}
                            </>

                        )
                    })}
                </div>

            </MwebSliceContainer>
        </>
    )

}
export default UserProfiles;
