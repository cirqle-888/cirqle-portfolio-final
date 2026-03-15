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
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">Project Not Found</h1>
        <p className="text-gray-600 text-lg mb-8">The project you are looking for does not exist.</p>
        <Link 
          to="/"
          className="px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const { title, description, image, category } = project.fields;
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
      className="min-h-screen pt-32 pb-20 px-6 bg-white"
    >
      <div className="max-w-4xl mx-auto">
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

        {imageUrl && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full aspect-video rounded-3xl overflow-hidden mb-16 shadow-2xl relative"
          >
            <img 
              src={imageUrl} 
              alt={title ? String(title) : "Project Image"} 
              className="w-full h-full object-cover" 
            />
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose prose-lg max-w-none text-gray-700"
        >
          {renderDescription()}
        </motion.div>
      </div>
    </motion.div>
  );
}
