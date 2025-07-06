"use client";

import { useSvgStore } from "../stores/svg-store";

/**
 * SvgBounds component.
 *
 * Detects which SVG element was clicked for selection purposes.
 *
 * @returns {JSX.Element}
 */
export default function SvgBounds()
{
    const elements = useSvgStore((state) => (state.elements));

    return (
        <>
            {Object.entries(elements).map(([id, element]) => (
                <div
                    key={id}
                    className="absolute translate-1/2 cursor-pointer"
                    style={{
                        width: element.props.width,
                        height: element.props.height,
                        top: element.props.y,
                        left: element.props.x
                    }}
                    onClick={() => console.log("selected element:", id)}
                />
            ))}
        </>
    );
}