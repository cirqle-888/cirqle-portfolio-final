import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Hero } from "../sections/Hero";
import { HomeDiscovery } from "../components/home/HomeDiscovery";

export function Home() {
  useEffect(() => {
    const root = document.documentElement;
    const header = document.querySelector('header');
    const updateOffset = () => root.style.setProperty('--home-header-height', `${header?.getBoundingClientRect().height || 88}px`);
    root.classList.add('home-scroll');
    updateOffset();
    const observer = new ResizeObserver(updateOffset);
    if (header) observer.observe(header);
    return () => {
      observer.disconnect();
      root.classList.remove('home-scroll');
      root.style.removeProperty('--home-header-height');
    };
  }, []);
  return (
    <>
      <Helmet>
        <title>Creative Design Agency | Graphic Design, Video &amp; Social Media | Cirqle</title>
        <meta name="description" content="Cirqle is a team of skilled creators — designers, video editors, marketers, and developers working as one. Supermarket campaigns, branding, social media, and video, delivered on retail deadlines." />
        <meta property="og:title" content="Creative Design Agency | Graphic Design, Video &amp; Social Media | Cirqle" />
        <meta property="og:description" content="Cirqle is a team of skilled creators — designers, video editors, marketers, and developers working as one. Supermarket campaigns, branding, social media, and video." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cirqle.work" />
        <meta property="og:image" content="https://cirqle.work/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Creative Design Agency | Graphic Design, Video &amp; Social Media | Cirqle" />
        <meta name="twitter:description" content="Cirqle is a team of skilled creators working as one. Supermarket campaigns, branding, social media, and video." />
        <meta name="twitter:image" content="https://cirqle.work/og-image.png" />
        <link rel="canonical" href="https://cirqle.work" />
      </Helmet>
      <div className="home-page">
        <Hero />
        <HomeDiscovery />
      </div>
    </>
  );
}
