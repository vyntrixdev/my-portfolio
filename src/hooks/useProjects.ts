// src/hooks/useProjects.ts
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Project, User } from '../types';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [user, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      if (ignore) return;
      setLoading(true);
      setError(null);

      try {
        const [projectsRes, userRes] = await Promise.all([
          supabase.from('projects').select('*').order('featured', { ascending: false }).order('id', { ascending: false }),
          supabase.from('user').select('*'),
        ]);

        if (projectsRes.error) throw new Error(projectsRes.error.message);
        if (userRes.error) throw new Error(userRes.error.message);

        if (!ignore) {
          setProjects(projectsRes.data ?? []);
          setUsers(userRes.data ?? []);
        }
      } catch (err: any) {
        if (!ignore) setError(err.message || 'Something went wrong');
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  return { projects, user, loading, error };
}
