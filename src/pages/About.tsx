import { motion } from 'framer-motion';
import { Mail, Briefcase, Code, Layout, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
          About Us
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          We are passionate developers dedicated to crafting exceptional digital experiences. 
          Available for hire to bring your ideas to life.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center"
        >
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Code size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Web Development</h3>
          <p className="text-gray-600">
            Building responsive, high-performance web applications using modern technologies like React, Node.js, and Tailwind CSS.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center"
        >
          <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Layout size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">UI/UX Design</h3>
          <p className="text-gray-600">
            Creating intuitive and beautiful user interfaces that provide seamless and engaging user experiences.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center"
        >
          <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Smartphone size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Mobile Apps</h3>
          <p className="text-gray-600">
            Developing cross-platform mobile applications that work flawlessly on both iOS and Android devices.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-gray-900 rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[50%] -right-[10%] w-[70%] h-[150%] bg-gradient-to-bl from-indigo-500/30 to-transparent rounded-full blur-3xl transform rotate-12"></div>
        </div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <Briefcase className="w-12 h-12 text-indigo-400 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Available for Hire</h2>
          <p className="text-lg text-gray-300 mb-8">
            Looking for a passionate developer to join your team or build your next project? 
            Let's discuss how we can work together to achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="mailto:nawabikram786@gmail.com"
              className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors flex items-center space-x-2"
            >
              <Mail size={20} />
              <span>Email Me</span>
            </a>
            <Link 
              to="/contact"
              className="bg-transparent border border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors"
            >
              Contact Form
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
