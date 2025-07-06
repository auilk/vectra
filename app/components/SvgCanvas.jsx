"use client";

import { useSvgStore } from "../stores/svg-store";

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
