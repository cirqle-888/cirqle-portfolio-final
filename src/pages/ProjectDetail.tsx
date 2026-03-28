import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProjectBySlug, contentfulAssetUrl } from "../services/contentService";
import { PageSkeleton } from "../components/PageSkeleton";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadProject() {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await getProjectBySlug(slug);
        if (!cancelled) setProject(data);
      } catch (err) {
        console.error("Failed to fetch project:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProject();
    window.scrollTo(0, 0);

    return () => {
      cancelled = true;
    };
  }, [slug]);

  console.log("Slug:", slug);

  // ✅ Loading state
  if (loading) {
    return <PageSkeleton />;
  }

  // ✅ 404 / Not Found state (FIXED + CENTERED)
  if (!project) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Glow Background */}
        <div
          className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(162, 89, 255, 0.15) 0%, rgba(76, 195, 255, 0.1) 40%, rgba(255,255,255,0) 70%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl w-full mt-6"
        >
          <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.2)] p-12 text-center">
            <h1 className="text-8xl font-bold bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] bg-clip-text text-transparent mt-8 mb-6">
              404
            </h1>

            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Project Not Found</h2>

            <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto px-4 text-center">
              The project you are looking for may have been removed or the link is incorrect.
            </p>

            <div className="flex justify-center gap-4 flex-wrap mb-8">
              <Link
                to="/"
                className="px-7 py-3 rounded-full bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] text-white font-medium shadow-lg hover:scale-105 transition"
              >
                Return Home
              </Link>

              <Link
                to="/"
                className="px-7 py-3 rounded-full border border-gray-300 hover:border-gray-500 hover:bg-gray-50 transition"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // ✅ Extract fields
  const { title, description, image, category, client, service, year, gallery } = project.fields;

  const imageUrl = image ? contentfulAssetUrl(image) : null;

  // ✅ Description renderer
  const renderDescription = () => {
    if (!description) return <p>No description available.</p>;

    if (typeof description === "string") {
      return (
        <p className="text-xl leading-relaxed text-gray-700 whitespace-pre-wrap">{description}</p>
      );
    }

    const extractText = (node: any): string => {
      if (node?.nodeType === "text") return node.value || "";
      if (Array.isArray(node?.content)) return node.content.map(extractText).join("");
      return "";
    };

    return (
      <p className="text-xl leading-relaxed text-gray-700 whitespace-pre-wrap">
        {extractText(description)}
      </p>
    );
  };

  // ✅ MAIN PAGE
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-28 pb-20 px-6 bg-white"
    >
      <Helmet>
        <title>{title ? `${String(title)} | Cirqle Project` : "Project | Cirqle"}</title>
        <meta
          name="description"
          content={`Explore ${title ? String(title) : "this"} premium design project by Cirqle.`}
        />
        {imageUrl && <meta property="og:image" content={imageUrl} />}
      </Helmet>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
        {/* LEFT CONTENT */}
        <div className="md:col-span-2">
          <Link
            to="/"
            className="inline-flex items-center text-gray-500 hover:text-black transition-colors mb-12 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>

          <div className="mb-12">
            {category && (
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20">
                <span className="text-sm font-medium">{String(category)}</span>
              </div>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
              {title ? String(title) : "Untitled Project"}
            </h1>
          </div>

          {/* MAIN IMAGE */}
          {imageUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full aspect-video rounded-3xl overflow-hidden mb-16 shadow-2xl"
            >
              <img
                src={imageUrl}
                alt={title}
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}

          {/* DESCRIPTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg max-w-none text-gray-700"
          >
            {renderDescription()}
          </motion.div>

          {/* GALLERY */}
          {Array.isArray(gallery) && gallery.length > 0 && (
            <div className="mt-20 columns-2 md:columns-3 gap-4 space-y-4">
              {gallery.map((img: any, i: number) => {
                const url = contentfulAssetUrl(img);
                if (!url) return null;

                return (
                  <img
                    key={i}
                    src={url}
                    loading="lazy"
                    className="w-full rounded-xl shadow-lg hover:scale-[1.02] transition"
                    alt="Project gallery"
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6 md:sticky md:top-28 h-fit">
          {client && (
            <div>
              <p className="text-sm text-gray-500">Client</p>
              <p className="font-medium">{client}</p>
            </div>
          )}

          {service && (
            <div>
              <p className="text-sm text-gray-500">Service</p>
              <p className="font-medium">{service}</p>
            </div>
          )}

          {year && (
            <div>
              <p className="text-sm text-gray-500">Year</p>
              <p className="font-medium">{year}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
