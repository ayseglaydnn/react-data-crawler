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


function App() {

  const navigate = useNavigate();

  const [appUser, setAppUser] = useState<LocalUser | undefined>(undefined);

  useEffect(() => {

      const jwtJson = localStorage.getItem("upstorage_user");

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


  }, []);

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
                {/* <Route path="/accounts" element={
                    <ProtectedRoute>
                        <AccountsPage />
                    </ProtectedRoute>
                }/>
                <Route path="/accounts/add" element={
                    <ProtectedRoute>
                        <AccountsAddPage />
                    </ProtectedRoute>
                }/> */}
                <Route path="/settings" element={
                    <ProtectedRoute>
                        <SettingsPage />
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