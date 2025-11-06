import React from 'react';
import { motion } from 'framer-motion';
import { Github, Star, TrendingUp, Eye, ExternalLink, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useProjects } from '../hooks/useProjects';

export  function Projects() {
  const { projects, loading, error } = useProjects();

  // Loading and error states
  // if (loading) {
  //   return (
  //     <section
  //       id="projects"
  //       className="py-32 flex justify-center items-center text-gray-500 dark:text-gray-400"
  //     >
  //       Loading projects...
  //     </section>
  //   );
  // }

  // if (error) {
  //   return (
  //     <section
  //       id="projects"
  //       className="py-32 flex justify-center items-center text-red-500"
  //     >
  //       Failed to load projects: {error}
  //     </section>
  //   );
  // }
  // const projects = [
  //   {
  //     title: 'E-Commerce Platform',
  //     description: 'A full-featured e-commerce platform with payment integration, inventory management, and admin dashboard.',
  //     image: 'https://images.unsplash.com/photo-1758873271902-a63ecd5b5235?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMHByb2plY3R8ZW58MXx8fHwxNzYwNjg2MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  //     tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
  //     github: 'https://github.com',
  //     demo: 'https://example.com',
  //     gradient: 'from-red-500 to-purple-500',
  //     stats: { stars: 234, views: '12k', trending: true },
  //     featured: true,
  //   },
  //   {
  //     title: 'Task Management App',
  //     description: 'A collaborative task management application with real-time updates.',
  //     image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzYwNTk5MDM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  //     tags: ["Next.js", "TypeScript", "MongoDB"],
  //     github: 'https://github.com',
  //     demo: 'https://example.com',
  //     gradient: 'from-purple-500 to-pink-500',
  //     stats: { stars: 189, views: '8k', trending: false },
  //     featured: false,
  //   },
  //   {
  //     title: 'Portfolio Generator',
  //     description: 'An AI-powered portfolio website generator for developers.',
  //     image: 'https://images.unsplash.com/photo-1632144130358-6cfeed023e27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGNvZGluZyUyMHByb2plY3R8ZW58MXx8fHwxNzYwNjgwOTA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  //     tags: ['React', 'OpenAI', 'Tailwind'],
  //     github: 'https://github.com',
  //     demo: 'https://example.com',
  //     gradient: 'from-pink-500 to-red-500',
  //     stats: { stars: 412, views: '15k', trending: true },
  //     featured: false,
  //   },
  // ];

 return (
    <section
      id="projects"
      className="py-32 bg-gradient-to-br from-gray-50 to-red-50/30 dark:from-gray-950 dark:to-red-950/10 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">``
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                className="h-1 w-20 bg-gradient-to-r from-red-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              />
              <h2 className="bg-gradient-to-r from-red-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Featured Projects
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-lg">
              A curated selection of my recent work, showcasing creative solutions to complex challenges
            </p>
          </motion.div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.id || index}
                className={`group ${project.featured ? 'md:col-span-2 md:row-span-1' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden flex flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full"
                    >
                      <ImageWithFallback
                        src={project.image_url ?? ''}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <div className="flex gap-3">
                        {project.github_url && (
                          <motion.a
                            href={project.github_url}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="w-5 h-5 text-white" />
                          </motion.a>
                        )}
                        {project.demo_url && (
                          <motion.a
                            href={project.demo_url}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-5 h-5 text-white" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    {!!project.stats?.trending && (
                      <motion.div
                        className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg text-sm"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ type: "tween", duration: 2, repeat: Infinity }}
                      >
                        <TrendingUp className="w-3 h-3" />
                        Hot
                      </motion.div>
                    )}

                  </div>

                  {/* Stats */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-lg flex items-center gap-1 text-sm">
                      <Star className="w-3 h-3" fill="currentColor" />
                      {String(project.stats?.stars ?? 0)}
                    </div>
                    <div className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-lg flex items-center gap-1 text-sm">
                      <Eye className="w-3 h-3" />
                      {String(project.stats?.views ?? 0)}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="mb-3 text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(Array.isArray(project.tags) ? project.tags : typeof project.tags === 'string' ? [project.tags] : []).map((tag: string, i: number) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="border-gray-300 dark:border-gray-700 hover:border-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-full p-2 pr-6">
              <Button
                asChild
                className="bg-gradient-to-r from-red-600 via-purple-600 to-pink-600 hover:from-red-700 hover:via-purple-700 hover:to-pink-700 rounded-full"
              >
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 mr-2" />
                  View All Projects
                </a>
              </Button>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span>{projects.length}+ more on GitHub</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}