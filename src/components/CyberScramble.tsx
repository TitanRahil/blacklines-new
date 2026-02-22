import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";

interface Props {
    text: string;
    className?: string;
    speed?: number;
}

export const CyberScramble = ({ text, className = "", speed = 30 }: Props) => {
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);
    const elementRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isScrambling) {
                    setIsScrambling(true);
                }
            },
            { threshold: 0.5 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [isScrambling]);

    useEffect(() => {
        if (!isScrambling) return;

        let iteration = 0;
        let interval: any = null;

        interval = setInterval(() => {
            setDisplayText(() =>
                text
                    .split("")
                    .map((originalChar, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        // Preserve spaces
                        if (originalChar === " ") return " ";
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(interval);
            }

            iteration += 1; // Faster reveal (1 char per tick instead of 0.5)
        }, speed);

        return () => clearInterval(interval);
    }, [isScrambling, text, speed]);

    return (
        <span ref={elementRef} className={className}>
            {displayText}
        </span>
    );
};
