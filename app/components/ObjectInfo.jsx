"use client";

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
    const selected = useSvgStore((state) => (state.selected));

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
                        <span className="text-yellow-300">(x: {(selected.props.x).toFixed(3)}, y: {(selected.props.y).toFixed(3)})</span>
                    </p>

                    <p>
                        <span className="font-bold">dimensions: </span>
                        <span className="text-yellow-300">(width: {(selected.props.width).toFixed(3)}, height: {(selected.props.height).toFixed(3)})</span>
                    </p>
                </div>)
            }
        </>
    );
}