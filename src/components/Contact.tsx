"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, MapPin, Send, Github, Linkedin, Twitter, Loader2, CheckCircle, AlertCircle } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "simukhurana0906@gmail.com",
    href: "mailto:simukhurana0906@gmail.com",
    color: "neon-blue",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Ludhiana, India",
    href: null,
    color: "neon-pink",
  },
];

const socials = [
  { icon: Github, href: "https://github.com/simukhurana", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/simukhurana", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/simukhurana", label: "Twitter" },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formState.name,
          from_email: formState.email,
          message: formState.message,
          to_name: "simukhurana",
        },
        publicKey
      );

      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative">
      {/* Background accent */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-pink/5 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 left-0 w-64 h-64 bg-neon-blue/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto relative" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: -10 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-neon-blue font-medium text-sm tracking-wider uppercase">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Let&apos;s <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Have a project in mind? Let&apos;s work together to bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotateY: -15 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Contact Cards */}
            {contactInfo.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -25, rotateX: -10 }}
                animate={isInView ? { opacity: 1, x: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                whileHover={{ x: 8, scale: 1.02 }}
                className="flex items-start gap-4 p-5 glass-neon rounded-2xl"
              >
                <div
                  className="p-3 rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${
                      item.color === "neon-blue" ? "#00f0ff" : "#ff00e5"
                    }, transparent)`,
                    boxShadow: `0 0 15px ${
                      item.color === "neon-blue" ? "rgba(0,240,255,0.3)" : "rgba(255,0,229,0.3)"
                    }`,
                  }}
                >
                  <item.icon size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-white hover:text-neon-blue transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Social Links */}
            <div>
              <p className="text-gray-500 text-sm mb-4">Find me on</p>
              <div className="flex gap-4">
                {socials.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 15, rotateX: -20 }}
                    animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.15, y: -6, rotateY: 10 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3.5 glass-neon rounded-2xl text-gray-400 hover:text-neon-blue transition-colors duration-300"
                    title={social.label}
                  >
                    <social.icon size={22} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: 15 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    className="w-full px-4 py-3.5 glass-neon rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-neon-blue/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    className="w-full px-4 py-3.5 glass-neon rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-neon-blue/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  className="w-full px-4 py-3.5 glass-neon rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-neon-blue/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(0,240,255,0.4)" }}
                whileTap={{ scale: 0.98 }}
                disabled={status === "sending"}
                className="w-full py-4 bg-gradient-to-r from-neon-blue to-neon-pink rounded-xl text-dark font-bold flex items-center justify-center gap-2 shadow-lg shadow-neon-blue/20 transition-all duration-300 disabled:opacity-70"
              >
                {status === "sending" && (
                  <>
                    Sending... <Loader2 size={18} className="animate-spin" />
                  </>
                )}
                {status === "success" && (
                  <>
                    Message Sent! <CheckCircle size={18} />
                  </>
                )}
                {status === "error" && (
                  <>
                    Failed to send <AlertCircle size={18} />
                  </>
                )}
                {status === "idle" && (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
