// supa.js — Supabaseヘルパ（進捗保存/読込、フィードバック投稿）
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";

export const supa = (SUPABASE_URL && SUPABASE_ANON_KEY)
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: true, autoRefreshToken: true } })
  : null;

export async function getUser() {
  if (!supa) return null;
  const { data: { user } } = await supa.auth.getUser();
  return user;
}

export async function signOut() {
  if (!supa) return;
  await supa.auth.signOut();
}

export async function saveProgress({ dayIndex, status, attempts, elapsedSeconds, lastAnswer }) {
  if (!supa) return false;
  const user = await getUser();
  if (!user) throw new Error("Not signed in");
  const row = {
    user_id: user.id,
    day_index: dayIndex,
    status: status || 'done',
    attempts: attempts ?? 1,
    elapsed_seconds: elapsedSeconds ?? 0,
    last_answer: lastAnswer ?? null,
    updated_at: new Date().toISOString()
  };
  const { error } = await supa.from('progress').upsert(row);
  if (error) throw error;
  return true;
}

export async function loadProgressAll() {
  if (!supa) return [];
  const user = await getUser();
  if (!user) return [];
  const { data, error } = await supa.from('progress')
    .select('day_index,status,attempts,elapsed_seconds')
    .eq('user_id', user.id)
    .order('day_index');
  if (error) throw error;
  return data || [];
}

export async function submitFeedback({ category, message }) {
  if (!supa) return false;
  const user = await getUser();
  const payload = { user_id: user?.id || null, category, message };
  const { error } = await supa.from('feedback').insert(payload);
  if (error) throw error;
  return true;
}
