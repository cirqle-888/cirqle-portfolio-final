import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";

export function Hero() {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-gray-50/30 to-white pt-24 pb-16"
    >
      {/* Static background wash */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-[#4CC3FF]/10 to-[#A259FF]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 liquid-glass-card rounded-full mb-8 shadow-xl">
            <MapPin className="w-4 h-4 text-[#A259FF]" />
            <span className="text-sm text-gray-900 font-medium">
              Creative Design Agency · Kerala, India
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-8 tracking-tight leading-[1.1]">
            Design that sells.
            <br />
            <span className="bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] bg-clip-text text-transparent">
              Delivered in days.
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl lg:text-2xl text-gray-800 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Supermarket campaigns, brand identity, social media content, and video — crafted by one
          team, ready on retail deadlines.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          <Button
            size="lg"
            onClick={() => navigate("/portfolio")}
            className="bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] text-white hover:opacity-90 transition-opacity px-10 py-7 text-lg rounded-full group shadow-lg shadow-[#A259FF]/25"
          >
            See Our Work
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/contact")}
            className="border-2 border-black text-black hover:bg-black hover:text-white transition-all px-10 py-7 text-lg rounded-full"
          >
            Get a Quote
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
