import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

export function EventBranding() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <Helmet>
        <title>Event Branding | Services | Cirqle</title>
        <meta name="description" content="Immersive Event Branding experiences that captivate your audience." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20">
             <span className="text-sm font-medium text-gray-900">Service</span>
          </div>
          <h1 className="text-5xl md:text-7xl mb-6 tracking-tight font-medium">Event Branding</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Create memorable physical and digital event experiences with unified branding logic from invites to stage design.
          </p>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl mb-24"
        >
          <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMGJyYW5kaW5nfGVufDF8fHx8MTc2MzE5Mjg0OXww&ixlib=rb-4.1.0&q=80&w=1920" alt="Event Branding coverage" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </motion.div>

        <section className="mb-24">
          <h2 className="text-3xl font-medium mb-10 text-center">What's Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Stage Design & Booths", "Event Signage & Wayfinding", "Promo Materials"].map((item, i) => (
              <div key={i} className="liquid-glass-card p-8 rounded-3xl edge-glow-hover transition-all">
                <h3 className="text-xl font-medium mb-4">{item}</h3>
                <p className="text-gray-600">Elevate the on-ground impact of your event with precision aesthetics.</p>
              </div>
            ))}
          </div>
        </section>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-16 bg-gray-900 rounded-[3rem] text-white overflow-hidden relative"
        >
          <div className="absolute inset-0 liquid-glass-dark pointer-events-none opacity-50"></div>
          <div className="relative z-10 px-6">
            <h2 className="text-4xl font-medium mb-6">Plan your next event with us</h2>
            <Button size="lg" onClick={() => navigate('/contact')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-10 py-6 text-lg transition-transform hover:scale-105">
              Contact Us
            </Button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
