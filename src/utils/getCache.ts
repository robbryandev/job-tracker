export default function getCache(cache: string) {
  if (typeof window != "undefined") {
    const val: string | null = localStorage.getItem(cache);
    return val;
  }
}
