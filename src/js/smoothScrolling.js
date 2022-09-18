
import { refs } from './refs'

export function smoothScrolling() {
    const { height: cardHeight } =
      refs.gallery.firstElementChild.getBoundingClientRect();
  
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }