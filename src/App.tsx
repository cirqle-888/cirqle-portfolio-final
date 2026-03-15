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

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <CustomCursor />
        <Header />
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/portfolio/:slug" element={<ProjectDetail />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}
