import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export default function InfoPage() {
  const location = useLocation();
  const path = location.pathname.replace('/', '');
  
  const titles: Record<string, string> = {
    'careers': 'Careers at QKart',
    'blog': 'QKart Blog',
    'privacy': 'Privacy Policy',
    'terms': 'Terms of Service',
    'shipping': 'Shipping Policy',
    'returns': 'Returns & Refunds'
  };

  const title = titles[path] || 'Information';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-gray-100"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-8">
          {title}
        </h1>
        
        <div className="prose prose-indigo max-w-none text-gray-600 space-y-6">
          <p className="text-lg">
            Welcome to the {title} page. This is a placeholder section for demonstration purposes.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Introduction</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. General Information</h2>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          
          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li>Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</li>
            <li>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</li>
            <li>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Contact Us</h2>
          <p>
            If you have any questions regarding this information, please contact us at <a href="mailto:nawabikram786@gmail.com" className="text-indigo-600 hover:underline">nawabikram786@gmail.com</a>.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
