// insertProject.ts
import { supabase } from '../lib/supabase';
import type { Project } from '../types';

export async function createProject(payload: Partial<Project>) {
  const { data, error } = await supabase
    .from('projects')
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return data;
}
