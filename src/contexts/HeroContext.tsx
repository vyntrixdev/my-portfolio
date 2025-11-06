import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "../lib/supabase";

interface HeroContent {
  id: number;
  name: string;
  job_role: string;
  description: string;
  experience: number;
  projects: number;
  clients: number;
  avatar_url?: string;
  github_url?: string;
  linkedin_url?: string;
  facebook_url?: string;
  email?: string;
}

interface HeroContextType {
  content: HeroContent | null;
  loading: boolean;
  refreshContent: () => Promise<void>;
}

const HeroContext = createContext<HeroContextType | undefined>(undefined);

export function HeroProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchHeroContent = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("hero_content")
      .select("*")
      .eq("id", 1)
      .single();

    if (error) console.error("Error fetching hero content:", error);
    else setContent(data);

    setLoading(false);
  };

  useEffect(() => {
    fetchHeroContent();
  }, []);

  return (
    <HeroContext.Provider value={{ content, loading, refreshContent: fetchHeroContent }}>
      {children}
    </HeroContext.Provider>
  );
}

export function useHero() {
  const context = useContext(HeroContext);
  if (!context) throw new Error("useHero must be used within HeroProvider");
  return context;
}
