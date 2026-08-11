import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CustomCursor } from "./components/CustomCursor";
import { PageSkeleton } from "./components/PageSkeleton";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { trackPageView } from "./lib/analytics";

function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-8xl font-medium bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] bg-clip-text text-transparent mb-6">
        404
      </p>
      <h1 className="text-3xl mb-4 tracking-tight">Page not found</h1>
      <p className="text-gray-500 mb-10 max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-8 py-3 rounded-full bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] text-white text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Back to Home
      </Link>
    </div>
  );
}

function PageViewTracker() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);
  return null;
}

const Home = lazy(() => import("./pages/Home").then((module) => ({ default: module.Home })));
const Services = lazy(() =>
  import("./pages/Services").then((module) => ({ default: module.Services }))
);
const Contact = lazy(() =>
  import("./pages/Contact").then((module) => ({ default: module.Contact }))
);
const About = lazy(() => import("./pages/About").then((module) => ({ default: module.About })));
const Careers = lazy(() => import("./pages/Careers").then((module) => ({ default: module.Careers })));
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
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <CustomCursor />
        <PageViewTracker />
        <Header />
        <Suspense fallback={<PageSkeleton />}>
          <main id="main-content" className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/brand-identity" element={<BrandIdentity />} />
              <Route path="/services/event-branding" element={<EventBranding />} />
              <Route path="/services/ui-ux-design" element={<UIUXDesign />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/products/marketing-pack" element={<MarketingPack />} />
              <Route path="/highlights/supermarket-campaign" element={<SupermarketCampaign />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}
