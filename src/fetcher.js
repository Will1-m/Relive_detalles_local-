// fetcher.js
const URL_JSON = '../productos.json';
const CACHE_KEY = 'relive_productos';
const CACHE_TTL = 10 * 60 * 1000; // 10 minutos
export async function fetchProductos() {
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    if (cache && Date.now() - cache.ts < CACHE_TTL) return cache.data;
  } catch {}
  const resp = await fetch(URL_JSON);
  if (!resp.ok) throw new Error(`Error ${resp.status}`);
  const data = await resp.json();
  localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
  return data;
}
