import { LoginModal } from "@/components/modal/LoginModal";
import { BackgroundFx } from "@/components/layout/BackgroundFx";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { BusinessForm } from "@/components/sections/BusinessForm";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { MentorForm } from "@/components/sections/MentorForm";
import { MentorSection } from "@/components/sections/MentorSection";
import { Opportunities } from "@/components/sections/Opportunities";
import { Partners } from "@/components/sections/Partners";
import { Stage } from "@/components/sections/Stage";
import { StartupForm } from "@/components/sections/StartupForm";
import { StartupNetwork } from "@/components/sections/StartupNetwork";
import { StartupValue } from "@/components/sections/StartupValue";
import { Team } from "@/components/sections/Team";

export default function Page() {
  return (
    <>
      <BackgroundFx />
      <Header />

      <Hero />
      <Stage />
      <StartupValue />
      <StartupNetwork />
      <MentorSection />
      <Opportunities />
      <Partners />
      <Team />
      <FinalCta />
      <StartupForm />
      <MentorForm />
      <BusinessForm />

      <Footer />
      <LoginModal />
    </>
  );
}
