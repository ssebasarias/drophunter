
import { CSSProperties } from 'react';

export const fadeIn = (delay: number = 0): CSSProperties => ({
  opacity: 0,
  animation: `fade-in 0.5s ease-out ${delay}s forwards`
});

export const slideInBottom = (delay: number = 0): CSSProperties => ({
  opacity: 0,
  transform: 'translateY(20px)',
  animation: `slide-in-bottom 0.5s ease-out ${delay}s forwards`
});

export const slideInRight = (delay: number = 0): CSSProperties => ({
  opacity: 0,
  transform: 'translateX(20px)',
  animation: `slide-in-right 0.5s ease-out ${delay}s forwards`
});

export const scaleIn = (delay: number = 0): CSSProperties => ({
  opacity: 0,
  transform: 'scale(0.95)',
  animation: `scale-in 0.5s ease-out ${delay}s forwards`
});

export const staggeredChildren = (selector: string, baseDelay: number = 0, interval: number = 0.1) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el, index) => {
    (el as HTMLElement).style.opacity = '0';
    (el as HTMLElement).style.animation = `fade-in 0.5s ease-out ${baseDelay + (index * interval)}s forwards`;
  });
};

export const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};

export const cardHoverEffect = {
  scale: 1.02,
  transition: { duration: 0.2 }
};
