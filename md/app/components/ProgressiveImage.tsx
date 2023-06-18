import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import 'react';
declare module 'react' {
    interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
        preload?: 'auto' | 'metadata' | 'none' | 'lazy';
    }
}

const ProgressiveImage = ({ src, placeholder, alt, className }) => {
    const [currentSrc, setCurrentSrc] = useState(placeholder);
    const [ref, inView] = useInView({
        triggerOnce: true,
    });

    useEffect(() => {
        if (inView) {
            const image = new Image();
            image.src = src;
            image.onload = () => {
                setCurrentSrc(src);
            };
        }
    }, [src, inView]);

    return <img src={currentSrc} alt={alt} className={className} ref={ref} preload="lazy" />;
};

export default ProgressiveImage;
