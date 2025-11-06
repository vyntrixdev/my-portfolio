import { Github, Linkedin, Mail, Twitter, Heart, Code2 } from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Github size={20} />, href: 'https://github.com', label: 'GitHub', color: 'hover:text-red-400' },
    { icon: <Linkedin size={20} />, href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: <Twitter size={20} />, href: 'https://twitter.com', label: 'Twitter', color: 'hover:text-purple-400' },
    { icon: <Mail size={20} />, href: 'mailto:alex@example.com', label: 'Email', color: 'hover:text-pink-400' },
  ];

  return (
    <footer className="bg-gray-950 text-white py-12 relative overflow-hidden border-t-2 border-red-500/20">
      {/* Background decoration */}
      <motion.div 
        className="absolute top-0 left-1/4 w-64 h-64 bg-red-500 rounded-full filter blur-3xl opacity-5"
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-5"
        animate={{ scale: [1, 1.3, 1], x: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Logo/Brand */}
            <div className="flex items-center gap-2 mb-4">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Code2 className="w-8 h-8 text-red-400" />
              </motion.div>
              <span className="text-xl bg-gradient-to-r from-red-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                John Vincent Vicena
              </span>
            </div>

            {/* Social Links */}
            <div className="flex gap-6">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${link.color} transition-colors p-2 rounded-full bg-white/5 hover:bg-white/10`}
                  aria-label={link.label}
                  whileHover={{ scale: 1.2, rotate: 10, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ 
                    y: { duration: 2, repeat: Infinity, delay: index * 0.2 }
                  }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
            
            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent my-4" />
            
            {/* Copyright */}
            <div className="text-center text-gray-300">
              <div className="flex items-center justify-center gap-2 mb-2">
                © {currentYear} John Vincent Vicena. Made with 
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block"
                >
                  <Heart className="w-4 h-4 text-red-500" fill="currentColor" />
                </motion.span>
                and lots of ☕
              </div>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                Built with 
                <span className="text-red-400">React</span>, 
                <span className="text-purple-400">TypeScript</span> & 
                <span className="text-pink-400">Tailwind CSS</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex gap-6 mt-4">
              {['Privacy', 'Terms', 'Contact'].map((item, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-gray-300 hover:text-red-400 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
