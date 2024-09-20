'use client'
import Link from "next/link"
import {useEffect, useState} from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useRouter} from 'next/navigation';
interface iProps {
  pageContent: ILogin;
  isLoginLoading: boolean;
  handleChange: (val: any) => void;
}
export interface ILogin {
  siteLoginPageHeading: string
  siteLoginHeading: string
  siteLoginSummary: string
  siteLoginCtaText: string
  siteLoginForgotPasswordLinkText: string

  securityVerificationAccessOptionFullAccessCtaText: string
  securityVerificationAccessOptionRestrictedCtaText: string
  securityVerificationAccessOptionHeading: string
  securityVerificationAccessOptionSummary: string

  siteLoginFailedLoginHeading?: string
  siteLoginFailedLoginSummary?: string
}
export interface ILoginDetails {
  username: string;
  password: string;
}

const LoginDetails: ILoginDetails = {
  username: '',
  password: '',
};
export function LoginForm(props: iProps) {
  const {pageContent, isLoginLoading, handleChange} = props;
  // const {siteLoginCtaText, siteLoginForgotPasswordLinkText} = pageContent;
  const router = useRouter();

  const [loginDetails, setLoginDetails] = useState<ILoginDetails>(LoginDetails);
  const [isDisabled, disableLoginButton] = useState<boolean>(true);
  const [isCtaLoading, setCtaLoading] = useState<boolean>(false);
  const [showPassword, setshowPassword] = useState<boolean>(false);
  const [isMFAEnabled, setCanMFA] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<any>({
    isVerificationLoading: false,
    isLoginLoading: false,
    isForgotPasswordCta: false,
  });
  const [modalState, setModalState] = useState<any>({
    ShowRestrictedAccessPopup: false,
    ShowOTPVerificationPopup: false,
    ShowUnregisteredOTPPopup: false,
    ShowFailedLoginPopup: false,
  });
  useEffect(() => {
    disableLoginButton(validateData(loginDetails));
  }, [loginDetails]);

  function onBtnClick() {
    console.log('loginDetails', loginDetails)
    handleLogin(loginDetails);
  }
  async function logIn({ username, password }: { username: string, password: string }) {
    const myBody = {
      passwd: password,
      user_id: username
    }
    const apiProxyUrl = `https://apigw.mwebaws.co.za/dev/baas/proxy/authentication/customer/login?includeUserProfile=true`;
    const responseData = await fetch(apiProxyUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(myBody),
    });
    return await responseData.json()
  }
  async function getCustomerAccount() {
    const apiProxyUrl = `https://apigw.mwebaws.co.za/dev/baas/proxy/customer/accounts`;
    const responseData = await fetch(apiProxyUrl, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },

    });
    return responseData.json()


  }
  function handleLogin(userDetails: any) {
    setLoadingState({ ...loadingState, isLoginLoading: true });
    logIn(userDetails)
        .then((response) => {
          const authenticatedUser = response;
          const customerAccountLite = authenticatedUser?.userProfile;
          if (customerAccountLite) {
            localStorage.setItem(
                "authenticateduser",
                JSON.stringify(authenticatedUser)
            );
            localStorage.setItem(
                "customerAccountLite",
                JSON.stringify(customerAccountLite)
            );
            getCustomerAccount()
                .then((customerResponse) => {
                  if (customerResponse) {
                    localStorage.setItem(
                        "customerAccount",
                        JSON.stringify(customerResponse)
                    );
                    setCanMFA(customerAccountLite?.canMFA);
                    const canMFA = customerAccountLite?.canMFA;

                    setModalState({
                      ...modalState,
                      ShowFailedLoginPopup: false,
                      ShowUnregisteredOTPPopup: !canMFA,
                      ShowRestrictedAccessPopup: canMFA,
                    });
                    // customerAccountLite?.canMFA ? getOtpRef(userDetails) : setModalState({ ...modalState, ShowFailedLoginPopup: false, ShowUnregisteredOTPPopup: true })
                    !customerAccountLite?.canMFA
                        ? setLoadingState({ ...loadingState, isLoginLoading: false })
                        : null;
                  } else {
                    setLoadingState({ ...loadingState, isLoginLoading: false });
                    setModalState({ ...modalState, ShowFailedLoginPopup: true });
                  }
                })
                .catch(() => {
                  setLoadingState({ ...loadingState, isLoginLoading: false });
                  setModalState({ ...modalState, ShowFailedLoginPopup: true });
                });
          } else {
            setLoadingState({ ...loadingState, isLoginLoading: false });
            setModalState({ ...modalState, ShowFailedLoginPopup: true });
          }
        })
        .catch((e) => {
          setLoadingState({ ...loadingState, isLoginLoading: false });
          // addAPIError({ text: 'Internal Server Error. Failed to validate user login details. Please try again!', errorType: 'error', id: `user-login-validation` })
        });
  }

  useEffect(() => {
    checkForMatchedAccount();
    window.addEventListener('matchedAccountEvent', () => {
      checkForMatchedAccount();
    });
  }, []);

  function checkForMatchedAccount() {
    const matchedAccountKey = window?.sessionStorage?.getItem('matchedAccount') || '';

    if (matchedAccountKey !== '') {
      const matchedAccount = JSON.parse(matchedAccountKey);

      setLoginDetails((loginState) => {
        return {
          ...loginState,
          username: matchedAccount.username ?? '',
        };
      });
    }
  }

  function validateData(formData: ILoginDetails): boolean {
    let isValid = false;
    Object.entries(formData).forEach((entry) => {
      const [key, value] = entry;
      if (value.length === 0) {
        isValid = true;
      }
    });
    return isValid;
  }

  let matchedAccountData:any;
  let matchedAccountJsonData:any;
  let username;

  if (typeof window !== 'undefined') {
    matchedAccountData = localStorage.getItem('matchedAccount');
    if (matchedAccountData) {
      matchedAccountJsonData = JSON.parse(matchedAccountData);

      if (matchedAccountJsonData) {
        username = matchedAccountJsonData?.username ?? '';
      }
    }
  }
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email" >Username</Label>
            <Input
                id="email"
                type="email"
                placeholder=""
                required
                onChange={(val: any) => setLoginDetails({ ...loginDetails, ['username']: val.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input
                id="password"
                type="password"
                required
                onChange={(val: any) => setLoginDetails({ ...loginDetails, ['password']: val.target.value })}
            />
          </div>
          <Button 	onClick={() => onBtnClick()} type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
