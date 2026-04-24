import ReactDOM from 'react-dom/client'; // Import ReactDOM
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import Router
import { Auth0Provider } from "@auth0/auth0-react"; // Import Auth0Provider

import './index.css'
import App from './App.jsx'
import Applayout  from './components/Layout.jsx'
import './i18n.js'
import Schemes from './pages/Schemes.jsx';
import SchemeDetails from './pages/SchemeDetails.jsx';
import Admin from './pages/Admin.jsx';

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <Auth0Provider
    domain="dev-jeccd0ueip6c3tl6.us.auth0.com"
    clientId="QuKwQ9aJRKviVjlTEsM3xjaGA8NwBmK3"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Applayout />}>
          <Route index element={<App />} /> 
          <Route path="/search" element={<Schemes />} />
          <Route path='/admin' element={<Admin/>}/>
          <Route path="/search/:id" element={<SchemeDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Auth0Provider>
);
