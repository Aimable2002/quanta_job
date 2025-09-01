import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './utils/Header';
import Hero from './utils/Hero';
import Products from './utils/Product';
import Chatbot from './utils/Chatbot';
import { TermsOfService } from './pages/Terms';
import { PrivacyPolicy } from './pages/privacy';
import Footer from './pages/Footer';
import About from './pages/About';
import Values from './pages/Value';
import ResearchInnovation from './pages/research';
import AffiliateCTA from './pages/Affiliated';
import Testimonials from './pages/testimony';
import Contact from './pages/contact';
import Services from './pages/service';
import Admin from './pages/Admin'; 
import './index.css';
import './css/animations.css';
import { LeadershipTeam } from './pages/leadership';
import Opportunity from './pages/opportunity';
// Import the new pages
import GdprCompliance from './pages/GdprCompliance';
import Security from './pages/Security';
import CookiePolicy from './pages/CookiePolicy';
import LegalNotice from './pages/LegalNotice';

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return null;
}

function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Values />
        <Products />
        <Services />
        <Testimonials />
        <AffiliateCTA />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}

function Research() {
  return(
    <>
      <Header />
      <main>
        <ResearchInnovation /> 
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}

function Opport() {
  return(
    <>
      <Header />
      <main>
        <Opportunity /> 
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}

function App() {
  return (
    <div className="App">
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/leader" element={<LeadershipTeam />} />
        <Route path="/admin" element={<Admin />} /> 
        <Route path='/research' element={<Research />} />
        <Route path='/oppo' element={<Opport />} />
        {/* Add new routes for the legal pages */}
        <Route path="/gdpr" element={<GdprCompliance />} />
        <Route path="/security" element={<Security />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/legal-notice" element={<LegalNotice />} />
      </Routes>
    </div>
  );
}

export default App;