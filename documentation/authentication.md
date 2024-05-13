FLynarc use useContext to store information on whoever is authenticated

1. In App.js, make sure these are imported:
`import React, { createContext, useEffect, useState } from "react";`

2. In App.js, underneath the imports, create these contexts:
`export const CurrentAuthenticationContext = createContext();`
`export const setCurrentAuthenticationContext = createContext();`

3. inside `function App() {` create the useState and useMount:
`const [authentication, setAuthentication] = useState(null)`
`
const handleMount = async () => {
try {
    const {data} = await axios.get('dj-rest-auth/user/')
    setAuthentication(data)
} catch(err){
    console.log(err)
}
}
useEffect(() => {
handleMount()
}, []);
`

4. Wrap the entire <div> that makes up the return statement with:
`<setCurrentAuthenticationContext.Provider value={setAuthentication}></setCurrentAuthenticationContext.Provider>`

5. Wrap the entire return statement again with:
`<CurrentAuthenticationContext.Provider value={authentication}></CurrentAuthenticationContext.Provider>`

6. Any file that will set authentication, such as SignIn.js need to import useContext and:
`import { setCurrentAuthentication } from "../../App";`

7. In the case of SignInForm.js, add in `const SignInForm= () => `:
`const setAuthentication = useContext(setCurrentAuthenticationContext);`

8. In the case of SignInForm.js, add inside the try below `const {data} = await axios...`:
`setAuthentication(data.user)`

9. Any file that will need to know what user is signed in, should import:
`import { CurrentAuthenticationContext } from "../App";` and `{ useContext }`

10. Inside the const, add this:
`const CurrentAuthentication = useContext(CurrentAuthenticationContext)`

11. The authentication code have been transfered to src > contexts > CurrentAuthenticationContext.js but the code remain commented, while return statements are deleted.

12. Inside index.js import CurrentAuthenticationContext and wrap <App /> with <CurrentAuthenticationContext></CurrentAuthenticationContext>

13. Inside CurrentAuthenticationContext.js add these useContext:
`export const useCurrentAuthentication = () => useContext(CurrentAuthenticationContext)`
`export const useSetCurrentAuthentication = () => useContext(setCurrentAuthenticationContext)`

14. In SignInForm, replace `const setAuthentication =` with:
`const setAuthentication = useSetCurrentAuthentication();`

15. In NavBar, replace `const CurrentAuthentication =` with:
`const CurrentAuthentication = useCurrentAuthentication();`