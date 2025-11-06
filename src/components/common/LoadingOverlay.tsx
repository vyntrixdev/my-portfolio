// src/components/common/LoadingOverlay.tsx
import { RotatingLines } from "react-loader-spinner";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
}

export function LoadingOverlay({ visible, message = "Loading..." }: LoadingOverlayProps) {
  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* 🌀 Loader appears instantly */}
          <RotatingLines
            strokeColor="white"
            strokeWidth="5"
            animationDuration="0.75"
            width="60"
            visible={true}
          />

          {/* 📝 Ensure text shows immediately */}
          <motion.p
            key={message}
            className="text-lg font-medium mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0 }}
          >
            {message}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
