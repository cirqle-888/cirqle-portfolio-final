import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { contentfulAssetUrl } from "../services/contentService";

interface PricingTier {
  name?: string;
  price?: string;
  features?: string | string[];
  highlight?: boolean;
  order?: number;
}

interface ServicePageTemplateProps {
  fields: any;
}

// Basic helper to extract string from Contentful rich text or string
const extractText = (content: any): string => {
  if (typeof content === "string") return content;
  if (!content) return "";
  if (content.nodeType === "document" && Array.isArray(content.content)) {
    return content.content
      .map((node: any) =>
        node.content?.map((textNode: any) => textNode.value).join("")
      )
      .filter(Boolean)
      .join("\n\n");
  }
  return String(content);
};

export function ServicePageTemplate({ fields }: ServicePageTemplateProps) {
  const navigate = useNavigate();

  const title = fields?.title ?? "Service";
  const description = extractText(fields?.description);
  const heroImageUrl = contentfulAssetUrl(fields?.heroImage) || "https://images.unsplash.com/photo-1762787863004-767d5d7eac07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920";
  
  const pricingRaw = fields?.pricing as any[] | undefined;
  
  // Safe Array Clone and Order Sort (Constraint 2)
  const sortedPricing = [...(pricingRaw ?? [])]
    .map(p => p.fields as PricingTier)
    .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0));

  const overview = extractText(fields?.overview);
  const workflow = extractText(fields?.workflow);
  const deliverables = extractText(fields?.deliverables);
  const faq = extractText(fields?.faq);

  const relatedPortfolio = fields?.relatedPortfolio as any[] | undefined;

  return (
    <main className="pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Hero Section */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20">
             <span className="text-sm font-medium text-gray-900">Service</span>
          </div>
          <h1 className="text-5xl md:text-7xl mb-6 tracking-tight font-medium">{title}</h1>
          {description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl mb-24"
        >
          <img src={heroImageUrl} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </motion.div>

        {/* Dynamic Content Sections */}
        {overview && (
          <section className="mb-24 max-w-4xl mx-auto">
            <h2 className="text-3xl font-medium mb-8 text-center">Overview</h2>
            <div className="prose prose-lg text-gray-600 leading-relaxed mx-auto whitespace-pre-wrap">
              {overview}
            </div>
          </section>
        )}

        {workflow && (
          <section className="mb-24 max-w-4xl mx-auto">
            <h2 className="text-3xl font-medium mb-8 text-center">Workflow</h2>
            <div className="prose prose-lg text-gray-600 leading-relaxed mx-auto whitespace-pre-wrap">
              {workflow}
            </div>
          </section>
        )}

        {deliverables && (
          <section className="mb-24 max-w-4xl mx-auto">
            <h2 className="text-3xl font-medium mb-8 text-center">Deliverables</h2>
            <div className="liquid-glass-card p-8 rounded-3xl edge-glow-hover transition-all">
              <div className="prose prose-lg text-gray-600 leading-relaxed whitespace-pre-wrap">
                {deliverables}
              </div>
            </div>
          </section>
        )}

        {/* Pricing Module */}
        {sortedPricing.length > 0 && (
          <section className="mb-24">
            <h2 className="text-3xl font-medium mb-12 text-center">Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {sortedPricing.map((tier, idx) => (
                <div 
                  key={idx} 
                  className={`relative p-8 rounded-3xl transition-all duration-300 ${tier?.highlight ? 'bg-gray-900 text-white shadow-2xl scale-105' : 'liquid-glass-card hover:shadow-xl edge-glow-hover text-gray-900'}`}
                >
                  {tier?.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] text-white text-xs font-bold px-4 py-1 rounded-full">
                      RECOMMENDED
                    </div>
                  )}
                  <h3 className="text-2xl font-medium mb-2">{tier?.name || "Tier"}</h3>
                  <div className="text-4xl font-bold mb-6">{tier?.price || "Custom"}</div>
                  <div className={`prose whitespace-pre-wrap ${tier?.highlight ? 'text-gray-300' : 'text-gray-600'}`}>
                    {extractText(tier?.features)}
                  </div>
                  <Button 
                    className={`w-full mt-8 rounded-full py-6 transition-transform hover:scale-105 ${tier?.highlight ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800'}`}
                    onClick={() => navigate('/contact')}
                  >
                    Select Plan
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}

        {faq && (
          <section className="mb-24 max-w-4xl mx-auto">
            <h2 className="text-3xl font-medium mb-8 text-center">FAQ</h2>
            <div className="prose prose-lg text-gray-600 leading-relaxed mx-auto whitespace-pre-wrap">
              {faq}
            </div>
          </section>
        )}

        {/* Related Portfolio Module */}
        <section className="mb-24">
          <h2 className="text-3xl font-medium mb-12 text-center">Related Work</h2>
          
          {(!relatedPortfolio || relatedPortfolio.length === 0) ? (
            <div className="text-center text-gray-500 py-12 liquid-glass-card rounded-3xl">
              <p className="text-lg">Portfolio examples for this service will be added soon.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPortfolio.map((project, idx) => {
                const projFields = project?.fields;
                if (!projFields) return null;
                const projSlug = projFields.slug || projFields.title?.toLowerCase().replace(/\s+/g, '-');
                const projImage = contentfulAssetUrl(projFields.heroImage || projFields.image);
                
                return (
                  <Link key={idx} to={`/portfolio/${projSlug}`} className="block group cursor-pointer">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -6, scale: 1.02 }}
                      className="h-full"
                    >
                      <div className="relative h-full liquid-glass-card p-6 rounded-3xl hover:shadow-2xl transition-all duration-500 overflow-hidden edge-glow-hover">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                            {projImage ? (
                              <img src={projImage} alt={projFields.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            ) : (
                              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">No Image</div>
                            )}
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                        </div>
                        <h3 className="text-xl font-medium mb-2">{projFields.title}</h3>
                        {projFields.category && (
                          <p className="text-sm text-gray-500">{projFields.category}</p>
                        )}
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* CTA Banners */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-16 bg-gray-900 rounded-[3rem] text-white overflow-hidden relative"
        >
          <div className="absolute inset-0 liquid-glass-dark pointer-events-none opacity-50"></div>
          <div className="relative z-10 px-6 flex flex-col items-center gap-6">
            <h2 className="text-4xl font-medium mb-2">Ready to elevate your project?</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => navigate('/portfolio')} className="bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-full px-10 py-6 text-lg transition-transform hover:scale-105">
                View Full Portfolio
              </Button>
              <Button size="lg" onClick={() => navigate('/contact')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-10 py-6 text-lg transition-transform hover:scale-105 shadow-xl shadow-white/10">
                Contact Us
              </Button>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
