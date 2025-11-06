import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Toaster, toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SESSION_DURATION_MS } from "../../constants/sessionConfig";
import { LoadingOverlay } from "../common/LoadingOverlay"; 

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCard, setShowCard] = useState(true);
  const [redirecting, setRedirecting] = useState(false);

  // ✅ Redirect to dashboard if session still valid
  useEffect(() => {
    const checkExistingSession = async () => {
      const { data } = await supabase.auth.getSession();
      const loginTime = localStorage.getItem('login_time');
      if (data.session && loginTime) {
        const elapsed = Date.now() - parseInt(loginTime, 10);
        if (elapsed < SESSION_DURATION_MS) {
          window.location.href = '/admin/dashboard';
        } else {
          await supabase.auth.signOut();
          localStorage.removeItem('login_time');
        }
      }
    };
    checkExistingSession();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error('Invalid email or password');
      setLoading(false);
    } else {
      setRedirecting(true);
      localStorage.setItem('login_time', Date.now().toString());
      toast.success('Login successful!');
      
      // ✅ Pop out before redirect
      setShowCard(false);
      setTimeout(() => {
        window.location.href = '/admin/dashboard';
      }, 600); // matches exit animation duration
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <AnimatePresence mode="wait">
        {showCard && (
          <motion.div
            key="login-card"
            initial={{ opacity: 0, scale: 0.5, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -25 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 w-full max-w-sm"
          >
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
              Admin Login
            </h2>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                />
              </div>

              {/* Password Field with Toggle */}
              <div >
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/4 right-2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                </div>
                
              </div>

              {/* Login Button */}
              <motion.div whileTap={{ scale: 0.96 }}>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-2 rounded-lg shadow-md hover:opacity-90"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        <LoadingOverlay
          visible={redirecting}
          message={"Signing in..."}
        />
      </AnimatePresence>
    </div>
  );
}
