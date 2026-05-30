import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { MessageCircle, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { getContact } from "../services/contentService";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormValues {
  name: string;
  whatsapp: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactSection() {
  const [contact, setContact] = useState<any | null>(null);
  const [values, setValues] = useState<FormValues>({ name: "", whatsapp: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  useEffect(() => {
    let cancelled = false;
    getContact().then((items) => {
      const fields = items?.[0]?.fields ?? null;
      if (!cancelled && fields) setContact(fields);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const whatsappNumberRaw = useMemo(() => {
    return contact?.whatsappNumber ?? contact?.whatsapp ?? "+91 8129 5343 77";
  }, [contact]);

  const whatsappNumberDigits = useMemo(() => {
    return String(whatsappNumberRaw).replace(/[^\d]/g, "");
  }, [whatsappNumberRaw]);

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumberDigits}`, "_blank");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!values.name.trim()) errs.name = "Full name is required.";
    if (!values.email.trim()) {
      errs.email = "Email address is required.";
    } else if (!EMAIL_RE.test(values.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (!values.message.trim()) errs.message = "Project details are required.";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("https://formspree.io/f/xdawkvje", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name,
          whatsapp: values.whatsapp,
          email: values.email,
          message: values.message,
          _subject: "New Cirqle Inquiry",
        }),
      });
      if (res.ok) {
        setStatus("success");
        setValues({ name: "", whatsapp: "", email: "", message: "" });
        setErrors({});
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="py-28 px-6 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
    >
      {/* Large soft gradient circle */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20"
          >
            <span className="text-sm">{contact?.badgeText ?? "Get in Touch"}</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
            {contact?.title ?? "Start Your Project"}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {contact?.subtitle ?? "Let's create something exceptional together"}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="liquid-glass-card rounded-3xl shadow-2xl p-10 md:p-14 relative overflow-hidden refraction edge-glow-hover"
        >
          {/* Micro liquid movement */}
          <div className="absolute inset-0 pointer-events-none z-10 micro-liquid">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent opacity-50"></div>
          </div>

          {/* Success state */}
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] flex items-center justify-center mb-6 shadow-xl">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl mb-3 tracking-tight">Message Sent!</h2>
                <p className="text-gray-600 mb-8 max-w-sm leading-relaxed">
                  Thanks for reaching out. We'll get back to you within 24 hours.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStatus("idle")}
                  className="rounded-full px-8 border-2 border-gray-200 hover:border-[#A259FF] hover:text-[#A259FF] transition-all"
                >
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-7 relative z-10"
              >
                {/* Hidden honeypot */}
                <input type="text" name="_gotcha" style={{ display: "none" }} aria-hidden="true" />

                <div className="grid md:grid-cols-2 gap-7">
                  <div>
                    <label htmlFor="name" className="block mb-3 text-sm font-medium text-gray-900">
                      Full Name <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      aria-label="Full Name"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={`rounded-2xl border-gray-200 focus:border-[#A259FF] h-14 transition-all liquid-glass-card bg-transparent ${errors.name ? "border-red-400 focus:border-red-400" : ""}`}
                    />
                    {errors.name && (
                      <p id="name-error" role="alert" className="mt-2 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="whatsapp" className="block mb-3 text-sm font-medium text-gray-900">
                      WhatsApp Number
                    </label>
                    <Input
                      id="whatsapp"
                      type="tel"
                      name="whatsapp"
                      value={values.whatsapp}
                      onChange={handleChange}
                      placeholder="+91 8129 5343 77"
                      aria-label="WhatsApp Number"
                      className="rounded-2xl border-gray-200 focus:border-[#A259FF] h-14 transition-all liquid-glass-card bg-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block mb-3 text-sm font-medium text-gray-900">
                    Email Address <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    aria-label="Email Address"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`rounded-2xl border-gray-200 focus:border-[#A259FF] h-14 transition-all liquid-glass-card bg-transparent ${errors.email ? "border-red-400 focus:border-red-400" : ""}`}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="mt-2 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="requirement" className="block mb-3 text-sm font-medium text-gray-900">
                    Project Details <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <Textarea
                    id="requirement"
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    aria-label="Project Details"
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    rows={6}
                    className={`rounded-2xl border-gray-200 focus:border-[#A259FF] resize-none transition-all liquid-glass-card bg-transparent ${errors.message ? "border-red-400 focus:border-red-400" : ""}`}
                  />
                  {errors.message && (
                    <p id="message-error" role="alert" className="mt-2 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Network error banner */}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm"
                    role="alert"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    Something went wrong. Please try again or reach us on WhatsApp.
                  </motion.div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <motion.div
                    className="flex-1"
                    whileHover={{ scale: status === "submitting" ? 1 : 1.02 }}
                    whileTap={{ scale: status === "submitting" ? 1 : 0.98 }}
                  >
                    <Button
                      type="submit"
                      size="lg"
                      disabled={status === "submitting"}
                      className="w-full bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] text-white hover:opacity-90 transition-opacity py-7 rounded-full shadow-xl shadow-[#A259FF]/30 cursor-hover edge-glow disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <Send className="mr-2 w-5 h-5" />
                      {status === "submitting" ? "Sending…" : "Send Inquiry"}
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="button"
                      size="lg"
                      variant="outline"
                      onClick={handleWhatsAppClick}
                      className="w-full sm:w-auto border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all py-7 rounded-full cursor-hover liquid-glass-card"
                    >
                      <MessageCircle className="mr-2 w-5 h-5" />
                      WhatsApp
                    </Button>
                  </motion.div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
