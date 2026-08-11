import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { SupermarketFlyers } from "../../sections/SupermarketFlyers";

export function SupermarketCampaign() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <Helmet>
        <title>Supermarket Promotional Campaign Design | Highlights | Cirqle Kerala</title>
        <meta name="description" content="A behind-the-scenes look at how Cirqle designs high-impact supermarket promotional campaigns — offer flyers, shelf banners, and in-store visual systems that drive sales." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="text-center mb-8"
        >
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20">
             <span className="text-sm font-medium text-gray-900">Highlight</span>
          </div>
          <h1 className="text-5xl md:text-7xl mb-6 tracking-tight font-medium">Supermarket Campaigns</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Weekly offer flyers, seasonal catalogues, and in-store visuals — designed, revised, and
            delivered on the retail clock. Browse real campaigns below.
          </p>
        </motion.div>
      </div>

      {/* Real flyer gallery from the portfolio */}
      <SupermarketFlyers />

      <div className="max-w-7xl mx-auto px-6 relative">
        <section className="mb-24">
          <h2 className="text-3xl font-medium mb-10 text-center">How we run a campaign</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Send Your Offer List",
                desc: "Share products and prices however it's easiest — a WhatsApp message or a spreadsheet both work.",
              },
              {
                title: "We Design & You Review",
                desc: "We lay out the flyer in your store's style and send a proof; revisions turn around the same day.",
              },
              {
                title: "Print & Digital Delivery",
                desc: "Final artwork arrives press-ready for print plus sized versions for WhatsApp and social media.",
              },
            ].map((item) => (
              <div key={item.title} className="liquid-glass-card p-8 rounded-3xl transition-all">
                <h3 className="text-xl font-medium mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-20 bg-gray-900 rounded-[3rem] text-white overflow-hidden relative"
        >
          <div className="absolute inset-0 liquid-glass-dark pointer-events-none opacity-50"></div>
          <div className="relative z-10 px-6">
            <h2 className="text-4xl font-medium mb-6">Want flyers like these for your store?</h2>
            <Button size="lg" onClick={() => navigate('/contact')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-10 py-6 text-lg transition-transform hover:scale-105">
              Get a Quote
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
