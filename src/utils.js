// utils.js
export function debounce(fn, wait=200) {
  let t;
  return (...args)=> {
    clearTimeout(t);
    t = setTimeout(()=> fn.apply(this,args), wait);
  };
}
