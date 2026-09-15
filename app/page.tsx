import { Hero } from '@/components/hero';
import { Protocol } from '@/components/protocol';
import { Services } from '@/components/services';
import { Portfolio } from '@/components/portfolio';
import { Pricing } from '@/components/pricing';
import { Testimonials } from '@/components/testimonials';
import { ContactForm } from '@/components/contact-form';
import { Footer } from '@/components/footer';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Protocol />
      <Services />
      <Portfolio />
      <Pricing />
      <Testimonials />
      <ContactForm />
      <Footer />
    </>
  );
}
