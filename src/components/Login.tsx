// import React, { useState } from 'react';
// import { ArrowLeft, Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

// interface LoginProps {
//   onBack: () => void;
// }

// const Login: React.FC<LoginProps> = ({ onBack }) => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     firstName: '',
//     lastName: '',
//     confirmPassword: ''
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle login/signup logic here
//     console.log('Form submitted:', formData);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="container mx-auto px-4">
//         <button
//           onClick={onBack}
//           className="flex items-center text-indigo-600 hover:text-indigo-700 mb-6"
//         >
//           <ArrowLeft size={20} className="mr-2" />
//           Back to Home
//         </button>

//         <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8 text-white text-center">
//             <h1 className="text-2xl font-bold mb-2">
//               {isLogin ? 'Welcome Back!' : 'Create Account'}
//             </h1>
//             <p className="opacity-90">
//               {isLogin ? 'Sign in to your account' : 'Join Mishika.co today'}
//             </p>
//           </div>

//           {/* Form */}
//           <div className="px-6 py-8">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {!isLogin && (
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       First Name
//                     </label>
//                     <div className="relative">
//                       <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                       <input
//                         type="text"
//                         name="firstName"
//                         value={formData.firstName}
//                         onChange={handleInputChange}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                         required={!isLogin}
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Last Name
//                     </label>
//                     <div className="relative">
//                       <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                       <input
//                         type="text"
//                         name="lastName"
//                         value={formData.lastName}
//                         onChange={handleInputChange}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                         required={!isLogin}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                   </button>
//                 </div>
//               </div>

//               {!isLogin && (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Confirm Password
//                   </label>
//                   <div className="relative">
//                     <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                     <input
//                       type="password"
//                       name="confirmPassword"
//                       value={formData.confirmPassword}
//                       onChange={handleInputChange}
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                       required={!isLogin}
//                     />
//                   </div>
//                 </div>
//               )}

//               {isLogin && (
//                 <div className="flex items-center justify-between">
//                   <label className="flex items-center">
//                     <input type="checkbox" className="mr-2" />
//                     <span className="text-sm text-gray-600">Remember me</span>
//                   </label>
//                   <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700">
//                     Forgot password?
//                   </a>
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition-colors"
//               >
//                 {isLogin ? 'Sign In' : 'Create Account'}
//               </button>
//             </form>

//             {/* Social Login */}
//             <div className="mt-6">
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-300" />
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-white text-gray-500">Or continue with</span>
//                 </div>
//               </div>

//               <div className="mt-6 grid grid-cols-2 gap-3">
//                 <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
//                   <svg className="w-5 h-5" viewBox="0 0 24 24">
//                     <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                     <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                     <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//                     <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//                   </svg>
//                   <span className="ml-2">Google</span>
//                 </button>
//                 <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
//                   </svg>
//                   <span className="ml-2">Facebook</span>
//                 </button>
//               </div>
//             </div>

//             {/* Toggle Form */}
//             <div className="mt-6 text-center">
//               <p className="text-gray-600">
//                 {isLogin ? "Don't have an account?" : "Already have an account?"}
//                 <button
//                   onClick={() => setIsLogin(!isLogin)}
//                   className="ml-1 text-indigo-600 hover:text-indigo-700 font-medium"
//                 >
//                   {isLogin ? 'Sign up' : 'Sign in'}
//                 </button>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React from 'react';

const LegalPolicies: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 text-gray-800">
      <section>
        <h2 className="text-2xl font-bold mb-2">Privacy Policy</h2>
        <p>
          We value your privacy. Any personal data collected on this site (e.g., name, email,
          address) is used only for order fulfillment and customer support. We do not share or sell
          your data to third parties. Data is stored securely and in compliance with applicable data
          protection laws.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-2">Business Policy</h2>
        <p>
          Our goal is to offer high-quality products and customer service. Orders are processed
          within 1-2 business days. We reserve the right to refuse or cancel any order due to
          inventory issues or suspected fraud. Prices and product availability are subject to change
          without notice.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-2">Refund & Return Policy</h2>
        <p>
          We offer a 7-day return policy for eligible products. To be eligible, items must be
          unused, in original packaging, and accompanied by proof of purchase. Perishable items,
          including groceries, are not returnable unless damaged or incorrect. Refunds are processed
          within 5-10 business days after inspection.
        </p>
        <p className="mt-2">
          To start a return, please contact our support team at <strong>support@example.com</strong>
          . Customers are responsible for return shipping unless the error was on our side.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
        <p>
          If you have questions regarding these policies, contact us at:
          <br />
          <strong>Email:</strong> misikashop@gmail.com
          <br />
          <strong>Phone:</strong> +91 8858484220
        </p>
      </section>
    </div>
  );
};

export default LegalPolicies;
