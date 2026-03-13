import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Search, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/?keyword=${keyword}`);
    } else {
      navigate('/');
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="sticky top-0 z-50 glass border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center gap-6">
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-2xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              QKart.
            </Link>
            <div className="hidden md:flex space-x-4 ml-4">
              <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">Home</Link>
              <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">About</Link>
              <Link to="/contact" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">Contact</Link>
            </div>
          </div>

          <div className="flex-1 max-w-xl px-8 hidden sm:block">
            <form onSubmit={submitHandler} className="relative group">
              <motion.div
                animate={{
                  boxShadow: isSearchFocused ? '0 0 0 2px rgba(99, 102, 241, 0.2)' : '0 0 0 0px rgba(99, 102, 241, 0)',
                }}
                className="relative rounded-full bg-gray-100/80 hover:bg-gray-200/80 transition-colors flex items-center"
              >
                <Search size={18} className={`ml-4 ${isSearchFocused ? 'text-indigo-500' : 'text-gray-400'} transition-colors`} />
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full bg-transparent py-2.5 pl-3 pr-10 focus:outline-none text-sm font-medium text-gray-900 placeholder-gray-500"
                  onChange={(e) => setKeyword(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
              </motion.div>
            </form>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/cart" className="relative text-gray-700 hover:text-indigo-600 transition-colors flex items-center group">
              <ShoppingBag size={22} className="group-hover:scale-110 transition-transform duration-300" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-1.5 -right-2 bg-indigo-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-sm"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </button>
                <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white/90 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                  <div className="p-2">
                    <div className="px-3 py-2 border-b border-gray-100 mb-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link to="/orders" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-lg transition-colors">
                      Order History
                    </Link>
                    <button
                      onClick={logout}
                      className="flex w-full items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-1"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
