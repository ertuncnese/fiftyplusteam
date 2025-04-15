import Header from '../components/Header';
import About from '../components/About';
import Team from '../components/Team';
import BannerCarousel from "../components/BannerCarousel";
import Services from "../components/Services";
import News from '../components/News';
import Offices from '../components/Offices';
import Footer from '@/components/Footer';
import ContactForm from '../components/ContactForm';


export default function Home() {
 

  return (
    <>
      
      <Header />
      <BannerCarousel />
      <About />
      <Team />
      <Services />
      <News />
      <Offices />
      <News />
      <section id="iletisim" className="scroll-mt-24 px-6 py-20 bg-white text-gray-800">
        <ContactForm />
      </section>
      <Footer />
      
    </>
  );
}
