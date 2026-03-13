import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col font-sans relative selection:bg-indigo-500 selection:text-white">
      {/* Subtle background gradients */}
      <div className="fixed inset-0 z-[-1] bg-[#fbfbfd] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-60"></div>
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] bg-purple-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-60"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[40%] bg-pink-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-60"></div>
      </div>

      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full"
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
}
