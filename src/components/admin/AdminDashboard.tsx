import { useEffect, useState } from "react";
import { AdminSidebar } from "../admin/AdminSidebar";
import { Hero } from "./../Hero";
import { About } from "./../About";
import { Skills } from "./../Skills";
import { Projects } from "./../Projects";
import { Contact } from "./../Contact";
import { HeroProvider } from "../../contexts/HeroContext";
import { supabase } from "../../lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { SESSION_DURATION_MS } from "../../constants/sessionConfig";
import { SESSION_CHECK_INTERVAL_MS } from "../../constants/sessionConfig";
import { LoadingOverlay } from "../common/LoadingOverlay"; 

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("hero");
  const [sessionExpired, setSessionExpired] = useState(false);
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);

  const sections = [
    { id: "hero", label: "Hero" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const checkSession = () => {
      const loginTime = localStorage.getItem("login_time");
      if (loginTime) {
        const elapsed = Date.now() - parseInt(loginTime, 10);
        if (elapsed > SESSION_DURATION_MS) {
          setSessionExpired(true);
        } else {
          setTimeout(() => setLoading(false), 600); // 👈 smoother
        }
      } else {
        window.location.href = "/admin/login";
      }
    };
    checkSession();
    const interval = setInterval(checkSession, SESSION_CHECK_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);


  const handleSessionLogout = async () => {
    setRedirecting(true);
    setSessionExpired(false);
    setTimeout(async () => {
      await supabase.auth.signOut();
      localStorage.removeItem("login_time");
      // window.location.href = "/admin/login";
    }, 800);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* ✅ Use reusable loading overlay */}
      <LoadingOverlay
        visible={redirecting}
        message={"Signing out..."}
      />

      <AdminSidebar
        sections={sections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main
        className={`flex-1 p-6 transition-all duration-300 ${
          sessionExpired || loading ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <HeroProvider>
          {activeSection === "hero" && <Hero admin />}
        </HeroProvider>
        {activeSection === "about" && <About  />}
        {activeSection === "skills" && <Skills  />}
        {activeSection === "projects" && <Projects />}
        {activeSection === "contact" && <Contact />}
      </main>

      {/* 🟢 Session Expired Modal */}
      <AnimatePresence>
        {sessionExpired && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-80 text-center"
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                Session Expired
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Your session has expired. Please log in again to continue.
              </p>
              <button
                onClick={handleSessionLogout}
                className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-2 rounded-md hover:from-red-700 hover:to-pink-700 transition"
              >
                OK
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
