import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { Code2, Server, Wrench, Sparkles } from 'lucide-react';

export function Skills() {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: <Code2 className="w-6 h-6" />,
      skills: [
        { name: 'React', emoji: '⚛️', level: 95 },
        { name: 'TypeScript', emoji: '📘', level: 90 },
        { name: 'Next.js', emoji: '▲', level: 88 },
        { name: 'Tailwind', emoji: '🎨', level: 92 },
        { name: 'Vue.js', emoji: '💚', level: 85 },
      ],
      gradient: 'from-red-500 to-red-600',
      color: 'red',
    },
    {
      title: 'Backend',
      icon: <Server className="w-6 h-6" />,
      skills: [
        { name: 'Node.js', emoji: '🟢', level: 90 },
        { name: 'Python', emoji: '🐍', level: 85 },
        { name: 'PostgreSQL', emoji: '🐘', level: 88 },
        { name: 'MongoDB', emoji: '🍃', level: 86 },
        { name: 'REST APIs', emoji: '🔌', level: 92 },
      ],
      gradient: 'from-purple-500 to-purple-600',
      color: 'purple',
    },
    {
      title: 'Tools',
      icon: <Wrench className="w-6 h-6" />,
      skills: [
        { name: 'Git', emoji: '📦', level: 95 },
        { name: 'Docker', emoji: '🐳', level: 82 },
        { name: 'AWS', emoji: '☁️', level: 80 },
        { name: 'Figma', emoji: '🎨', level: 90 },
        { name: 'CI/CD', emoji: '🔄', level: 85 },
      ],
      gradient: 'from-pink-500 to-pink-600',
      color: 'pink',
    },
  ];

  const languages = [
    { name: 'JavaScript', emoji: '🟨', color: 'from-yellow-400 to-yellow-500' },
    { name: 'TypeScript', emoji: '🔷', color: 'from-blue-500 to-blue-600' },
    { name: 'Python', emoji: '🐍', color: 'from-green-500 to-blue-500' },
    { name: 'Java', emoji: '☕', color: 'from-red-500 to-orange-500' },
    { name: 'C++', emoji: '⚙️', color: 'from-blue-600 to-purple-600' },
    { name: 'Go', emoji: '🔵', color: 'from-cyan-500 to-blue-500' },
    { name: 'Rust', emoji: '🦀', color: 'from-orange-500 to-red-500' },
    { name: 'Ruby', emoji: '💎', color: 'from-red-600 to-pink-500' },
  ];

  return (
    <section id="skills" className="py-32 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-red-300 dark:bg-red-700 rounded-full filter blur-3xl opacity-10"
          animate={{ scale: [1, 1.2, 1], rotate: 360 }}
          transition={{ type: "tween", duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 border-2 border-purple-300 dark:border-purple-700 opacity-10"
          style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="mb-2 bg-gradient-to-r from-red-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Skills & Expertise
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Technologies I love working with
                </p>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-8 h-8 text-red-500" />
              </motion.div>
            </div>
          </motion.div>

          {/* Skills with progress bars - Unique card layout */}
          <div className="grid lg:grid-cols-3 gap-6 mb-16">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Card with diagonal cut */}
                <div className="relative bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden">
                  {/* Colored header with icon */}
                  <div className={`bg-gradient-to-br ${category.gradient} p-6 text-white relative overflow-hidden`}>
                    <motion.div
                      className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
                      transition={{ type: "tween", duration: 3, repeat: Infinity }}
                    />
                    <div className="relative flex items-center gap-3">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {category.icon}
                      </motion.div>
                      <h3 className="text-white">{category.title}</h3>
                    </div>
                  </div>

                  {/* Skills list with progress bars */}
                  <div className="p-6 space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{skill.emoji}</span>
                            <span className="text-gray-900 dark:text-white">{skill.name}</span>
                          </div>
                          <span className="text-gray-500 dark:text-gray-400 text-sm">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${category.gradient} rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: skillIndex * 0.1 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Programming Languages - Circular layout */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-center mb-8 text-gray-900 dark:text-white">
              Programming Languages
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {languages.map((lang, index) => (
                <motion.div
                  key={index}
                  className="group relative"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, type: "spring" }}
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  <motion.div
                    className={`absolute -inset-1 bg-gradient-to-br ${lang.color} rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity`}
                  />
                  <div className="relative bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-2xl p-6 min-w-[120px] text-center">
                    <motion.div
                      className="text-4xl mb-2"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ type: "tween", duration: 2, repeat: Infinity, delay: index * 0.1 }}
                    >
                      {lang.emoji}
                    </motion.div>
                    <div className="text-gray-900 dark:text-white">{lang.name}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Experience timeline */}
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-center mb-12 text-gray-900 dark:text-white">
              Experience Journey
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 via-purple-500 to-pink-500 transform -translate-x-1/2" />
              
              {[
                { year: '2023-Present', title: 'Senior Developer', company: 'Tech Corp' },
                { year: '2021-2023', title: 'Full Stack Dev', company: 'StartupXYZ' },
                { year: '2019-2021', title: 'Frontend Dev', company: 'WebAgency' },
              ].map((exp, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center gap-8 mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="inline-block bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-2xl p-6">
                      <div className="text-red-600 dark:text-red-400 mb-2">{exp.year}</div>
                      <h4 className="text-gray-900 dark:text-white mb-1">{exp.title}</h4>
                      <div className="text-gray-600 dark:text-gray-400">{exp.company}</div>
                    </div>
                  </div>
                  
                  <motion.div
                    className="w-4 h-4 bg-gradient-to-br from-red-500 to-purple-500 rounded-full relative z-10"
                    whileHover={{ scale: 2 }}
                  />
                  
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
