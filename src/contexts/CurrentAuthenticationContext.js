import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router";

export const CurrentAuthenticationContext = createContext();
export const setCurrentAuthenticationContext = createContext();

export const useCurrentAuthentication = () => useContext(CurrentAuthenticationContext);
export const useSetCurrentAuthentication = () => useContext(setCurrentAuthenticationContext);

export const CurrentAuthenticationProvider = ({children}) => {
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

    return (
      <CurrentAuthenticationContext.Provider value={currentAuthentication}>
          <setCurrentAuthenticationContext.Provider value={setCurrentAuthentication}>
            {children}
          </setCurrentAuthenticationContext.Provider>
      </CurrentAuthenticationContext.Provider>
    )
};
