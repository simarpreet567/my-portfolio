"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Frontend",
    color: "neon-blue",
    skills: [
      { name: "HTML", level: 90 },
      { name: "CSS", level: 88 },
      { name: "JavaScript", level: 85 },
      { name: "React", level: 82 },
      { name: "Responsive Design", level: 80 },
    ],
  },
  {
    title: "Backend",
    color: "neon-pink",
    skills: [
      { name: "React (Full Stack)", level: 82 },
      { name: "SQL", level: 80 },
      { name: "REST APIs", level: 78 },
      { name: "Node.js", level: 70 },
      { name: "Database Design", level: 75 },
    ],
  },
  {
    title: "Tools & Concepts",
    color: "neon-green",
    skills: [
      { name: "Git", level: 80 },
      { name: "VS Code", level: 90 },
      { name: "npm", level: 82 },
      { name: "Chrome DevTools", level: 78 },
      { name: "Problem Solving", level: 85 },
    ],
  },
];

const techStack = [
  "HTML", "CSS", "JavaScript", "React", "SQL",
  "Git", "npm", "VS Code", "REST APIs", "JSON",
  "DOM Manipulation", "Responsive Design",
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 px-6 relative">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-neon-blue/5 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-neon-pink/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto relative" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: -10 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-neon-green font-medium text-sm tracking-wider uppercase">
            Skills & Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            My <span className="text-gradient">Tech Stack</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Technologies I use to build amazing products
          </p>
        </motion.div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotateX: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
              whileHover={{ y: -5, rotateX: -3 }}
              className="p-6 glass-neon rounded-2xl"
            >
              <h3 className="text-xl font-bold mb-6 text-gradient">
                {category.title}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill, j) => (
                  <div key={j}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 text-sm font-medium">
                        {skill.name}
                      </span>
                      <span className="text-gray-500 text-sm">{skill.level}%</span>
                    </div>
                    <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{
                          duration: 1.2,
                          delay: 0.5 + i * 0.15 + j * 0.1,
                          ease: "easeOut",
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-neon-blue via-neon-pink to-neon-green"
                        style={{
                          boxShadow: "0 0 10px rgba(0,240,255,0.4), 0 0 20px rgba(255,0,229,0.2)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Tags */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-xl font-semibold text-center mb-8">
            Technologies I Work With
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
                animate={isInView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
                transition={{ duration: 0.5, delay: 1 + i * 0.05 }}
                whileHover={{ scale: 1.1, y: -4, rotateX: -10 }}
                className="px-5 py-2.5 glass-neon rounded-xl text-sm text-gray-400 hover:text-neon-blue cursor-default transition-colors duration-300"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
