import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { WorkGallery } from "../../components/work/WorkGallery";
import { ShareRow } from "../../components/work/ShareRow";
import { WorkSkeleton } from "../../components/work/WorkSkeleton";
import type { WorkBrand } from "../../lib/work";
import { findBrand, findCollection, useWork, absoluteUrl, srcFor } from "../../lib/work";

/** Initials shown in the brand avatar, e.g. "Cell World" → "CW". */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/** /portfolio/:collection/:brand — a single client's set, ready to send. */
export function WorkBrandPage() {
  const { collection, brand } = useParams();
  const { collections, loading } = useWork();
  const data = findCollection(collections, collection);
  const brandData = findBrand(collections, collection, brand);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [collection, brand]);

  if (loading) {
    return (
      <div className="pt-32 pb-28 px-6">
        <div className="max-w-7xl mx-auto">
          <WorkSkeleton count={6} />
        </div>
      </div>
    );
  }

  if (!data || !brandData) {
    return (
      <div className="pt-32 pb-28 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl mb-6 tracking-tight">Brand not found</h1>
          <Link to="/portfolio" className="work-share-btn work-share-btn--primary">
            Back to portfolio
          </Link>
        </div>
      </div>
    );
  }

  const path = `/portfolio/${data.slug}/${brandData.slug}`;
  const title = `${brandData.name} — ${data.title} | Cirqle`;
  const description = brandData.tagline
    ? `${brandData.items.length} creatives designed by Cirqle for ${brandData.name} (${brandData.tagline}).`
    : `${brandData.items.length} creatives designed by Cirqle for ${brandData.name}.`;
  const ogImage = absoluteUrl(srcFor(brandData.cover, 1600));
  const others: WorkBrand[] = data.brands.filter((b) => b.slug !== brandData.slug);

  return (
    <div className="pt-32 pb-28 px-6">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={absoluteUrl(path)} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <link rel="canonical" href={absoluteUrl(path)} />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <Link to={`/portfolio/${data.slug}`} className="work-back">
          <ArrowLeft size={15} />
          {data.title}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="work-brand-head mb-16"
        >
          <span className="work-avatar" aria-hidden="true">
            {initials(brandData.name)}
          </span>
          {/* The logo sits ABOVE the name here rather than replacing it: a
              brand's own page is the one place the name should be spelled out. */}
          {brandData.logo && (
            <img className="work-brand-logo" src={brandData.logo} alt="" loading="eager" decoding="async" />
          )}
          <h1 className="text-4xl md:text-6xl tracking-tight font-medium">{brandData.name}</h1>
          {brandData.tagline && <p className="work-tagline">{brandData.tagline}</p>}

          <div className="work-stats">
            <span>
              {brandData.items.length} {brandData.items.length === 1 ? "creative" : "creatives"}
            </span>
            <span>{data.eyebrow}</span>
          </div>

          <ShareRow path={path} message={`Cirqle's work for ${brandData.name} —`} />
        </motion.div>

        <WorkGallery items={brandData.items} shareBase={path} />

        {others.length > 0 && (
          <div className="mt-24 text-center">
            <h2 className="text-2xl mb-2 tracking-tight font-medium">More brands in this collection</h2>
            <div className="work-brand-strip">
              {others.map((b) => (
                <Link key={b.slug} to={`/portfolio/${data.slug}/${b.slug}`} className="work-chip">
                  {b.name}
                  <span className="work-chip__count">{b.items.length}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
