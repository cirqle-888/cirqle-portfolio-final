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
const About = lazy(() => import("./pages/About").then((module) => ({ default: module.About })));
const Portfolio = lazy(() =>
  import("./pages/Portfolio").then((module) => ({ default: module.Portfolio }))
);

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
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/:slug" element={<ProjectDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}
