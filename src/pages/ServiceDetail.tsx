import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { PageSkeleton } from "../components/PageSkeleton";
import { ServicePageTemplate } from "../components/ServicePageTemplate";
import { contentfulAssetUrl, getServiceBySlug } from "../services/contentService";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;
    
    if (slug) {
      setLoading(true);
      getServiceBySlug(slug).then((entry) => {
        if (!cancelled) {
          setService(entry);
          setLoading(false);
          window.scrollTo(0, 0);
        }
      });
    }

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return <PageSkeleton />;
  }

  if (!loading && !service) {
    console.warn("Service not found:", slug, "URL:", window.location.pathname);
    return (
      <div className="min-h-screen pt-32 text-center flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-3xl font-medium text-gray-900 mb-4">Service not found.</h2>
        <p className="text-lg text-gray-500 max-w-md">
          The service profile you are trying to view does not exist or has been removed.
        </p>
      </div>
    );
  }

  const fields = service.fields;
  
  // SEO fields with structured fallback generators
  const metaTitle = fields.metaTitle || `${fields.title || "Service"} | Services | Cirqle`;
  const metaDescription = fields.metaDescription || typeof fields.description === "string" ? fields.description : "Premium design and digital services by Cirqle.";
  const ogImage = contentfulAssetUrl(fields.ogImage || fields.heroImage) || "https://images.unsplash.com/photo-1762787863004-767d5d7eac07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920";

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <ServicePageTemplate fields={fields} />
    </>
  );
}
