General template, change according to your needs.

1. Run in terminal:
`npm install react-infinite-scroll-component`

2. Import `Infinitescroll` for any page that will fetch API data

3. Take for example:
`
{accountList.results.length ? (
    accountList.results.map((account) => (
        <p>test</p>
    ))
) : (<>Fetching...</>)}
`
Underneath `{accountList.results.length ? (` add:
`
<InfiniteScroll
    children={

    }
    dataLength={accountList.results.length}
    loader="Fetching..."
    hasMore={!!accountList.next}
    next={() => {}}
/>
`

4. Move inside children={}:
`
accountList.results.map((account) => (
    <p>test</p>
))
`

5. Create the directory and file: src > utils > utils.js

6. Paste the following code in utls.ks:
`
import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResource) => {
    try {
        const {data} = await axiosReq.get(resource.next)
        setResource(prevResource =>({
            ...prevResource,
            nenxt:data.next,
            results: data.results.reduce((acc, cur) => {
                return acc.some((accResult) => accResult.id === cur.id )
                ? acc
                : [...acc, cur];
            }, prevResource.results),
        }));
    } catch(err){

    }
};
`

7. Back in the file, replace the empty function for next with useState argumants inside "fetchMoreData":
`fetchMoreData(accountList, setAccountList)`