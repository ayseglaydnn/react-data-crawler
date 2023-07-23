import './App.css'
import { Container } from 'semantic-ui-react'
import {Route, Routes, useNavigate} from "react-router-dom"
import NotFoundPage from './pages/NotFoundPage'
import SettingsPage from './pages/SettingsPage.tsx'
import NavBar from './components/NavBar.tsx'
import LoginPage from './pages/LoginPage.tsx'
import { useEffect, useState } from 'react'
import { LocalJwt, LocalUser } from './types/AuthTypes.ts'
import { getClaimsFromJwt } from './utils/jwtHelper.ts'
import { AppUserContext } from './context/StateContext.tsx'
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import MainPage from './pages/MainPage.tsx'
import SocialLogin from './pages/SocialLogin.tsx'
import OrderAddPage from './pages/OrderAddPage.tsx'
import ProductPage from './pages/ProductPage.tsx'
import OrderEventPage from './pages/OrderEventPage.tsx'
import OrderPage from './pages/OrdersPage.tsx'
import CrawlerLivePage from './pages/CrawlerLivePage.tsx'
import NotificationPage from './pages/NotificationPage.tsx'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store/store.ts'
import { HubConnectionBuilder } from '@microsoft/signalr'
import { addNotification } from './store/features/notification/notificationSlice.ts'

const VITE_SIGNALR_URL = import.meta.env.VITE_SIGNALR_URL;

function App() {

  const navigate = useNavigate();

  const [appUser, setAppUser] = useState<LocalUser | undefined>(undefined);

  const dispatch = useDispatch();

  useEffect(() => {

      const jwtJson = localStorage.getItem("localUser");

      if (!jwtJson) {
          navigate("/login");
          return;
      }

      const localJwt: LocalJwt = JSON.parse(jwtJson);

      const {uid, email, given_name, family_name} = getClaimsFromJwt(localJwt.accessToken);

      const expires: string = localJwt.expires;

      setAppUser({
          id: uid,
          email,
          firstName: given_name,
          lastName: family_name,
          expires,
          accessToken: localJwt.accessToken
      });

      

    const hubConnection = new HubConnectionBuilder()
    .withUrl(`${VITE_SIGNALR_URL}/Hubs/NotificationHub`)
    .withAutomaticReconnect()
    .build();

    hubConnection.on('AppNotificationSended', (notification) => {
    dispatch(addNotification(notification));
    });

    hubConnection.start();

    return () => {
    hubConnection.stop();
    };

  }, [dispatch]);

  return (
    <>
        <AppUserContext.Provider value={{appUser, setAppUser}}>
            <ToastContainer/>
            <NavBar />
            <Container className="App">
                <Routes>
                    <Route path="/" element={
                        <ProtectedRoute>
                            <MainPage/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/orders" element={
                        <ProtectedRoute>
                            <OrderPage />
                        </ProtectedRoute>
                    }/>
                    <Route path="/orders/add" element={
                        <ProtectedRoute>
                            <OrderAddPage />
                        </ProtectedRoute>
                    }/>
                    <Route path="/settings" element={
                        <ProtectedRoute>
                            <SettingsPage />
                        </ProtectedRoute>
                    }/>
                    <Route path="/products/:orderId" element={
                        <ProtectedRoute>
                            <ProductPage />
                        </ProtectedRoute>
                    }/>
                    <Route path="/orderEvents/:orderId" element={
                        <ProtectedRoute>
                            <OrderEventPage />
                        </ProtectedRoute>
                    }/>
                    <Route path="/crawlerLive" element={
                        <ProtectedRoute>
                            <CrawlerLivePage />
                        </ProtectedRoute>
                    }/>
                    <Route path="/notificationPage" element={
                        <ProtectedRoute>
                            <NotificationPage />
                        </ProtectedRoute>
                    }/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/social-login" element={<SocialLogin/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </Container>
        </AppUserContext.Provider>
    </>
  )
}

export default App