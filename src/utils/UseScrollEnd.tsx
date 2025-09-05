import { useEffect, useState } from 'react';

/**
 * Custom hook to detect if the user has scrolled to the end of the page.
 * Returns true if at end, false otherwise.
 */
export function useScrollEnd(offset = 2): boolean {
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    function updateScrollIndicator() {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - offset) {
        setAtEnd(true);
      } else {
        setAtEnd(false);
      }
    }
    window.addEventListener('scroll', updateScrollIndicator);
    window.addEventListener('resize', updateScrollIndicator);
    updateScrollIndicator();
    return () => {
      window.removeEventListener('scroll', updateScrollIndicator);
      window.removeEventListener('resize', updateScrollIndicator);
    };
  }, [offset]);

  return atEnd;
}
