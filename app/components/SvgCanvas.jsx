"use client";

import { useSvgStore } from "../stores/svg-store";

/**
 * SvgCanvas component.
 *
 * Container that renders SVG elements.
 * Acts as the main SVG workspace.
 *
 * @returns {JSX.Element}
 */
export default function SvgCanvas({children, width, height})
{
    const elements = useSvgStore((state) => (state.elements));

    return (
        <div 
            className="w-full h-full relative"
            style={{
                width: width,
                height: height
            }}
        >
            <svg className="w-full h-full">
                {Object.entries(elements).map(([id, element]) => (
                    <rect
                    key={id}
                    {...element.props}
                    fill="black"
                    />
                ))}
            </svg>

            {children}
        </div>
    );
}
