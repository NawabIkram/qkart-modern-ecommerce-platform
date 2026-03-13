import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, ArrowLeft } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    addToCart({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty,
    });
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center py-20">Product not found</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-indigo-600 mb-8 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Results
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50 shadow-sm border border-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            {product.name}
          </h1>
          
          <div className="flex items-center mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-gray-200 text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500">
              {product.numReviews} reviews
            </span>
          </div>

          <p className="text-3xl font-bold text-gray-900 mb-6">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-700 font-medium">Status</span>
              <span
                className={`font-semibold ${
                  product.countInStock > 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {product.countInStock > 0 && (
              <div className="flex items-center justify-between mb-6">
                <span className="text-gray-700 font-medium">Quantity</span>
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
              className={`w-full flex items-center justify-center py-4 px-8 rounded-xl font-bold text-lg transition-all shadow-md ${
                product.countInStock > 0
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="mr-2" size={24} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
