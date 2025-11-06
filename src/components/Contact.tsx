import { useState } from 'react';
import { Mail, MapPin, Phone, Send, MessageCircle, Clock, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { motion } from 'motion/react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: 'alex@example.com',
      link: 'mailto:alex@example.com',
      gradient: 'from-red-500 to-red-600',
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Location',
      value: 'San Francisco, CA',
      link: null,
      gradient: 'from-pink-500 to-pink-600',
    },
  ];

  return (
    <section id="contact" className="py-32 bg-gradient-to-br from-gray-50 to-red-50/20 dark:from-gray-950 dark:to-red-950/10 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-red-300 dark:bg-red-700 rounded-full filter blur-3xl opacity-10"
          animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }}
          transition={{ type: "tween", duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-72 h-72 bg-purple-300 dark:bg-purple-700 rounded-full filter blur-3xl opacity-10"
          animate={{ x: [0, -40, 0], y: [0, -40, 0], scale: [1, 1.3, 1] }}
          transition={{ type: "tween", duration: 15, repeat: Infinity }}
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-full"
              animate={{ y: [0, -5, 0] }}
              transition={{ type: "tween", duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 text-red-500" />
              <span className="text-gray-600 dark:text-gray-400">Let's Connect</span>
            </motion.div>
            <h2 className="mb-4 bg-gradient-to-r from-red-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Have a project in mind? Let's create something amazing together!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left side - Contact info & features */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Contact cards */}
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                >
                  <motion.div
                    className={`absolute -inset-1 bg-gradient-to-r ${info.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity`}
                  />
                  <div className="relative bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex items-start gap-4">
                    <motion.div
                      className={`bg-gradient-to-br ${info.gradient} text-white p-3 rounded-xl`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {info.icon}
                    </motion.div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400 text-sm mb-1">{info.label}</div>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className="text-gray-900 dark:text-white">{info.value}</div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Features card */}
              <motion.div
                className="bg-gradient-to-br from-red-500 to-purple-500 rounded-3xl p-8 text-white relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.2, 0.1] }}
                  transition={{ type: "tween", duration: 4, repeat: Infinity }}
                />
                <h4 className="mb-6 text-white">Why work with me?</h4>
                <div className="space-y-4">
                  {[
                    { icon: <Clock />, text: 'Fast turnaround time' },
                    { icon: <MessageCircle />, text: 'Clear communication' },
                    { icon: <CheckCircle />, text: '100% satisfaction guaranteed' },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                      >
                        {feature.icon}
                      </motion.div>
                      <span className="text-white/90">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right side - Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-3xl p-8 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-gray-900 dark:text-white mb-2">
                      Your Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-red-500 dark:focus:border-red-400 rounded-xl h-12"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-gray-900 dark:text-white mb-2">
                      Your Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-red-500 dark:focus:border-red-400 rounded-xl h-12"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-gray-900 dark:text-white mb-2">
                      Your Message
                    </label>
                    <Textarea
                      name="message"
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      required
                      className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-red-500 dark:focus:border-red-400 rounded-xl resize-none"
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-red-600 via-purple-600 to-pink-600 hover:from-red-700 hover:via-purple-700 hover:to-pink-700 rounded-xl h-14 text-lg shadow-xl group"
                    >
                      <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                      Send Message
                    </Button>
                  </motion.div>

                  <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                    I'll respond within 24 hours ⚡
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
