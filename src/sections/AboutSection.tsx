import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { CheckCircle2 } from "lucide-react";

const strengths = [
  "Dedicated in-house design team",
  "Turnarounds measured in days, not weeks",
  "Print-ready and digital-ready output",
  "A modern, technology-driven workflow",
];

interface AboutSectionProps {
  headingTag?: "h1" | "h2";
}

export function AboutSection({ headingTag = "h2" }: AboutSectionProps = {}) {
  const Heading = headingTag;

  return (
    <section id="about" className="py-28 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute -inset-6 bg-gradient-to-r from-[#A259FF]/15 to-[#4CC3FF]/15 rounded-3xl blur-3xl"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1510832758362-af875829efcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZSUyMGRlc2lnbnxlbnwxfHx8fDE3NjMxNDU2Mzh8MA&ixlib=rb-4.1.0&q=80&w=800"
                alt="Cirqle Creative Space"
                width={800}
                height={800}
                className="w-full aspect-square object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20">
              <span className="text-sm">About Cirqle</span>
            </div>

            <Heading className="text-4xl md:text-5xl lg:text-6xl mb-8 tracking-tight">
              A design studio built around
              <span className="bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] bg-clip-text text-transparent">
                {" "}
                retail
              </span>
            </Heading>

            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Cirqle is a creative agency based in Kerala, India. We started with supermarket offer
              flyers — work where deadlines are weekly and the artwork has to sell — and grew into a
              full creative team covering branding, social media, video, and digital design.
            </p>

            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              That retail background shapes how we work: fast cycles, clear communication, and
              designs judged by results, not just looks.
            </p>

            {/* Strengths list */}
            <ul className="space-y-5">
              {strengths.map((strength, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] flex items-center justify-center flex-shrink-0 shadow-md">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg">{strength}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
