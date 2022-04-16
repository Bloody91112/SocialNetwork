import './App.css';
import React, { Suspense } from "react";
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeApp } from '../src/redux/app-reducer';
import Preloader from './components/common/preloader/Preloader';
import { AppStateType } from './redux/redux-store';
import News from './components/News/News';
import SettingsContainer from './components/Settings/SettingsContainer';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/footer/Footer';

const DialogsPage = React.lazy(() => import('./components/Dialogs/DialogsPage'))
const UsersPage = React.lazy(() => import('./components/users/UsersPage'))
const ProfilePage = React.lazy(() => import('./components/Profile/ProfilePage'))
const Login = React.lazy(() => import('./components/login/Login'))

const App = () => {

  const initialized = useSelector((state: AppStateType) => state.app.initialized)
  const testingMode = useSelector((state: AppStateType) => state.app.testingMode)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeApp())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!initialized) {
    return <Preloader />
  }
  return (
    <div className="app-wrapper">
      <Header />
      <div className='main'>
        <Navbar/>
        <div className={testingMode ? 'testingMode' : 'app-wrapper-content'}>
          <Suspense fallback={<Preloader />}>
            <Routes>
              <Route path="/" element={<ProfilePage />}>
                <Route path="/profile" element={<ProfilePage />}>
                  <Route path=":userId" element={<ProfilePage />} />
                </Route>
              </Route>
              <Route path="/dialogs" element={<DialogsPage />}>
                <Route path=":id" element={<DialogsPage />} />
              </Route>
              <Route path="/news" element={<News />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/settings" element={<SettingsContainer />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Suspense>
        </div>
      </div>
      <Footer />
    </div>
  )
}


export default App



