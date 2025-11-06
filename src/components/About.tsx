import { Code2, Palette, Rocket, Users, Zap, Coffee, Star, Heart, Target, Award, Sparkles, Brain, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export function About() {
  const highlights = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable solutions',
      color: 'red',
      stats: '500+ commits/month',
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: 'Design Focus',
      description: 'Pixel-perfect, user-centric interfaces',
      color: 'purple',
      stats: '50+ designs',
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: 'Performance',
      description: 'Lightning-fast, optimized apps',
      color: 'pink',
      stats: '98% performance',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Collaboration',
      description: 'Team player and mentor',
      color: 'orange',
      stats: '20+ team projects',
    },
  ];

  const facts = [
    { icon: '☕', text: 'Coffee enthusiast', label: '∞ cups' },
    { icon: '🎨', text: 'Design lover', label: 'Always' },
    { icon: '🚀', text: 'Fast learner', label: '24/7' },
    { icon: '💡', text: 'Problem solver', label: 'Expert' },
  ];

  return (
    <section id="about" className="py-32 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-2 h-2 bg-red-500 rounded-full"
          animate={{ 
            y: [0, 100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 0 }}
        />
        <motion.div
          className="absolute top-40 right-20 w-2 h-2 bg-purple-500 rounded-full"
          animate={{ 
            y: [0, 120, 0],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 w-2 h-2 bg-pink-500 rounded-full"
          animate={{ 
            y: [0, 80, 0],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
        />
        
        {/* Floating shapes */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 border-2 border-red-200 dark:border-red-900/30 rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: 360,
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ type: "tween", duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-48 h-48 border-2 border-purple-200 dark:border-purple-900/30"
          style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
          animate={{ 
            rotate: -360,
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header with creative animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-gradient-to-r from-red-500/10 via-purple-500/10 to-pink-500/10 border border-red-200 dark:border-red-800 rounded-full"
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(239, 68, 68, 0.1)",
                  "0 0 40px rgba(168, 85, 247, 0.2)",
                  "0 0 20px rgba(236, 72, 153, 0.1)",
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-red-500" />
              </motion.div>
              <span className="text-gray-600 dark:text-gray-400">Get to know me</span>
              <h2 className="relative inline-block">
                <motion.span
                  className="relative z-10 bg-gradient-to-r from-red-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  About Me
                </motion.span>
              </h2>
            </motion.div>


            <motion.p
              className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              I'm a passionate full-stack developer with <span className="text-red-600 dark:text-red-400">5+ years of experience</span> creating 
              beautiful, functional web applications. I love turning complex problems into simple, elegant solutions.
            </motion.p>
          </motion.div>

          {/* Main content - Card grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Mission card */}
            <motion.div
              className="md:col-span-2 relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity"
              />
              <div className="relative bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-3xl p-8 overflow-hidden">
                {/* Animated gradient orb */}
                <motion.div
                  className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-red-500/20 to-purple-500/20 rounded-full blur-2xl"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: 360,
                  }}
                  transition={{ type: "tween", duration: 8, repeat: Infinity }}
                />
                
                <div className="relative flex items-start gap-6">
                  <motion.div
                    className="bg-gradient-to-br from-red-500 to-purple-500 p-4 rounded-2xl text-white shadow-xl"
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Target className="w-8 h-8" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="mb-3 text-gray-900 dark:text-white">My Mission</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      To create digital experiences that not only look stunning but solve real problems and make a positive 
                      impact on users' lives. I believe great design and clean code go hand in hand.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats/Achievements cards */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-3xl p-8 h-full">
                <motion.div
                  className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl text-white inline-block mb-4 shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Award className="w-8 h-8" />
                </motion.div>
                <h3 className="mb-3 text-gray-900 dark:text-white">5+ Years Excellence</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Delivered <span className="text-purple-600 dark:text-purple-400">100+ projects</span> with 
                  a perfect track record of client satisfaction.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span>Growing every day</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative group"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-3xl p-8 h-full">
                <motion.div
                  className="bg-gradient-to-br from-pink-500 to-red-500 p-4 rounded-2xl text-white inline-block mb-4 shadow-lg"
                  whileHover={{ scale: [1, 1.2, 0.9, 1.1, 1] }}
                  transition={{ type: "tween", duration: 0.5 }}
                >
                  <Brain className="w-8 h-8" />
                </motion.div>
                <h3 className="mb-3 text-gray-900 dark:text-white">Continuous Learning</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Always exploring new technologies and best practices to stay ahead in the ever-evolving tech landscape.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span>Never stop improving</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Highlight cards - 4 columns */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, rotate: 2 }}
              >
                <div className="relative bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-2xl p-6 h-full hover:border-transparent hover:shadow-2xl transition-all overflow-hidden">
                  {/* Animated gradient background on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 opacity-0 group-hover:opacity-5 transition-opacity`}
                  />
                  
                  <motion.div
                    className={`relative bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 text-white p-3 rounded-xl inline-block mb-4 shadow-lg`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    {item.icon}
                  </motion.div>
                  
                  <h4 className="mb-2 text-gray-900 dark:text-white">{item.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{item.description}</p>
                  
                  <div className={`inline-flex items-center gap-1 px-2 py-1 bg-${item.color}-50 dark:bg-${item.color}-900/20 rounded-full text-sm text-${item.color}-600 dark:text-${item.color}-400`}>
                    <Star className="w-3 h-3" fill="currentColor" />
                    <span>{item.stats}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Fun facts - Floating cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="mb-8 text-gray-900 dark:text-white">Quick Facts About Me</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {facts.map((fact, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    y: { type: "tween", duration: 2 + index * 0.5, repeat: Infinity },
                    opacity: { delay: index * 0.1, type: "spring" },
                    scale: { delay: index * 0.1, type: "spring" }
                  }}
                >
                  <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-2xl p-6 min-w-[160px] hover:border-red-500 dark:hover:border-red-400 transition-all shadow-lg hover:shadow-2xl">
                    <motion.div
                      className="text-4xl mb-2"
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{ type: "tween", duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    >
                      {fact.icon}
                    </motion.div>
                    <div className="text-gray-900 dark:text-white mb-1">{fact.text}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{fact.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
