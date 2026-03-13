import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  key?: string | number;
  product: {
    _id: string;
    name: string;
    image: string;
    price: number;
    rating: number;
    numReviews: number;
    countInStock: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product details
    addToCart({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty: 1,
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_20px_40px_-10px_rgba(6,81,237,0.15)] transition-all duration-500 border border-gray-100/50 overflow-hidden flex flex-col"
    >
      <Link to={`/product/${product._id}`} className="flex-grow flex flex-col">
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100/50 p-6 flex items-center justify-center">
          <motion.img
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            src={product.image}
            alt={product.name}
            className="object-contain w-full h-full drop-shadow-xl"
            referrerPolicy="no-referrer"
          />
          
          {/* Quick Add Button */}
          {product.countInStock > 0 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
              <button
                onClick={handleAddToCart}
                className="bg-white/90 backdrop-blur-md text-gray-900 shadow-lg px-4 py-2 rounded-full font-semibold text-sm flex items-center space-x-2 hover:bg-indigo-600 hover:text-white transition-colors"
              >
                <ShoppingBag size={16} />
                <span>Quick Add</span>
              </button>
            </div>
          )}
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center space-x-1 mb-2">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.numReviews})</span>
          </div>
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2 mb-1 leading-tight">
            {product.name}
          </h3>
          <div className="mt-auto pt-4 flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900 tracking-tight">${product.price.toFixed(2)}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
