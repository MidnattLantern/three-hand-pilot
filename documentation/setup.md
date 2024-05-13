1. In a blank workspace/ repository, run in terminal:
`npx create-react-app . --use-npm`

2. Run in terminal:
`cd .`

To run the app, run in terminal:
`npm start`

3. Commit and push to Github

4. Create a Heroku app, and write down the deployed URL
Deployed URL: https://flynarc-7dcb289109f4.herokuapp.com/

Bootstrap
---
Flynarc use React-bootstrap for styling shortcuts.
5. To set up, run in terminal:
`npm install react-bootstrap bootstrap@4.6.0`

6. Inside the public directory, in index.html, add this to line 17:
`
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
      crossorigin="anonymous"
    />
`

7. update the manifest link to this:
`<link rel="manifest" href="%PUBLIC_URL%/manifest.json" crossorigin="user-credentials" />`

8. You can test if the React-Bootstrap is wired by importing this to App.js
`import Button from "react-bootstrap/Button";`
Then this in the render view:
`<Button>bootstrap button</Button>`

Routing
---
Flynarc use a long term supported version of react-router-dom to display different content depending on the url. To setup:
1. Run in terminal:
`npm install react-router-dom@5.3.0`

2. In index.js, import:
`import {BrowserRouter as Router} from 'react-router-dom'`

3. In index.js wrap <App /> with <Router></Router>`

4. In any file that use the routing, such as App.js, import:
`import {Route, Switch} from 'react-router-dom';`

5. Create a <Switch></Switch> and a `<Route exact path="/" render={() => {}} />` for each destination.


API
---
1. Run in terminal:
`npm install axios`

2. Createa an "api" directory inside src, and a file: `axiosDefaults.js`

3. add the following content:
`
import axios from "axios";

axios.defaults.baseURL = 'https://flynarc-api-824d94b4a80f.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true;
`

4. Inside App.js, import `import './api/axiosDefaults';`