Flynarc use access and refresh tokens to allow a user to be authenticated for longer than 5 minutes.

1. Inside api > axiosDefaults.js, export:
`export const axiosReq = axios.create();`
`export const axiosRes = axios.create();`

2. Inside CurrentAuthenticationContext.js, import useHistory, useMemo, and `import { axiosReq, axiosRes } from "../api/axiosDefaults"`

3. Following code is not neccessary to explain, paste the following code to CurrentAuthenticationContext.js:
`
    const [currentAuthentication, setCurrentAuthentication] = useState(null);
    const history = useHistory();

    const handleMount = async () => {
      try {
        const { data } = await axios.get('dj-rest-auth/user/');
        setCurrentAuthentication(data);
      } catch(err){
        console.log(err);
      }
    };

    useEffect(() => {
      handleMount();
    }, []);

    useMemo(() => {
      axiosReq.interceptors.response.use(
        async (config) => {
          try {
            await axios.post('/dj-rest-auth/token/refresh/');
          } catch(err) {
            setCurrentAuthentication((prevCurrentAuthentication) => {
              if (prevCurrentAuthentication) {
                history.push('/signin');
              }
              return null;
            });
            return config;
          }
          return config;
        },
        (err) => {
          return Promise.reject(err);
        }
      );

      axiosRes.interceptors.response.use(
        (response) => response,
        async (err) => {
          if (err.response?.status === 401) {
            try {
              await axios.post('/dj-rest-auth/token/refresh/');
            } catch (err) {
              setCurrentAuthentication((prevCurrentAuthentication) => {
                if (prevCurrentAuthentication) {
                  history.push('/signin');
                }
                return null;
              });
            }
            return axios(err.config);
          }
          return Promise.reject(err);
        }
      );
  }, [history]);
`

4. Add `const history = useHistory();` underneath useState for authentication.