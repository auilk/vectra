"use client";

import { useSvgStore } from "../stores/svg-store";
import { useShallow } from "zustand/react/shallow"

/**
 * SvgBounds component.
 *
 * Detects which SVG element was clicked for selection purposes.
 *
 * @returns {JSX.Element}
 */
export default function SvgBounds()
{
    const { elements, selected, SetSelected } = useSvgStore(useShallow((state) => 
        ({ 
            elements: state.elements,
            selected: state.selected,
            SetSelected: state.SetSelected
        })
    ));

    return (
        <>
            {Object.entries(elements).map(([id, element]) => (
                <div
                    key={id}
                    className="absolute cursor-pointer border-2 border-transparent hover:border-amber-300 transition-[border-color]"
                    style={{
                        width: element.props.width,
                        height: element.props.height,
                        top: element.props.y + 8,
                        left: element.props.x + 8,
                        borderColor: selected.id === id ? "#ff2d00" : ""
                    }}
                    onClick={() => SetSelected(id)}
                />
            ))}
        </>
    );
}