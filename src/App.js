import "bootstrap-icons/font/bootstrap-icons.css";
import React, { Fragment, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { routes } from "./routes";
import { isJsonString } from "./utils";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "./redux/slides/userSlide";
import * as UserService from "./services/UserService";
import * as AdminService from "./services/AdminService";
import axios from "axios";
import { updateAdmin } from "./redux/slides/adminSlide";
function App() {
  // console.log('url', process.env.REACT_APP_API_URL_BACKEND)
  //   useEffect(()=>{
  //     fetchApi()
  //   }, [])

  //   const fetchApi = async () => {
  //     const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/product/get-all`);
  //     return res.data;
  // };

  //   const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })

  //   console.log('query', query)

  const dispatch = useDispatch();

  useEffect(() => {
    const { storageData, decoded } = handleDecoded();
    if (decoded?.isAdmin) {
      handleGetDetailsAdmin(decoded?.id, storageData);
    } else {
      handleGetDetailsUser(decoded?.id, storageData);
    }
  }, []);

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");

    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      const currentTime = new Date();
      const { decoded } = handleDecoded();
      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken();
        config.headers["token"] = `Bearer ${data?.access_token}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  AdminService.axiosJWT.interceptors.request.use(
    async (config) => {
      const currentTime = new Date();
      const { decoded } = handleDecoded();
      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await AdminService.refreshToken();
        config.headers["token"] = `Bearer ${data?.access_token}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleGetDetailsAdmin = async (id, token) => {
    const res = await AdminService.getDetailsAdmin(id, token);
    dispatch(updateAdmin({ ...res?.data, access_token: token }));
  };

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
