import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CustomCursor } from "./components/CustomCursor";
import { PageSkeleton } from "./components/PageSkeleton";

const Home = lazy(() => import("./pages/Home").then((module) => ({ default: module.Home })));
const Services = lazy(() =>
  import("./pages/Services").then((module) => ({ default: module.Services }))
);
const Contact = lazy(() =>
  import("./pages/Contact").then((module) => ({ default: module.Contact }))
);
const ProjectDetail = lazy(() =>
  import("./pages/ProjectDetail").then((module) => ({ default: module.ProjectDetail }))
);
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const About = lazy(() => import("./pages/About").then((module) => ({ default: module.About })));
const Portfolio = lazy(() =>
  import("./pages/Portfolio").then((module) => ({ default: module.Portfolio }))
);

const BrandIdentity = lazy(() => import("./pages/services/brand-identity").then((m) => ({ default: m.BrandIdentity })));
const EventBranding = lazy(() => import("./pages/services/event-branding").then((m) => ({ default: m.EventBranding })));
const UIUXDesign = lazy(() => import("./pages/services/ui-ux-design").then((m) => ({ default: m.UIUXDesign })));
const MarketingPack = lazy(() => import("./pages/products/marketing-pack").then((m) => ({ default: m.MarketingPack })));
const SupermarketCampaign = lazy(() => import("./pages/highlights/supermarket-campaign").then((m) => ({ default: m.SupermarketCampaign })));

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <CustomCursor />
        <Header />
        <Suspense fallback={<PageSkeleton />}>
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/:slug" element={<ProjectDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services/brand-identity" element={<BrandIdentity />} />
              <Route path="/services/event-branding" element={<EventBranding />} />
              <Route path="/services/ui-ux-design" element={<UIUXDesign />} />
              <Route path="/products/marketing-pack" element={<MarketingPack />} />
              <Route path="/highlights/supermarket-campaign" element={<SupermarketCampaign />} />
            </Routes>
          </main>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}
