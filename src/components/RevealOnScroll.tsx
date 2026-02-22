import { useEffect, useRef, useState } from 'react';

interface Props {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    className?: string;
    delay?: number;
    direction?: "up" | "left" | "right";
}

export const RevealOnScroll = ({ children, width = "fit-content", className = "", delay = 0, direction = "up" }: Props) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    const getInitialTransform = () => {
        switch (direction) {
            case "left": return "opacity-0 -translate-x-12";
            case "right": return "opacity-0 translate-x-12";
            case "up":
            default: return "opacity-0 translate-y-12";
        }
    };

    const getVisibleTransform = () => {
        return "opacity-100 translate-x-0 translate-y-0";
    };

    return (
        <div
            ref={ref}
            style={{ width, transitionDelay: `${delay}ms` }}
            className={`transition-all duration-500 ease-[cubic-bezier(0.17,0.55,0.55,1)] transform ${isVisible ? getVisibleTransform() : getInitialTransform()
                } ${className}`}
        >
            {children}
        </div>
    );
};
