import { Navbar } from "@/components/home/Navbar"
import { Hero } from "@/components/home/Hero"
import { SocialProof } from "@/components/home/SocialProof"
import { Features } from "@/components/home/Features"
import { DashboardPreview } from "@/components/home/DashboardPreview"
import { HowItWorks } from "@/components/home/HowItWorks"
import { Pricing } from "@/components/home/Pricing"
import { CTA } from "@/components/home/CTA"
import { Footer } from "@/components/home/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0b0f17] overflow-x-hidden">
      <Navbar />
      <Hero />
      <SocialProof />
      <Features />
      <DashboardPreview />
      <HowItWorks />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  )
}
