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
export default function SvgCanvas()
{
    const elements = useSvgStore((state) => (state.elements));

    return (
        <svg className="w-full h-full">
            {Object.entries(elements).map(([id, element]) => (
                <rect
                key={id}
                {...element.props}
                fill="black"
                />
            ))}
        </svg>
    );
}
