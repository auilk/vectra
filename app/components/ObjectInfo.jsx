"use client";

import { useShallow } from "zustand/react/shallow";
import { useSvgStore } from "../stores/svg-store";

/**
 * ObjectInfo component.
 *
 * Displays selected SVG element's details: name, position, and dimensions.
 *
 * @returns {JSX.Element}
 */
export default function ObjectInfo()
{
    const { elements, selected } = useSvgStore(useShallow((state) => 
        ({
            elements: state.elements,
            selected: state.selected,
        })
    ));

    return (
        <>
            {Object.keys(selected).length > 0 &&
                (<div className="absolute top-0 left-0 m-4 text-white text-sm">
                    <p>
                        <span className="font-bold">Selected: </span>
                        <span className="text-yellow-300">{selected.id}</span>
                    </p>

                    <p>
                        <span className="font-bold">position: </span>
                        <span className="text-yellow-300">(x: {(elements[selected.id].props.x).toFixed(3)}, y: {(elements[selected.id].props.y).toFixed(3)})</span>
                    </p>

                    <p>
                        <span className="font-bold">dimensions: </span>
                        <span className="text-yellow-300">(width: {(elements[selected.id].props.width).toFixed(3)}, height: {(elements[selected.id].props.height).toFixed(3)})</span>
                    </p>
                </div>)
            }
        </>
    );
}