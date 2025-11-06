import { ArrowDown, Github, Linkedin, Mail, Facebook, Code2, Sparkles, Heart, Zap, Star, Edit, Save, Loader2, X, Upload as UploadIcon, Pencil } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { ParticleBackground } from './ParticleBackground';
import { useHero } from './../contexts/HeroContext';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Toaster, toast } from 'sonner';
import { ClipboardPaste } from "lucide-react";
import { uploadImage } from "../components/utils/Upload";
import Cropper from "react-easy-crop";
import { useCallback } from "react";
import { getCroppedImg } from "../components/utils/CropUtils"; // helper we'll add next

interface HeroProps {
  admin?: boolean;
}

export function Hero({ admin = false }: HeroProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const { content, loading } = useHero();
  const { refreshContent } = useHero();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [closing, setClosing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    job_role: '',
    description: '',
    experience: 0,
    projects: 0,
    clients: 0,
    avatar_url: '',
    github_url: '',
    linkedin_url: '',
    facebook_url: '',
    email: '',
  });
  const textareaRefs = useRef<HTMLTextAreaElement[]>([]);

  const setTextareaRef = (el: HTMLTextAreaElement | null, index: number) => {
    if (el) textareaRefs.current[index] = el;
  };
 const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const handleFileSelect = (
    e?: React.ChangeEvent<HTMLInputElement> | string
  ) => {
    if (typeof e === "string") {
      // Case: user has an existing avatar URL
      setSelectedImage(e);
      setShowUploadModal(true);
      return;
    }

    // Case: user selects a new file
    const file = e?.target?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setSelectedImage(reader.result as string);
    reader.readAsDataURL(file);
    setShowUploadModal(true);
  };


  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropSave = async () => {
    if (!selectedImage || !croppedAreaPixels) return;

    setUploadingAvatar(true);

    try {
      // Get cropped image as data URL
      const croppedDataUrl = await getCroppedImg(selectedImage, croppedAreaPixels);

      // Convert dataURL to File
      const res = await fetch(croppedDataUrl);
      const blob = await res.blob();
      const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });
      console.log("Cropped file:", file);
      // Upload the file via provided function
      const url = await uploadImage(file);
      if (url) setFormData({ ...formData, avatar_url: url });

      setShowUploadModal(false);
      setSelectedImage(null);
    } catch (error) {
      console.error("Failed to upload avatar:", error);
    } finally {
      setUploadingAvatar(false);
    }
  };
  useEffect(() => {
    const adjustAll = () => {
      textareaRefs.current.forEach((el) => {
        if (el) {
          el.style.height = "auto";
          el.style.height = `${el.scrollHeight}px`;
        }
      });
    };

    adjustAll();
    window.addEventListener("resize", adjustAll);

    return () => window.removeEventListener("resize", adjustAll);
  }, [isEditing, formData]);

  useEffect(() => {
    if (content) {
      setFormData({
        name: content.name || '',
        job_role: content.job_role || '',
        description: content.description || '',
        experience: content.experience || 0,
        projects: content.projects || 0,
        clients: content.clients || 0,
        avatar_url: content.avatar_url || '',
        github_url: content.github_url || '',
        linkedin_url: content.linkedin_url || '',
        facebook_url: content.facebook_url || '',
        email: content.email || '',
      });
    }
  }, [content]);

  
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setIsEditing(false);
    }, 250); 
  };


  const handleSave = async () => {
    try {
      setSaving(true);

      const { error } = await supabase
        .from('hero_content')
        .update({
          name: formData.name,
          job_role: formData.job_role,
          description: formData.description,
          experience: formData.experience,
          projects: formData.projects,
          clients: formData.clients,
          avatar_url: formData.avatar_url,
          github_url: formData.github_url,
          linkedin_url: formData.linkedin_url,
          facebook_url: formData.facebook_url,
          email: formData.email,
        })
        .eq('id', 1);

      if (error) throw error;

      toast.success('✨ Hero info updated successfully!');
      
      // refresh content in context
      await refreshContent();
      handleClose();
    } catch (err) {
      toast.error('⚠️ Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section
      id="home"
      className="flex items-center justify-center relative overflow-hidden"
    >
      
      {/* ======= Editable Form Overlay ======= */}
      {/* {admin && isEditing && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setIsEditing(false)} // closes when clicking outside
        >
          <div
            className={`relative max-w-m bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 border border-gray-200 dark:border-gray-700 transition-all ${
              closing ? "animate-fadeOut" : "animate-fadeIn"
            }`}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <button
              disabled={saving}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
              onClick={handleClose}
            >
              ✕
            </button>

            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Edit Hero Info
            </h3>

            <div className="grid gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Years Experience</label>
                <input
                  type="number"
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                  className="no-spinner w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Projects</label>
                <input
                  type="number"
                  value={formData.projects}
                  onChange={(e) =>
                    setFormData({ ...formData, projects: e.target.value })
                  }
                  className="no-spinner w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Clients</label>
                <input
                  type="number"
                  value={formData.clients}
                  onChange={(e) =>
                    setFormData({ ...formData, clients: e.target.value })
                  }
                  className="no-spinner w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <Button
                disabled={saving}
                variant="ghost"
                onClick={handleClose}
                className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Cancel
              </Button>
              <Button
                variant="default"
                disabled={saving}
                onClick={handleSave}
                className={`flex gap-1 items-center px-4 py-2 rounded-md bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-700 hover:to-red-800 transition shadow-md ${
                  saving ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {saving ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" /> Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} /> Save
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )} */}


      {/* Geometric background patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-red-950/20 dark:to-purple-950/20">
        {/* Diagonal stripes */}
        <div className="absolute inset-0 opacity-30 dark:opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-200/20 via-transparent to-purple-200/20 transform -skew-y-12" />
        </div>
        
        {/* Geometric shapes */}
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 border-4 border-red-400/20 dark:border-red-600/20 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ type: "tween", duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 border-4 border-purple-400/20 dark:border-purple-600/20"
          style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-64 h-64 border-4 border-pink-400/20 dark:border-pink-600/20"
          style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
          animate={{ rotate: 360, y: [-20, 20, -20] }}
          transition={{ type: "tween", duration: 15, repeat: Infinity }}
        />
      </div>

      <ParticleBackground />
      <div className="container mx-auto px-6 py-20 relative z-10">
        {/* ======= Floating Admin Buttons ======= */}
        {admin && (
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            {!isEditing ? (
              <Button
                variant="outline"
                className="flex items-center gap-2 text-red-600 dark:text-gray-300 border-red-600  dark:border-gray-300  hover:bg-red-500"
                onClick={() => setIsEditing(true)}
              >
                <Edit size={16} /> Edit
              </Button>
            ) : (
              <>
                <Button
                  disabled={saving}
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-700 hover:to-red-800"
                >
                  {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save size={16} />}
                  {saving ? 'Saving...' : 'Save'}
                </Button>
                <Button
                  disabled={saving}
                  variant="outline"
                  className="flex items-center gap-2 border-gray-400 text-gray-700 dark:text-gray-300"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: content?.name || '',
                      job_role: content?.job_role || '',
                      description: content?.description || '',
                      experience: content?.experience || 0,
                      projects: content?.projects || 0,
                      clients: content?.clients || 0,
                      avatar_url: content?.avatar_url || '',
                      github_url: content?.github_url || '',
                      linkedin_url: content?.linkedin_url || '',
                      facebook_url: content?.facebook_url || '',
                      email: content?.email || '',
                    });
                  }}
                >
                  <X size={16} /> Cancel
                </Button>
              </>
            )}
          </div>
        )}
        
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              className="inline-block"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ type: "tween", duration: 2, repeat: Infinity }}
            >
              <span className="px-4 py-2 bg-gradient-to-r from-red-500 to-purple-500 text-white rounded-full text-sm inline-flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Available for Freelance
              </span>
            </motion.div>

            <div>
              <motion.h1 
                className="mb-4 relative inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="relative text-sm z-10 dark:text-white">Hi, I'm </span>
                <br />
                {isEditing ? (
                  <input
                    type="text"
                    disabled={!isEditing || saving}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="px-2 py-1 pr-12 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent shadow-b-red-500 outline-none dark:text-white "
                  />
                ) : (
                  <span className="bg-gradient-to-r from-red-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {loading ? 'Loading...' : content?.name}
                  </span>
                )}
              </motion.h1>
              
              <motion.div
                className="flex items-center gap-3 mb-6 flex-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="h-px w-12 bg-gradient-to-r from-red-500 to-transparent" />

                <h2 className="text-gray-700 dark:text-gray-300 flex-1">
                  {isEditing ? (
                    <textarea
                      ref={(el) => setTextareaRef(el, 0)}
                      disabled={!isEditing || saving}
                      value={formData.job_role}
                      onChange={(e) => {
                        setFormData({ ...formData, job_role: e.target.value });
                      }}
                      rows={1}
                      className="px-2 py-1 pr-12 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent shadow-b-red-500 outline-none dark:text-white w-full resize-none overflow-hidden transition-all duration-200"
                      style={{
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                      }}
                    />
                  ) : (
                    <span className="whitespace-pre-wrap break-words">
                      {loading ? "Loading..." : content?.job_role}
                    </span>
                  )}
                </h2>
              </motion.div>

            </div>
            
            <motion.p
              className="text-gray-600 dark:text-white text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {isEditing ? (
               <textarea
                  ref={(el) => setTextareaRef(el, 2)}
                  disabled={!isEditing || saving}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="px-2 py-1 pr-12 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent shadow-b-red-500 outline-none dark:text-white w-full resize-none overflow-hidden transition-all duration-200"
                />
              ) : (
                <span >
                  {loading ? 'Loading...' : content?.description}
                </span>
              )}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => scrollToSection('projects')} 
                  size="lg"
                  className="dark:text-white bg-gradient-to-r from-red-600 via-purple-600 to-pink-600 hover:from-red-700 hover:via-purple-700 hover:to-pink-700 shadow-xl group"
                >
                  View My Work
                  <Star className="w-4 h-4 ml-2 group-hover:rotate-180 transition-transform" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => scrollToSection('contact')} 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-red-600 dark:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 backdrop-blur-sm"
                >
                  Get In Touch
                </Button>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className={`flex-wrap gap-2 ${ isEditing ? "grid" : "flex"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {[
                { key: "github_url", icon: <Github size={18} />, placeholder: "GitHub URL", color: "hover:bg-red-500", default: "https://github.com" },
                { key: "linkedin_url", icon: <Linkedin size={18} />, placeholder: "LinkedIn URL", color: "hover:bg-blue-500", default: "https://linkedin.com" },
                { key: "facebook_url", icon: <Facebook size={18} />, placeholder: "Facebook URL", color: "hover:bg-purple-500", default: "https://facebook.com" },
                { key: "email", icon: <Mail size={18} />, placeholder: "Email Address", color: "hover:bg-pink-500", default: "" },
              ].map((social, index) => {
                const href =
                  social.key === "email"
                    ? formData.email
                      ? `mailto:${formData.email}`
                      : undefined
                    : formData[social.key] || social.default;

                return (
                 <motion.div
                    key={index}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    {isEditing ? (
                      
                      <div className="relative flex items-center w-full">
                        
                      <div
                        className={`p-3 mr-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:text-white ${social.color} transition-all`}
                        // whileHover={{ scale: 1.1, y: -5 }}
                        // whileTap={{ scale: 0.9 }}
                        // animate={{ y: [0, -5, 0] }}
                        // transition={{
                        //   y: { type: "tween", duration: 2, repeat: Infinity, delay: index * 0.2 },
                        // }}
                      >
                        {social.icon}
                      </div>
                        <input
                          type="text"
                          value={formData[social.key] ?? ""}
                          onChange={(e) =>
                            setFormData({ ...formData, [social.key]: e.target.value })
                          }
                          placeholder={social.placeholder}
                          className="px-3 py-2 pr-12 bg-transparent outline-none dark:text-white text-gray-900 w-full shadow-b-red-500 rounded-md border border-gray-300 dark:border-gray-700 transition-all"
                        />

                        <button
                          type="button"
                          title="Paste link"
                          onClick={async (e) => {
                            e.preventDefault()
                            try {
                              const text = await navigator.clipboard.readText();
                              setFormData({ ...formData, [social.key]: text });
                            } catch (err) {
                              console.error("Clipboard access denied:", err);
                            }
                          }}
                          className={`absolute right-2 p-2 rounded-lg transition-all flex items-center justify-center ${
                            formData[social.key]
                              ? "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600" 
                              : "bg-red-500 hover:bg-red-600 text-white shadow-md"
                          }`}
                        >
                          <ClipboardPaste
                            size={18}
                            className="transition-transform duration-200 hover:scale-110"
                          />
                        </button>
                      </div>
                    ) : (
                      <motion.a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:text-white ${social.color} transition-all`}
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          y: { type: "tween", duration: 2, repeat: Infinity, delay: index * 0.2 },
                        }}
                      >
                        {social.icon}
                      </motion.a>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>

          </motion.div>

          {/* Right side - 3D Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              className="relative"
              style={{ perspective: 1000 }}
            >
              {/* Main card with glassmorphism */}
              <motion.div
                className="relative bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-3xl p-8 shadow-2xl"
                // whileHover={{ rotateY: 5, rotateX: 5 }}
                transition={{ type: "spring" }}
              >
                {/* Avatar */}
                <motion.div
                    className="mb-6 relative flex flex-col items-center"
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(239, 68, 68, 0.3)",
                          "0 0 40px rgba(168, 85, 247, 0.5)",
                          "0 0 20px rgba(236, 72, 153, 0.3)",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {!isEditing ? (
                        <>
                          <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-red-500 via-purple-500 to-pink-500 p-1 overflow-hidden">
                            <img
                              src={formData.avatar_url || '👨‍💻'}
                              alt="Avatar"
                              className="w-full h-full object-cover rounded-full"
                            />
                          </div>
                          <motion.div
                            className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-yellow-400 rounded-full p-3"
                            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                            transition={{ type: "tween", duration: 2, repeat: Infinity }}
                          >
                            <Sparkles className="w-6 h-6 text-white" />
                          </motion.div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center gap-3 relative">
                          <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-red-500 via-purple-500 to-pink-500 p-1 overflow-hidden">
                            <img
                              src={formData.avatar_url || '👨‍💻'}
                              alt="Avatar"
                              className="w-full h-full object-cover rounded-full"
                            />
                          </div>
                          <button
                            onClick={() => {
                              if (formData.avatar_url) {
                                handleFileSelect(formData.avatar_url);
                              } else {
                                setShowUploadModal(true);
                              }
                            }}
                            className="absolute p-2 bottom-4 right-4 flex items-center rounded-full bg-gradient-to-br from-red-500 via-purple-500 to-pink-500 text-white border border-transparent hover:text-red-600 hover:border-red-500"
                          >
                            <Pencil size={16} /> 
                          </button>
                        </div>
                      )}
                    </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { key: 'experience', value: content?.experience ?? '2', label: 'Years Exp', icon: '🚀' },
                    { key: 'projects', value: content?.projects ?? '10', label: 'Projects', icon: '💼' },
                    { key: 'clients', value: content?.clients ?? '5', label: 'Happy Clients', icon: '😊' },
                    { key: 'support', value: '24/7', label: 'Support', icon: '⚡', readonly: true },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.key}
                      className="bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30 backdrop-blur-sm rounded-2xl p-4 border border-white/20 dark:border-gray-700/50"
                      whileHover={{ scale: 1.05}}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      // transition={{ delay: 0.1 }}
                    >
                      <div className="text-3xl mb-2">{stat.icon}</div>
                      <div className="text-gray-900 dark:text-white mb-1 flex items-center">
                        {isEditing && !stat.readonly ? (
                          <>
                            <input
                              type="number"
                              disabled={saving}
                              value={formData[stat.key] ?? stat.value}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  [stat.key]: e.target.value,
                                })
                              }
                              className="px-2 py-1 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent outline-none dark:text-white transition-all duration-200 inline-block w-auto text-left shadow-b-red-500"
                              style={{
                                width: `${String(formData[stat.key] ?? stat.value).length + 2.15}ch`,
                              }}
                            />
                            <span className="text-gray-900 dark:text-white select-none">+</span>
                          </>
                        ) : (
                          <span>
                            {loading ? 'Loading...' : `${stat.value}${stat.readonly ? '' : '+'}`}
                          </span>
                        )}
                      </div>

                      <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

              </motion.div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-6 -left-6 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl p-4 shadow-xl"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ type: "tween", duration: 3, repeat: Infinity }}
              >
                <Code2 className="w-8 h-8 text-white" />
              </motion.div>
              <motion.div
                className="absolute -bottom-6 -right-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl p-4 shadow-xl"
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ type: "tween", duration: 4, repeat: Infinity }}
              >
                <Heart className="w-8 h-8 text-white" fill="currentColor" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      {/* <motion.button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-red-600 dark:text-red-400"
        animate={{ 
          y: [0, 10, 0]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        whileHover={{ scale: 1.1 }}
      >
        <span className="text-sm">Scroll</span>
        <ArrowDown size={24} />
      </motion.button> */}

      {showUploadModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative bg-white dark:bg-gray-900 dark:bg-gray-900/40 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-3xl shadow-2xl w-full max-w-l p-6 flex flex-col gap-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-4 right-4 z-50 text-gray-500 hover:text-red-500 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {!selectedImage ? (
              <div
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => setSelectedImage(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
                onDragOver={(e) => e.preventDefault()}
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-2xl p-8 cursor-pointer hover:border-pink-500 transition-all duration-300"
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                <UploadIcon className="w-10 h-10 mb-1 text-red-500" />
                <p className="text-gray-600 w-64 dark:text-gray-300 text-center">
                  Drag & drop an image here, or click to select
                </p>

                {/* Hidden file input */}
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {/* Upload button (trigger file input) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent triggering parent div click
                    document.getElementById("fileInput")?.click();
                  }}
                  className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow hover:opacity-90 flex items-center gap-2"
                >
                  <UploadIcon className="w-5 h-5" /> Upload Avatar
                </button>
              </div>

            ) : (
              <>
                {/* Cropper Section */}
                <div className="relative w-full h-72 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <Cropper
                    image={selectedImage}
                    crop={crop}
                    zoom={zoom}
                    showGrid={true}
                    aspect={1}
                    cropShape="round"
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-4">
                  {/* Hidden file input */}
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  <button
                    onClick={(e) => {
                    e.stopPropagation(); // prevent triggering parent div click
                    document.getElementById("fileInput")?.click();
                  }}
                    className="py-2 px-4 rounded-lg border dark:text-white border-gray-300 dark:border-gray-600 hover:border-red-600 hover:text-red-600 flex items-center gap-2 transition transition"
                  >
                    <UploadIcon size={16} /> Reupload
                  </button>
                  <button
                    onClick={handleCropSave}
                    disabled={uploadingAvatar}
                    className="py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg flex items-center gap-2 transition"
                  >
                    {uploadingAvatar ? (
                      <>
                        <Loader2 className="animate-spin w-4 h-4" /> Uploading...
                      </>
                    ) : (
                      <>
                        <Save size={16} /> Save
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}

    </section>
  );
  
}
