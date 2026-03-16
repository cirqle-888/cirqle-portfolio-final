import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProjectBySlug, contentfulAssetUrl } from "../services/contentService";
import { PageSkeleton } from "../components/PageSkeleton";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

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
        if (!cancelled) {
          setProject(data);
        }
      } catch (err) {
        console.error("Failed to fetch project:", err);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProject();

    // Scroll to top when loading a new project
    window.scrollTo(0, 0);

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return <PageSkeleton />;
  }

  if (!project) {
    return (
      <div className="relative w-full min-h-screen flex items-center justify-center bg-gray-50 overflow-hidden">

        {/* Header spacer (optional if header is fixed, but justify-center usually handles it) */}
        
        {/* Background glow */}
        <div
          className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(162, 89, 255, 0.15) 0%, rgba(76, 195, 255, 0.1) 40%, rgba(255,255,255,0) 70%)",
          }}
        />

        {/* Absolute Centered 404 Text */}
        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] md:text-[20rem] font-bold text-gray-900/5 select-none pointer-events-none">
          404
        </h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 max-w-xl w-full px-6"
        >

          <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl p-12 text-center border border-white/50 flex flex-col items-center space-y-8">

            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                Project in the Shadows
              </h2>

              <p className="text-lg text-gray-600 max-w-md mx-auto">
                Sorry, the project you are looking for could not be found or has been moved.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto pt-4">

              <Link
                to="/"
                className="px-8 py-3.5 rounded-full bg-gray-900 text-white font-medium shadow-lg shadow-gray-900/20 hover:bg-black hover:scale-105 hover:shadow-xl hover:shadow-gray-900/30 transition-all duration-300 flex items-center justify-center group"
              >
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Return Home
              </Link>

              <Link
                to="/"
                className="px-8 py-3.5 rounded-full border border-gray-200 text-gray-700 bg-white hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
              >
                View Portfolio
              </Link>

            </div>

          </div>

        </motion.div>
      </div>
    );
  }

  const { title, description, image, category, client, services, year } = project.fields;
  const imageUrl = image ? contentfulAssetUrl(image) : null;

  // Basic rendering for description if it's an object (Rich Text) or string
  const renderDescription = () => {
    if (!description) return <p>No description available.</p>;
    if (typeof description === 'string') {
      return <p className="text-xl leading-relaxed text-gray-700 whitespace-pre-wrap">{description}</p>;
    }
    // Fallback for Contentful Rich Text without external renderer
    const extractText = (node: any): string => {
      if (node?.nodeType === 'text') return node.value || '';
      if (Array.isArray(node?.content)) return node.content.map(extractText).join('');
      return '';
    };
    return <p className="text-xl leading-relaxed text-gray-700 whitespace-pre-wrap">{extractText(description)}</p>;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white relative pb-16 md:pb-24"
    >
      {/* Fixed Back Button */}
      <Link
        to="/"
        className="fixed top-28 left-4 md:left-8 z-50 inline-flex items-center px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-black/5 text-gray-600 hover:text-black hover:bg-white/80 transition-all shadow-sm group"
      >
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back
      </Link>

      {/* Full-width Image Banner */}
      {imageUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full h-[50vh] md:h-[60vh] relative mb-16 md:mb-24"
        >
          <img
            src={imageUrl}
            alt={title ? String(title) : "Project Image"}
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}

      {/* Main Content Area */}
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-6">
            {title ? String(title) : "Untitled Project"}
          </h1>
          {category && (
            <div className="text-lg font-medium text-gray-500 mb-12">
              {String(category)}
            </div>
          )}

          {/* Info Bar */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-8 border-y border-gray-100">
            <div>
              <div className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">Client</div>
              <div className="text-sm font-medium text-black">
                {client ? String(client) : "Internal"}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">Services</div>
              <div className="text-sm font-medium text-black">
                {services ? String(services) : (category ? String(category) : "Design")}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">Year</div>
              <div className="text-sm font-medium text-black">
                {year ? String(year) : new Date().getFullYear()}
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Section - clean without background */}
        <motion.div
          id="narrative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose prose-lg prose-gray max-w-none text-gray-800"
        >
          {renderDescription()}
        </motion.div>
      </div>
    </motion.div>
  );
}
