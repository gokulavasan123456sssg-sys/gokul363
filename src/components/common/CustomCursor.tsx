import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch desktop devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest('button, a, input, select, textarea, [role="button"]')
        );
        setIsPointer(isClickable);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* Central Crosshair Dot */}
      <div 
        className={`fixed -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 ${
          isPointer 
            ? 'h-4 w-4 bg-[#FF5A00] ring-4 ring-[#FF2020]/40 scale-125' 
            : 'h-2.5 w-2.5 bg-[#FF2020] shadow-[0_0_12px_#FF2020]'
        }`}
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      />
      {/* Outer Cinematic Ring */}
      <div 
        className={`fixed -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FF5A00]/50 transition-all duration-200 ease-out ${
          isPointer 
            ? 'h-12 w-12 border-[#FF9B24] scale-110 bg-[#FF2020]/10 backdrop-blur-[1px]' 
            : 'h-8 w-8 border-[#FF2020]/30'
        }`}
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      />
    </div>
  );
};
