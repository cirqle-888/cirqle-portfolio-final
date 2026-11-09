import { Suspense, lazy, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter as Router, Link, Route, Routes, useLocation } from 'react-router-dom';
import { trackPageView } from './lib/analytics';
import { Footer } from './v3/Footer';
import { Header } from './v3/Header';
import { useReveal } from './v3/useReveal';
import { Home } from './v3/pages/Home';

const Services = lazy(() => import('./v3/pages/Services').then((m) => ({ default: m.Services })));
const Work = lazy(() => import('./v3/pages/Work').then((m) => ({ default: m.Work })));
const Creative = lazy(() => import('./v3/pages/Division').then((m) => ({ default: m.Creative })));
const Digital = lazy(() => import('./v3/pages/Division').then((m) => ({ default: m.Digital })));
const Accounts = lazy(() => import('./v3/pages/Division').then((m) => ({ default: m.Accounts })));
const About = lazy(() => import('./v3/pages/About').then((m) => ({ default: m.About })));
const Contact = lazy(() => import('./v3/pages/Contact').then((m) => ({ default: m.Contact })));
const Careers = lazy(() => import('./v3/pages/Careers').then((m) => ({ default: m.Careers })));
const Privacy = lazy(() => import('./v3/pages/Legal').then((m) => ({ default: m.Privacy })));
const Terms = lazy(() => import('./v3/pages/Legal').then((m) => ({ default: m.Terms })));

function NotFound() {
  return (
    <section style={{ padding: 'clamp(160px, 16vw, 220px) 0 clamp(72px, 8vw, 120px)' }}>
      <Helmet>
        <title>Page not found | Cirqle</title>
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={`https://cirqle.work${window.location.pathname}`} />
      </Helmet>
      <div className="wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 20 }}>
        <span className="kicker">404</span>
        <h1 className="h-xl">
          That page has{' '}
          <span className="ital acc" style={{ fontWeight: 500 }}>
            moved on.
          </span>
        </h1>
        <p className="lead" style={{ maxWidth: 460 }}>
          The page you are looking for does not exist any more.
        </p>
        <Link className="btn btn-acc" to="/">
          Back to home
        </Link>
      </div>
    </section>
  );
}

/** One place for the things every route needs: analytics, scroll reset, reveal. */
function RouteEffects() {
  const { pathname, hash } = useLocation();
  useReveal();

  useEffect(() => {
    trackPageView(pathname);
    if (hash) return;
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}

function Shell() {
  return (
    <>
      <RouteEffects />
      <a href="#main-content" className="sr-only">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" style={{ flex: 1 }}>
        <Suspense fallback={<div style={{ minHeight: '70vh' }} />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/creative" element={<Creative />} />
            <Route path="/services/digital" element={<Digital />} />
            <Route path="/services/accounts" element={<Accounts />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            {/* The old portfolio path keeps working. */}
            <Route path="/portfolio" element={<Work />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Shell />
      </div>
    </Router>
  );
}
