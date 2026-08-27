"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Code, Palette, Rocket, Users } from "lucide-react";

const stats = [
  { number: "1+", label: "Projects Built" },
  { number: "5+", label: "Technologies" },
  { number: "100%", label: "Dedication" },
  { number: "∞", label: "Learning" },
];

const highlights = [
  {
    icon: Code,
    title: "Clean Code",
    description: "Writing maintainable, readable code that follows best practices.",
    color: "neon-blue",
  },
  {
    icon: Palette,
    title: "UI/UX Focus",
    description: "Creating clean, responsive interfaces that users enjoy.",
    color: "neon-pink",
  },
  {
    icon: Rocket,
    title: "Fast Learner",
    description: "Always exploring new technologies and improving my skills.",
    color: "neon-green",
  },
  {
    icon: Users,
    title: "Problem Solver",
    description: "Breaking down complex problems into simple, elegant solutions.",
    color: "neon-purple",
  },
];

// 3D tilt image component
function TiltImage({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [20, -20]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-20, 20]), {
    stiffness: 300,
    damping: 30,
  });
  const scale = useSpring(useTransform(y, [-0.5, 0.5], [1, 1.05]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
      className="perspective-1000"
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: -10 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-neon-pink font-medium text-sm tracking-wider uppercase">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Passionate About <span className="text-gradient">Building</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A dedicated developer who loves turning ideas into reality through code
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left - 3D Tilt Image */}
          <motion.div
            initial={{ opacity: 0, x: -60, rotateY: -20 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <TiltImage>
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Animated border */}
                <motion.div
                  animate={{
                    background: [
                      "linear-gradient(0deg, #00f0ff, #ff00e5, #39ff14, #00f0ff)",
                      "linear-gradient(120deg, #00f0ff, #ff00e5, #39ff14, #00f0ff)",
                      "linear-gradient(240deg, #00f0ff, #ff00e5, #39ff14, #00f0ff)",
                      "linear-gradient(360deg, #00f0ff, #ff00e5, #39ff14, #00f0ff)",
                    ],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-3xl p-[2px] glow-blue"
                >
                  <div className="w-full h-full rounded-3xl bg-dark" />
                </motion.div>
                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8" style={{ transform: "translateZ(50px)" }}>
                    <motion.div
                      className="text-7xl mb-4"
                      animate={{ rotateY: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      👨‍💻
                    </motion.div>
                    <p className="text-gray-400 text-sm">Your Photo Here</p>
                    <p className="text-gray-500 text-xs mt-1">Replace with your image</p>
                  </div>
                </div>
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [-8, 8, -8], rotateZ: [0, 10, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 p-4 glass-neon rounded-2xl glow-blue"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <span className="text-3xl">🚀</span>
                </motion.div>
                <motion.div
                  animate={{ y: [8, -8, 8], rotateZ: [0, -10, 10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -left-6 p-4 glass-neon rounded-2xl glow-pink"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <span className="text-3xl">⚡</span>
                </motion.div>
              </div>
            </TiltImage>
          </motion.div>

          {/* Right - Bio */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotateY: 20 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-6">
              Building digital experiences that{" "}
              <span className="text-gradient">make a difference</span>
            </h3>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                I&apos;m a Software Engineer based in Ludhiana, India. I enjoy building
                full-stack web applications using HTML, CSS, JavaScript, React, and SQL.
                I love solving real-world problems through code.
              </p>
              <p>
                Currently focused on sharpening my frontend and backend skills
                and working on projects like a gym membership management system.
                Always eager to learn and take on new challenges.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-5 mt-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25, rotateX: -15 }}
                  animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                  whileHover={{ scale: 1.05, rotateX: -5, rotateY: 5 }}
                  className="text-center p-4 glass-neon rounded-2xl glow-blue"
                >
                  <div className="text-3xl font-bold text-gradient mb-1">{stat.number}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Highlights Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotateX: -20 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
              whileHover={{
                y: -10,
                rotateX: -5,
                rotateY: 5,
                scale: 1.03,
              }}
              className="p-6 glass-neon rounded-2xl group transition-all duration-300"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                whileHover={{ scale: 1.15, rotateZ: 10 }}
                className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${item.color} to-${item.color}/50 flex items-center justify-center mb-4 shadow-lg`}
                style={{
                  boxShadow: `0 0 20px ${
                    item.color === "neon-blue"
                      ? "rgba(0,240,255,0.3)"
                      : item.color === "neon-pink"
                      ? "rgba(255,0,229,0.3)"
                      : item.color === "neon-green"
                      ? "rgba(57,255,20,0.3)"
                      : "rgba(191,0,255,0.3)"
                  }`,
                }}
              >
                <item.icon size={26} className="text-white" />
              </motion.div>
              <h4 className="text-lg font-bold mb-2 text-white">{item.title}</h4>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
