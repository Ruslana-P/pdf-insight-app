import { useEffect, useState } from 'react';
import { APP_COPY } from '../../lib/constants';
import { ScrollToTopButton } from './ScrollToTop.styles';

const SHOW_AFTER_SCROLL_PX = 120;

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function updateVisibility() {
      setVisible(window.scrollY > SHOW_AFTER_SCROLL_PX);
    }

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateVisibility);
    };
  }, []);

  function handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <ScrollToTopButton
      type="button"
      $visible={visible}
      onClick={handleClick}
      aria-label={APP_COPY.scrollToTop}
    >
      ↑
    </ScrollToTopButton>
  );
}
