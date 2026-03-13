import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-2xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              QKart.
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              Your premium destination for modern tech, home essentials, and lifestyle products.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://github.com/NawabIkram/Responsive-frontend-portfolio-project-.git" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/nawab-ikram-74a206395" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:nawabikram786@gmail.com" className="text-gray-400 hover:text-red-500 transition-colors">
                <Mail size={20} />
              </a>
              <a href="https://twitter.com/nawabikram" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Shop</h3>
            <ul className="space-y-3">
              <li><Link to="/?category=Electronics" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Electronics</Link></li>
              <li><Link to="/?category=Home" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Home & Living</Link></li>
              <li><Link to="/?category=Gaming" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Gaming</Link></li>
              <li><Link to="/?category=Photography" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Photography</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Contact</Link></li>
              <li><Link to="/careers" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/privacy" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Terms of Service</Link></li>
              <li><Link to="/shipping" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Returns</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} QKart, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
