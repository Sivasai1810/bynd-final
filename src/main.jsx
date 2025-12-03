import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Login from './auth/login.jsx';
import Dashboard from './dashboard/dashboard.jsx';
import SignUp from './auth/sign.jsx';
import Welcome from './auth/welcome.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Analytics from './component/Analytics/analytics.jsx'
import SuccessModal from './component/SuccessModal/SuccessModal.jsx';
import Pricingtable from "./pricingtable/pricingtable.jsx"
import ChangeEmail from "./component/changepassword/changemail.jsx"
import DesignPreview from './component/employersview/employersview.jsx';
import Lang from './lang.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<App />} />
         <Route path="/analytics" element={<Analytics />} />
         <Route path="/Welcome" element={<Welcome />}  />
         <Route path="/SuccessModal" element={<SuccessModal />}/>
         <Route path="/ChangeEmail" element={<ChangeEmail />}/>
         <Route path="/Pricingtable" element={<Pricingtable />}/>
         <Route path="/Lang" element={<Lang/>}/>
           {/* <Route path="/designpreview" element={<DesignPreview/>}/> */}
           <Route path="/designpreview/:uniqueId" element={<DesignPreview />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
);



