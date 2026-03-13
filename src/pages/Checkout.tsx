import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, MapPin, CreditCard, Check, ChevronRight } from 'lucide-react';

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState(() => localStorage.getItem('shippingAddress') || '');
  const [city, setCity] = useState(() => localStorage.getItem('shippingCity') || '');
  const [postalCode, setPostalCode] = useState(() => localStorage.getItem('shippingPostalCode') || '');
  const [country, setCountry] = useState(() => localStorage.getItem('shippingCountry') || '');
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<any>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    localStorage.setItem('shippingAddress', address);
    localStorage.setItem('shippingCity', city);
    localStorage.setItem('shippingPostalCode', postalCode);
    localStorage.setItem('shippingCountry', country);
  }, [address, city, postalCode, country]);

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/checkout');
    }
    if (cartItems.length === 0 && !orderSuccess) {
      navigate('/');
    }
  }, [user, navigate, cartItems, orderSuccess]);

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const submitOrder = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress: { address, city, postalCode, country },
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      
      setPlacedOrder({
        orderItems: cartItems,
        shippingAddress: { address, city, postalCode, country },
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        _id: data._id,
        createdAt: data.createdAt
      });
      
      setOrderSuccess(true);
      setShowToast(true);
      clearCart();
      
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      console.error('Error placing order', error);
      alert('Error placing order');
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess && placedOrder) {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center space-x-2 font-semibold"
            >
              <CheckCircle size={20} />
              <span>Order successfully placed!</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 sm:p-12 text-center text-white">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
              className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm"
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">Order Confirmed</h2>
            <p className="text-indigo-100 text-lg">Thank you for your purchase, {user?.name.split(' ')[0]}!</p>
          </div>
          
          <div className="p-8 sm:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Order Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Order Number</span>
                    <span className="font-semibold text-gray-900">#{placedOrder._id?.substring(0, 8).toUpperCase() || '10293847'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Date</span>
                    <span className="font-semibold text-gray-900">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Payment Method</span>
                    <span className="font-semibold text-gray-900 flex items-center">
                      <CreditCard size={14} className="mr-1" />
                      {placedOrder.paymentMethod}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mt-10 mb-6 border-b border-gray-100 pb-4">Shipping Information</h3>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-start">
                    <MapPin className="text-indigo-500 mt-1 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">{user?.name}</p>
                      <p className="text-gray-600 text-sm">{placedOrder.shippingAddress.address}</p>
                      <p className="text-gray-600 text-sm">{placedOrder.shippingAddress.city}, {placedOrder.shippingAddress.postalCode}</p>
                      <p className="text-gray-600 text-sm">{placedOrder.shippingAddress.country}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
                  <h4 className="font-bold text-indigo-900 mb-2">Estimated Delivery</h4>
                  <p className="text-indigo-700 font-medium text-lg">
                    {deliveryDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Order Summary</h3>
                <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                  {placedOrder.orderItems.map((item: any, index: number) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="relative h-16 w-16 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                          {item.qty}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{item.name}</p>
                        <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="font-semibold text-gray-900">
                        ${(item.qty * item.price).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-gray-100 text-sm bg-gray-50 p-6 rounded-2xl">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">${placedOrder.itemsPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium text-gray-900">{placedOrder.shippingPrice === 0 ? 'Free' : `$${placedOrder.shippingPrice.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Estimated Tax</span>
                    <span className="font-medium text-gray-900">${placedOrder.taxPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
                    <span className="text-base font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-extrabold text-indigo-600">${placedOrder.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={() => navigate('/orders')}
                className="bg-gray-900 text-white px-10 py-4 rounded-full font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200 inline-flex items-center space-x-2"
              >
                <span>View Order History</span>
                <ChevronRight size={20} />
              </button>
              <div className="mt-6">
                <button onClick={() => navigate('/')} className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const steps = [
    { id: 1, name: 'Shipping', icon: MapPin },
    { id: 2, name: 'Payment', icon: CreditCard },
    { id: 3, name: 'Review', icon: Check },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight text-center">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Forms & Stepper */}
        <div className="lg:col-span-7 xl:col-span-8">
          {/* Stepper */}
          <div className="mb-12 px-2 sm:px-6">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1.5 bg-gray-200 rounded-full -z-10"></div>
              <motion.div 
                className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1.5 bg-indigo-600 rounded-full -z-10"
                initial={{ width: '0%' }}
                animate={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              ></motion.div>
              
              {steps.map((s) => {
                const Icon = s.icon;
                const isActive = step === s.id;
                const isCompleted = step > s.id;
                
                return (
                  <div key={s.id} className="flex flex-col items-center relative">
                    <motion.div 
                      animate={{
                        scale: isActive ? 1.15 : 1,
                        backgroundColor: isActive || isCompleted ? '#4f46e5' : '#ffffff',
                        borderColor: isActive || isCompleted ? '#4f46e5' : '#e5e7eb',
                        color: isActive || isCompleted ? '#ffffff' : '#9ca3af'
                      }}
                      transition={{ duration: 0.4 }}
                      className="w-12 h-12 rounded-full flex items-center justify-center border-4 shadow-sm z-10"
                    >
                      {isCompleted ? <Check size={20} strokeWidth={3} /> : <Icon size={20} />}
                    </motion.div>
                    <span className={`absolute top-14 text-sm font-bold transition-colors duration-300 whitespace-nowrap ${isActive ? 'text-indigo-600' : isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                      {s.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Details</h2>
                  <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Street Address</label>
                      <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" placeholder="123 Main St" />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">City</label>
                        <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" placeholder="New York" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Postal Code</label>
                        <input type="text" required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" placeholder="10001" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Country</label>
                      <input type="text" required value={country} onChange={(e) => setCountry(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" placeholder="United States" />
                    </div>
                    <div className="pt-4">
                      <button type="submit" className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-md hover:shadow-lg flex items-center justify-center group">
                        <span>Continue to Payment</span>
                        <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
                    <label className={`flex items-center space-x-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'PayPal' ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'PayPal' ? 'border-indigo-600' : 'border-gray-300'}`}>
                        {paymentMethod === 'PayPal' && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />}
                      </div>
                      <input type="radio" name="paymentMethod" value="PayPal" checked={paymentMethod === 'PayPal'} onChange={(e) => setPaymentMethod(e.target.value)} className="hidden" />
                      <div className="flex-1">
                        <span className="block font-bold text-gray-900">PayPal</span>
                        <span className="block text-sm text-gray-500">Pay securely with your PayPal account</span>
                      </div>
                    </label>
                    
                    <label className={`flex items-center space-x-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'Credit Card' ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'Credit Card' ? 'border-indigo-600' : 'border-gray-300'}`}>
                        {paymentMethod === 'Credit Card' && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />}
                      </div>
                      <input type="radio" name="paymentMethod" value="Credit Card" checked={paymentMethod === 'Credit Card'} onChange={(e) => setPaymentMethod(e.target.value)} className="hidden" />
                      <div className="flex-1">
                        <span className="block font-bold text-gray-900">Credit Card</span>
                        <span className="block text-sm text-gray-500">Pay with Visa, Mastercard, or Amex</span>
                      </div>
                    </label>

                    <div className="flex space-x-4 pt-6">
                      <button type="button" onClick={() => setStep(1)} className="w-1/3 bg-white border border-gray-200 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors">Back</button>
                      <button type="submit" className="w-2/3 bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-md hover:shadow-lg flex items-center justify-center group">
                        <span>Review Order</span>
                        <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Order</h2>
                  <div className="space-y-8">
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-gray-900">Shipping Address</h3>
                        <button onClick={() => setStep(1)} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">Edit</button>
                      </div>
                      <p className="text-gray-600">{address}</p>
                      <p className="text-gray-600">{city}, {postalCode}</p>
                      <p className="text-gray-600">{country}</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-gray-900">Payment Method</h3>
                        <button onClick={() => setStep(2)} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">Edit</button>
                      </div>
                      <p className="text-gray-600 flex items-center">
                        <CreditCard size={18} className="mr-2 text-gray-400" />
                        {paymentMethod}
                      </p>
                    </div>

                    <div className="flex space-x-4 pt-4">
                      <button type="button" onClick={() => setStep(2)} className="w-1/3 bg-white border border-gray-200 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors">Back</button>
                      <button onClick={submitOrder} disabled={loading} className={`w-2/3 bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                        {loading ? (
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          'Place Order'
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Order Summary (Always visible) */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="relative h-16 w-16 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{item.name}</p>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="font-semibold text-gray-900">
                    ${(item.qty * item.price).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-100 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">${itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium text-gray-900">{shippingPrice === 0 ? 'Free' : `$${shippingPrice.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Estimated Tax</span>
                <span className="font-medium text-gray-900">${taxPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-100">
                <span className="text-base font-bold text-gray-900">Total</span>
                <span className="text-2xl font-extrabold text-gray-900">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
