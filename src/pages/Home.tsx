import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Filter, Star, Tag } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const category = searchParams.get('category') || '';
  
  const [sortBy, setSortBy] = useState('default');
  const [selectedCategory, setSelectedCategory] = useState(category);

  useEffect(() => {
    setSelectedCategory(category);
  }, [category]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products?keyword=${keyword}`);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword]);

  // Filter and sort products
  let displayedProducts = [...products];
  
  if (selectedCategory) {
    displayedProducts = displayedProducts.filter(p => p.category === selectedCategory);
  }

  if (sortBy === 'price-asc') {
    displayedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    displayedProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    displayedProducts.sort((a, b) => b.rating - a.rating);
  }

  const specialSaleProduct = products.find(p => p.name.includes('Sony WH-1000XM5')) || products[0];

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <div className="space-y-12">
      {!keyword && !category && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[2.5rem] overflow-hidden bg-gray-900 text-white shadow-2xl"
        >
          {/* Abstract background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[140%] bg-gradient-to-bl from-indigo-500/40 via-purple-500/20 to-transparent rounded-full blur-3xl transform rotate-12"></div>
            <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[100%] bg-gradient-to-tr from-blue-500/30 to-transparent rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 px-8 py-20 sm:px-16 sm:py-28 flex flex-col items-start justify-center max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-indigo-300 font-semibold tracking-wider uppercase text-sm mb-4"
            >
              New Collection
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-6 leading-[1.1]"
            >
              Design that <br className="hidden sm:block" /> speaks for itself.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg sm:text-xl text-gray-300 max-w-xl mb-10 font-medium"
            >
              Experience unparalleled quality and design with our curated selection of premium products.
            </motion.p>
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center space-x-2"
            >
              <span>Shop the Collection</span>
              <ArrowRight size={18} />
            </motion.button>
          </div>
        </motion.div>
      )}

      {!keyword && !category && specialSaleProduct && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-rose-100 to-orange-100 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between shadow-sm border border-rose-200/50"
        >
          <div className="max-w-xl mb-8 md:mb-0">
            <div className="flex items-center space-x-2 text-rose-600 font-bold mb-4 uppercase tracking-wider text-sm">
              <Tag size={18} />
              <span>Special Sale - 20% Off</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">{specialSaleProduct.name}</h2>
            <p className="text-gray-700 text-lg mb-6">{specialSaleProduct.description}</p>
            <div className="flex items-center space-x-4 mb-8">
              <span className="text-3xl font-black text-gray-900">${(specialSaleProduct.price * 0.8).toFixed(2)}</span>
              <span className="text-xl text-gray-400 line-through">${specialSaleProduct.price}</span>
            </div>
            <Link to={`/product/${specialSaleProduct._id}`} className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200">
              View Offer
            </Link>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 relative">
            <div className="absolute inset-0 bg-rose-200 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
            <img src={specialSaleProduct.image} alt={specialSaleProduct.name} className="relative z-10 w-full h-auto object-cover rounded-2xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500" />
          </div>
        </motion.div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0 space-y-8">
          <div className="bg-white/50 backdrop-blur-md rounded-3xl p-6 border border-gray-100 shadow-sm sticky top-24">
            <div className="flex items-center space-x-2 mb-6 text-gray-900 font-bold text-lg">
              <Filter size={20} />
              <span>Filters & Sorting</span>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Sort By</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input type="radio" name="sort" value="default" checked={sortBy === 'default'} onChange={(e) => setSortBy(e.target.value)} className="form-radio text-indigo-600 focus:ring-indigo-500" />
                    <span className="text-gray-700 group-hover:text-indigo-600 transition-colors">Featured</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input type="radio" name="sort" value="price-asc" checked={sortBy === 'price-asc'} onChange={(e) => setSortBy(e.target.value)} className="form-radio text-indigo-600 focus:ring-indigo-500" />
                    <span className="text-gray-700 group-hover:text-indigo-600 transition-colors">Price: Low to High</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input type="radio" name="sort" value="price-desc" checked={sortBy === 'price-desc'} onChange={(e) => setSortBy(e.target.value)} className="form-radio text-indigo-600 focus:ring-indigo-500" />
                    <span className="text-gray-700 group-hover:text-indigo-600 transition-colors">Price: High to Low</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input type="radio" name="sort" value="rating" checked={sortBy === 'rating'} onChange={(e) => setSortBy(e.target.value)} className="form-radio text-indigo-600 focus:ring-indigo-500" />
                    <span className="text-gray-700 group-hover:text-indigo-600 transition-colors">Customer Rating</span>
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat === 'All' ? '' : cat)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        (cat === 'All' && !selectedCategory) || cat === selectedCategory
                          ? 'bg-indigo-50 text-indigo-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
              {keyword ? `Search Results for "${keyword}"` : selectedCategory ? selectedCategory : 'All Products'}
            </h2>
            <span className="text-gray-500 text-sm font-medium">{displayedProducts.length} products</span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white/50 rounded-3xl p-5 border border-gray-100 shadow-sm">
                  <div className="bg-gray-200/50 animate-pulse aspect-[4/5] rounded-2xl mb-5"></div>
                  <div className="h-4 bg-gray-200/50 animate-pulse rounded-full w-1/3 mb-3"></div>
                  <div className="h-5 bg-gray-200/50 animate-pulse rounded-full w-3/4 mb-4"></div>
                  <div className="h-6 bg-gray-200/50 animate-pulse rounded-full w-1/4 mt-auto"></div>
                </div>
              ))}
            </div>
          ) : displayedProducts.length === 0 ? (
            <div className="text-center py-32 bg-white/50 rounded-3xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              <AnimatePresence>
                {displayedProducts.map((product: any) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
