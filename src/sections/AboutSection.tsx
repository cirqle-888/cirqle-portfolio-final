import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

const strengths = [
  "In-house specialists across six crafts",
  "One platform runs every project",
  "Print-ready and digital-ready output",
  "Turnarounds in days, not weeks",
];

const ROLES = ["Design", "Video", "Social", "Ads", "Web", "Brand"];

/** Static ring of member roles around the Cirqle mark — the name, drawn. */
function MembersRing() {
  return (
    <div className="members-ring" role="img" aria-label="The Cirqle circle: design, video, social, ads, web, and brand specialists around one hub">
      {/* hairline ring */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "12%",
          borderRadius: "50%",
          border: "1px solid var(--c-hairline)",
        }}
      />
      {/* hub */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "26%",
          aspectRatio: "1",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(var(--nav-hub-fill),var(--nav-hub-fill)) padding-box, linear-gradient(135deg,#A259FF,#4CC3FF) border-box",
          border: "1.5px solid transparent",
          boxShadow: "0 10px 32px rgba(122,89,255,0.25)",
        }}
      >
        <img src="/favicon.ico" alt="" style={{ width: "48%", height: "48%", objectFit: "contain" }} />
      </div>
      {/* role nodes on the ring */}
      {ROLES.map((label, i) => {
        const angle = (i / ROLES.length) * 2 * Math.PI - Math.PI / 2;
        const x = 50 + Math.cos(angle) * 38;
        const y = 50 + Math.sin(angle) * 38;
        return (
          <span
            key={label}
            aria-hidden="true"
            className="flow-orbit-node"
            style={{ top: `${y}%`, left: `${x}%`, margin: 0 }}
          >
            {label}
          </span>
        );
      })}
    </div>
  );
}

interface AboutSectionProps {
  headingTag?: "h1" | "h2";
}

export function AboutSection({ headingTag = "h2" }: AboutSectionProps = {}) {
  const Heading = headingTag;

  return (
    <section id="about" className="py-28 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Members ring motif */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute -inset-6 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-3xl blur-3xl" aria-hidden="true"></div>
            <div className="relative py-10">
              <MembersRing />
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

            <p className="font-display-i text-2xl text-gray-600 mb-4">Namaskaram.</p>

            <Heading className="text-4xl md:text-5xl lg:text-6xl mb-8 tracking-tight">
              A circle of{" "}
              <span className="bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] bg-clip-text text-transparent">
                skilled people
              </span>
            </Heading>

            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              The name says it: Cirqle is a circle of skilled members — designers,
              video editors, marketers, and developers — different crafts, working
              as one team.
            </p>

            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              We started with supermarket offer flyers, where deadlines
              are weekly and the artwork has to sell. That retail discipline still
              shapes everything we deliver: fast cycles, clear communication, and
              work judged by results.
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
