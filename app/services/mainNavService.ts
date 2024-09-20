export interface IMainNavData {
    categories: INavCategory[]
    entries: IEntry[]
}

export interface INav {
    __typename: string;
    id: string;
    level: number;
    title: string;
    mainLink: boolean;
    targetUrl: null | string;
    analyticsId: string;
    externalLink: boolean;
    mobileOnly: boolean;
    parent: null | INavParent;
}

export interface INavParent {
    __typename: string;
    id: string;
    tittle: string;
}

//
export interface INavCategory extends INav {
    categories: INav[];
}

export interface INavEntry {
    entries: INavEntry[];
}

export interface IEntry {
    __typename: string;
    miniCartHeading: string;
    miniCartHeadingEmptyCart: string;
    miniCartSummaryEmptyCart: string;
    agentLoginNotice?: string;
}

//Retrieving the main navigation data from the mweb GraphQL CMS server and returning it as an array of INavCategory objects.
async function getMainNavContent(): Promise<IMainNavData> {
    // an empty object to hold the returned data
    let mainNavData: IMainNavData = { categories: [], entries: []};

    try {
        // creating header constant that specifies the type of content that is being added to the request content
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        //creating a Graphql query string for retrieving the navigation data
        var graphql = JSON.stringify({
            query: `query MainNav {
                      categories(group: "mainNavigation") {
                              ... on mainNavigation_Category {
                                      id
                                      level
                                      title
                                      mainLink
                                      targetUrl
                                      analyticsId
                                      externalLink
                                      mobileOnly
                                      parent {
                                              ... on mainNavigation_Category {
                                                      id
                                                      title 
                                              }
                                      }
                              }
                      }
                      entries(
                        section: "checkoutJourneys"
                        slug: "agent-login-notice"
                      ) {
                          ...on checkoutJourneys_agentLoginNotice_Entry {
                              __typename
                              agentLoginNotice
                          }
                      }
                    }`,
            variables: {},
        });
        // Get revalidate time from ENV, with fallback to 5 mins if not found
        const revalidateTime = parseInt('60', 10);
        // making an API request to the GraphQL server
        const response = await fetch(`https://apigw.mwebaws.co.za/portal/graphql`, {
            method: 'POST',
            headers: myHeaders,
            body: graphql,
            redirect: 'follow',
            next: { revalidate: revalidateTime },
        });

        const results = await response.json();

        // extracting nav data
        const mainNavCategories: INav[] = results.data.categories ?? [];
        const mainNavEntries: IEntry[] = results.data.entries ?? [];

        // transforming data to match Component Props interfaces
        const mainNavContent: INavCategory[] = mainNavCategories
            .filter(
                (navItem) => navItem.level === 1 // level 1 category
            )
            .map((currentNavItem) => {
                //   extend Type to Component Props Interface
                const mainNavSection: INavCategory = {
                    ...currentNavItem,
                    categories: [],
                };

                // update categories
                for (var navItem of mainNavCategories) {
                    if (navItem.parent?.id === currentNavItem.id) {
                        mainNavSection.categories.push(navItem);
                    }
                }

                return mainNavSection;
            });

        // update response value
        mainNavData = { categories: mainNavContent, entries: mainNavEntries};
    } catch (error) {
        console.log(`\n---\nmainNavbar service failed due to: \n ${error} \n`);
    }

    //returning the main data to be exported
    return mainNavData;
}

export { getMainNavContent };
