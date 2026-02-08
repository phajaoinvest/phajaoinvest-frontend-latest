import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { MarketOverview } from "@/components/market-overview"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        {/* <MarketOverview /> */}
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
