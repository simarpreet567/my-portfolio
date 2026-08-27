"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Gym Membership Management",
    description:
      "A full-stack web application for managing gym memberships, member registrations, payment tracking, and workout plans with a clean, responsive interface.",
    image: "🏋️",
    tags: ["HTML", "CSS", "JavaScript", "React", "SQL"],
    github: "https://github.com/simukhurana/gym-membership",
    live: "#",
    featured: true,
    gradient: "from-neon-blue/20 to-neon-pink/20",
  },
];

const filters = ["All", "Featured", "Frontend", "Backend"];

// 3D Card component
function Card3D({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), {
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
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.02 }}
      className={`perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Featured") return project.featured;
    if (activeFilter === "Frontend") {
      return project.tags.some((t) =>
        ["HTML", "CSS", "JavaScript", "React"].includes(t)
      );
    }
    if (activeFilter === "Backend") {
      return project.tags.some((t) => ["React", "SQL", "Node.js"].includes(t));
    }
    return true;
  });

  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: -10 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-neon-blue font-medium text-sm tracking-wider uppercase">
            My Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Here are some of my recent projects that showcase my skills
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.08, rotateX: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-neon-blue to-neon-pink text-dark font-bold glow-blue"
                  : "glass-neon text-gray-400 hover:text-white"
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
            >
              <Card3D className="h-full">
                <div className="group glass-neon rounded-2xl overflow-hidden h-full glow-blue hover:glow-pink transition-all duration-500">
                  {/* Project Image */}
                  <div
                    className={`relative h-52 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
                  >
                    <motion.span
                      className="text-7xl"
                      whileHover={{ scale: 1.2, rotateZ: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {project.image}
                    </motion.span>
                    {project.featured && (
                      <motion.span
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute top-4 right-4 px-3 py-1 bg-neon-pink/80 text-white text-xs rounded-full font-bold"
                      >
                        Featured
                      </motion.span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3
                      className="text-xl font-bold mb-3 text-gradient transition-all"
                    >
                      {project.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs rounded-lg bg-neon-blue/10 text-neon-blue border border-neon-blue/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 3 }}
                        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-neon-blue transition-colors"
                      >
                        <Github size={16} />
                        Code
                      </motion.a>
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 3 }}
                        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-neon-pink transition-colors"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                        <ArrowUpRight size={12} />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
