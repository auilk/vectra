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
    const { elements, selected, setSelected } = useSvgStore(useShallow((state) => 
        ({ 
            elements: state.elements,
            selected: state.selected,
            setSelected: state.setSelected 
        })
    ));

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
                    onClick={() => setSelected(id, element.props)}
                />
            ))}
        </>
    );
}