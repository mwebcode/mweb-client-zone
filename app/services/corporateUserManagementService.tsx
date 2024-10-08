

export async function getCustomerAccount(contract:any) {
    const apiProxyUrl = `https://apigw.mwebaws.co.za/baas/customer/account/impersonate/${contract.accountId}`;
    const responseData = await fetch(apiProxyUrl, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-type': 'application/json',
        },

    });
    return responseData.json()


}
