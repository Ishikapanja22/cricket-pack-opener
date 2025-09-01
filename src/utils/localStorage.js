export const save = (key, value) => localStorage.setItem(key, JSON.stringify(value))
export const load = (key, fallback=null) => {
const raw = localStorage.getItem(key)
try{ return raw ? JSON.parse(raw) : fallback } catch { return fallback }
}