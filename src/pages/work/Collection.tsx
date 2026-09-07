import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { WorkGallery } from "../../components/work/WorkGallery";
import { ShareRow } from "../../components/work/ShareRow";
import { WorkSkeleton } from "../../components/work/WorkSkeleton";
import { findCollection, useWork, absoluteUrl, srcFor } from "../../lib/work";

/** /portfolio/:collection — every creative in one collection, filterable by brand. */
export function WorkCollectionPage() {
  const { collection } = useParams();
  const { collections, loading } = useWork();
  const data = findCollection(collections, collection);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [collection]);

  if (loading) {
    return (
      <div className="pt-32 pb-28 px-6">
        <div className="max-w-7xl mx-auto">
          <WorkSkeleton count={8} />
        </div>
      </div>
    );
  }

  if (!data) {
    // No collections at all means the content could not be reached, which is
    // not the visitor's fault — say something truer than "not found".
    const unreachable = collections.length === 0;
    return (
      <div className="pt-32 pb-28 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl mb-6 tracking-tight">
            {unreachable ? "Our work is not available right now" : "Collection not found"}
          </h1>
          {unreachable && (
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Please try again in a moment, or get in touch and we will send the work directly.
            </p>
          )}
          <Link to="/portfolio" className="work-share-btn work-share-btn--primary">
            Back to portfolio
          </Link>
        </div>
      </div>
    );
  }

  const path = `/portfolio/${data.slug}`;
  const ogImage = data.items.length ? absoluteUrl(srcFor(data.items[0], 1600)) : "https://cirqle.work/og-image.png";

  return (
    <div className="pt-32 pb-28 px-6">
      <Helmet>
        <title>{data.seoTitle}</title>
        <meta name="description" content={data.seoDescription} />
        <meta property="og:title" content={data.seoTitle} />
        <meta property="og:description" content={data.seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={absoluteUrl(path)} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.seoTitle} />
        <meta name="twitter:description" content={data.seoDescription} />
        <meta name="twitter:image" content={ogImage} />
        <link rel="canonical" href={absoluteUrl(path)} />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <Link to="/portfolio" className="work-back">
          <ArrowLeft size={15} />
          All work
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20">
            <span className="text-sm text-gray-900 font-medium">{data.eyebrow}</span>
          </div>

          <h1 className="text-5xl md:text-7xl mb-6 tracking-tight font-medium">{data.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{data.description}</p>

          <div className="work-stats">
            <span>
              {data.items.length} {data.items.length === 1 ? "creative" : "creatives"}
            </span>
            <span>
              {data.brands.length} {data.brands.length === 1 ? "brand" : "brands"}
            </span>
          </div>

          <ShareRow path={path} message={`${data.title} by Cirqle —`} />
        </motion.div>

        <WorkGallery
          items={data.items}
          brands={data.brands}
          shareBase={path}
          brandLinkBase={path}
        />
      </div>
    </div>
  );
}
