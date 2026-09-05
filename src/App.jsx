import Header from "./components/Header";
import Hero from "./components/Hero";
import Properties from "./components/Properties";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import ContactCTA from "./components/ContactCTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main className="w-full pt-20 bg-background min-h-screen">
        <div className="flex flex-col w-full">
          <Hero />
          <Properties />
          <Services />
          <WhyChooseUs />
          <Testimonials />
          <ContactCTA />
        </div>
      </main>
      <Footer />
    </>
  );
}
