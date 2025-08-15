import { Routes, Route } from 'react-router-dom';
import Header from './utils/Header';
import Hero from './utils/Hero';
import Products from './utils/Product';
import Chatbot from './utils/Chatbot';
import { TermsOfService } from './pages/Terms';
import { PrivacyPolicy } from './pages/privacy';
import Footer from './pages/Footer';
import About from './pages/About';
import Values from './pages/Value';
import Internship from './pages/internaship';
import AffiliateCTA from './pages/Affiliated';
import Testimonials from './pages/testimony';
import Contact from './pages/contact';
import Services from './pages/service';
import './index.css';
import './css/animations.css';

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
      <Internship />
      <Testimonials />
      <AffiliateCTA />
      <Contact />
    </main>
    <Footer />
    <Chatbot />
  </>
  );
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </div>
  );
}

export default App;