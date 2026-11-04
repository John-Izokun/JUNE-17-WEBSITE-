// Prints one document (the terms or the sample memo) instead of the whole page.
export function printOnly(cls: 'print-quote' | 'print-memo') {
  const root = document.documentElement
  const done = () => {
    root.classList.remove(cls)
    window.removeEventListener('afterprint', done)
  }
  root.classList.add(cls)
  window.addEventListener('afterprint', done)
  window.print()
}
