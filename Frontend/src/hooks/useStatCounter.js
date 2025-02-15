import { useEffect, useRef, useState } from 'react';

export const useStatCounter = (endValue, duration = 2000, suffix = '+') => {
    const [value, setValue] = useState(0);
    const elementRef = useRef(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                let startTimestamp = null;
                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    const currentValue = Math.floor(progress * endValue);
                    setValue(currentValue);
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    }
                };
                window.requestAnimationFrame(step);
                observer.disconnect();
            }
        }, { threshold: 0.5 });

        observer.observe(element);

        return () => observer.disconnect();
    }, [endValue, duration]);

    return { value, suffix, ref: elementRef };
}; 