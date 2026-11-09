import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const SPECIALISTS = ["Design", "Video", "Social", "Ads", "Web", "Brand"];

const GLANCE = [
  {
    title: "Every craft, one team",
    text: "Design, video, social, ads, web, and brand — covered in-house.",
  },
  {
    title: "Remote-first, worldwide",
    text: "Rooted in retail, working with brands wherever they are.",
  },
  {
    title: "One platform behind every project",
    text: "Tasks, timelines, and approvals run on Cirqle's own system.",
  },
  {
    title: "Delivery-ready files",
    text: "Print-ready for the press, sized and formatted for every screen.",
  },
];

/**
 * The circle, made functional: a brief enters the hub, the right specialists
 * connect around it, and reviewed work comes out the other side.
 */
function CircleDiagram() {
  const RADIUS = 96;
  return (
    <div className="cirqle-flow" role="img" aria-label="How Cirqle works: your brief goes to the Cirqle hub, specialists work around it, then review and delivery">
      <span className="flow-chip">
        <span className="chip-dot" aria-hidden="true" />
        Your brief
      </span>
      <span className="flow-arrow" aria-hidden="true"><ArrowRight style={{ width: 18, height: 18 }} /></span>

      <div className="flow-orbit" aria-hidden="true">
        <div className="flow-orbit-ring" />
        <div className="flow-orbit-hub">
          <img src="/favicon.ico" alt="" style={{ width: 34, height: 34, objectFit: "contain" }} />
        </div>
        {SPECIALISTS.map((label, i) => {
          const angle = (i / SPECIALISTS.length) * 2 * Math.PI - Math.PI / 2;
          const x = Math.cos(angle) * RADIUS;
          const y = Math.sin(angle) * RADIUS;
          return (
            <span
              key={label}
              className="flow-orbit-node"
              style={{ marginLeft: x, marginTop: y }}
            >
              {label}
            </span>
          );
        })}
      </div>

      <span className="flow-arrow" aria-hidden="true"><ArrowRight style={{ width: 18, height: 18 }} /></span>
      <span className="flow-chip">
        <span className="chip-dot" aria-hidden="true" />
        Review
      </span>
      <span className="flow-arrow" aria-hidden="true"><ArrowRight style={{ width: 18, height: 18 }} /></span>
      <span className="flow-chip">
        <span className="chip-dot" aria-hidden="true" />
        Delivery
      </span>
    </div>
  );
}

export function HowCirqleWorks() {
  return (
    <section id="how-cirqle-works" className="py-28 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20">
            <span className="text-sm inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #A259FF, #4CC3FF)",
                  display: "inline-block",
                }}
              />
              How Cirqle Works
            </span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
            Different skills. One team.{" "}
            <span className="bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] bg-clip-text text-transparent">
              One circle.
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Send one brief. The right specialists pick it up, work as one team, and
            deliver reviewed, ready-to-use files.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "80px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <CircleDiagram />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-center text-sm font-medium text-gray-500 mb-6" style={{ letterSpacing: "0.18em", textTransform: "uppercase" }}>
            The Cirqle at a glance
          </p>
          <div className="glance-grid">
            {GLANCE.map((item) => (
              <div key={item.title} className="glance-tile">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
