import { useWork } from "../lib/work";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { WorkPresentation } from "../components/work/WorkPresentation";
import { Link, useLocation } from "react-router-dom";
import { ShowcaseGrid } from "../sections/ShowcaseGrid";
import { SupermarketFlyers } from "../sections/SupermarketFlyers";
import { WorkPreview } from "../sections/WorkPreview";

export function Portfolio() {
  const location = useLocation();
  const gallery = new URLSearchParams(location.search).get("view") === "gallery" || !!location.hash;

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  return (
    <div className={gallery ? "pt-16" : "portfolio-page--presentation"}>
      <Helmet>
        <title>Portfolio | Graphic Design &amp; Video Work | Cirqle</title>
        <meta name="description" content="Browse Cirqle's portfolio of graphic design, video production, social media campaigns, and supermarket promotional work — supermarket flyers, brand identities, and digital creatives for brands worldwide." />
        <meta property="og:title" content="Portfolio | Graphic Design &amp; Video Work | Cirqle" />
        <meta property="og:description" content="Browse Cirqle's portfolio of graphic design, video production, social media campaigns, and supermarket promotional work — supermarket flyers, brand identities, and digital creatives for brands worldwide." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cirqle.work/portfolio" />
        <meta property="og:image" content="https://cirqle.work/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portfolio | Graphic Design &amp; Video Work | Cirqle" />
        <meta name="twitter:description" content="Browse Cirqle's portfolio of graphic design, video production, social media campaigns, and supermarket promotional work — supermarket flyers, brand identities, and digital creatives for brands worldwide." />
        <meta name="twitter:image" content="https://cirqle.work/og-image.png" />
        <link rel="canonical" href="https://cirqle.work/portfolio" />
      </Helmet>
      {gallery ? <><div className="portfolio-gallery-switch"><Link to="/portfolio">← Client presentation</Link></div><ShowcaseGrid headingTag="h1" showTiles={false} />
      <GalleryCollections/>
      <SupermarketFlyers /></> : <WorkPresentation/>}
    </div>
  );
}

function GalleryCollections() {
 const {collections}=useWork();
 return <>{collections.map(collection=><WorkPreview key={collection.slug} collection={collection.slug} limit={8}/>)}</>;
}
