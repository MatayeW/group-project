import { useId, useLayoutEffect, useRef, useState } from "react";
import styles from "./ExpandableText.module.css";

// A paragraph that is cut off after `lines` lines, with a "Read more" button, but only
// when the text really is that long. Short text shows in full with no button.
const ExpandableText = ({ text, lines = 3, className = "" }) => {
    const [expanded, setExpanded] = useState(false);
    const [canExpand, setCanExpand] = useState(false);
    const textRef = useRef(null);
    const textId = useId();

    // while cut off, check whether the text is taller than the box it is cut to
    useLayoutEffect(() => {
        const element = textRef.current;
        if (!element || expanded) return;

        const measure = () => setCanExpand(element.scrollHeight > element.clientHeight + 1);
        measure();

        const observer = new ResizeObserver(measure);
        observer.observe(element);
        return () => observer.disconnect();
    }, [text, lines, expanded]);

    return (
        <>
            <p
                id={textId}
                ref={textRef}
                className={`${expanded ? "" : styles.clamped} ${className}`}
                style={{ "--lines": lines }}
            >
                {text}
            </p>

            {(canExpand || expanded) && (
                <button
                    type="button"
                    className={styles.toggle}
                    onClick={() => setExpanded((current) => !current)}
                    aria-expanded={expanded}
                    aria-controls={textId}
                >
                    {expanded ? "Show less" : "Read more"}
                </button>
            )}
        </>
    );
};

export default ExpandableText;