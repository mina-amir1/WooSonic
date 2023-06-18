import React, { useState, useEffect, useRef } from 'react';

const StickyDiv = ({ children }) => {
  const [isSticky, setIsSticky] = useState(false);
  const stickyRef = useRef(null);
  const [initialRight, setInitialRight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition >= 100);
    };

    const calculateInitialRight = () => {
      if (stickyRef.current) {
        const rect = stickyRef.current.getBoundingClientRect();
        const right = window.innerWidth - rect.right;
        setInitialRight(right);
      }
    };

    calculateInitialRight();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', calculateInitialRight);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateInitialRight);
    };
  }, []);

  return (
    <div
      ref={stickyRef}
      className={`${isSticky ? 'fixed top-5' : ''}`}
      style={{ right: initialRight, boxShadow: isSticky ? '0 6px 13px 0 rgba(0,0,0,.4)' : 'none' }}

    >
      {children}
    </div>
  );
};

export default StickyDiv;
