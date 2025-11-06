import { JSX, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Moon,
  Sun,
  Menu,
  X,
  LayoutDashboard,
  User,
  Code,
  Briefcase,
  Mail,
  LogOut,
  Loader2,
} from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "../ThemeProvider";
import { useUser } from "../../contexts/UserContext";
import { RotatingLines } from "react-loader-spinner";

export function AdminSidebar({ sections, activeSection, setActiveSection }: any) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false); // ✅ For logout animation
  const { theme, toggleTheme } = useTheme();
  const { logout } = useUser();

  // ✅ Handle Logout with animation
  const handleLogout = async () => {
    setLoggingOut(true);
    await new Promise((resolve) => setTimeout(resolve, 800)); // Add a small delay for the animation
    await logout();
    // window.location.href = "/admin/login";
  };

  // ✅ Detect screen size and auto-collapse on small screens
  useEffect(() => {
    const checkScreen = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setCollapsed(true);
      } else {
        setIsMobile(false);
        setMenuOpen(false);
        setCollapsed(false);
      }
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const icons: Record<string, JSX.Element> = {
    hero: <User size={18} />,
    about: <LayoutDashboard size={18} />,
    skills: <Code size={18} />,
    projects: <Briefcase size={18} />,
    contact: <Mail size={18} />,
  };

  return (
    <>
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 60 : 200 }}
        transition={{ duration: 0.3 }}
        className={`sticky top-0 flex flex-col h-screen bg-gray-900 dark:bg-gray-800 text-gray-200 border-r border-gray-700 shadow-lg`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-700">
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.h2
                key="title"
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.1, ease: "circInOut" }}
                className="text-lg font-semibold px-3 dark:text-white"
              >
                Administrator
              </motion.h2>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => setCollapsed(!collapsed)}
            className="text-black p-2 text-sm rounded-md dark:text-gray-300 bg-transparent bg-gradient-to-r hover:from-red-500 hover:to-pink-500 cursor-pointer hover:text-white justify-center"
          >
            <AnimatePresence mode="wait" initial={false}>
              {collapsed ? (
                <motion.div
                  key="menu"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <Menu size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="close"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <X size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-4 px-3 space-y-2">
          {sections.map((section: any) => (
            <motion.button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center w-full gap-3 mb-3 px-2 py-2 text-sm font-medium rounded-md transition-all cursor-pointer
                ${
                  activeSection === section.id
                    ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md"
                    : "bg-gradient-to-r hover:from-red-500 hover:to-pink-500 transition-colors duration-300 dark:text-gray-300 hover:text-white dark:hover:text-white"
                }
                ${collapsed ? "justify-center" : "justify-start"}
              `}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                key={`icon-${section.id}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {icons[section.id] || <LayoutDashboard size={18} />}
              </motion.div>

              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    key={`label-${section.id}`}
                    initial={{ opacity: 0, x: -25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, ease: "circInOut" }}
                    className="truncate"
                  >
                    {section.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </nav>

        {/* Footer Controls */}
        <div className="border-t py-4 px-3 border-gray-700 flex flex-col gap-4">
          <Button
            onClick={toggleTheme}
            className={`w-full flex text-black bg-transparent items-center px-4 py-2 justify-start not-even:gap-2 dark:text-gray-300 cursor-pointer hover:text-white bg-gradient-to-r hover:from-red-500 hover:to-pink-500
              ${collapsed ? "justify-center" : "justify-start"}`}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            {!collapsed && (
              <span> {theme === "light" ? "Dark Mode" : "Light Mode"}</span>
            )}
          </Button>

          <Button
            onClick={handleLogout}
            disabled={loggingOut}
            className={`w-full flex dark:text-gray-300 cursor-pointer items-center px-4 py-2 justify-start not-even:gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:text-white hover:bg-red-600 
              ${collapsed ? "justify-center" : "justify-start"}
              ${loggingOut ? "opacity-75 cursor-not-allowed" : ""}
            `}
          >
            {loggingOut ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                {!collapsed && <span>Signing out...</span>}
              </>
            ) : (
              <>
                <LogOut size={18} />
                {!collapsed && <span>Logout</span>}
              </>
            )}
          </Button>
        </div>
      </motion.aside>

      {/* 🪄 Logout Overlay (optional blur effect) */}
      
      <AnimatePresence>
        {/* 🌀 Global Loading Overlay (Initial or Redirecting) */}
          {loggingOut && (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm text-white">
            <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="60" visible={true} />
            <p className="text-lg font-medium">
             Signing out...
            </p>
          </div>
          )}
      </AnimatePresence>
    </>
  );
}
