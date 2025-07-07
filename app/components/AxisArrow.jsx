"use client";

import { useEffect, useRef, useState } from "react";
import { useSvgStore } from "../stores/svg-store";
import { useShallow } from "zustand/react/shallow";

/**
 * AxisArrow component for moving SVG elements along a specified axis.
 * 
 * Renders an interactive arrow aligned to either the "x" or "y" axis,
 * used as a control handle in an SVG editor to move elements precisely.
 *
 * @param {Object} props - Component properties.
 * @param {"x"|"y"} props.direction - Axis along which the arrow moves the SVG element.
 * @param {(value: number) => void} props.setX - Callback to update the X position of the SVG element.
 * @param {(value: number) => void} props.setY - Callback to update the Y position of the SVG element.
 * @throws {Error} Throws if `direction` is not "x" or "y".
 * @returns {JSX.Element} JSX element representing the SVG axis arrow control.
 */
export default function AxisArrow({ direction , setX, setY})
{
    if (direction !== "x" && direction !== "y") throw new Error(`Invalid direction prop: "${direction}". Expected "x" or "y".`);

    const elementRef = useRef(null);
    const offset = useRef(0);

    const [isDragging, setIsDragging] = useState(false);

    const { elements, selected } = useSvgStore(useShallow((state) => 
        ({
            elements: state.elements,
            selected: state.selected,
            SetElement: state.SetElement
        })
    ));

    useEffect(() =>
    {
        if (!isDragging) return;

        const HandleMouseMove = (event) =>
        {
            if (isDragging)
            {
                if (direction === "x") setX(event.clientX - offset.current);
                else setY(event.clientY - offset.current);
            }
        }

        const HandleMouseUp = () =>
        {
            setIsDragging(false);
        }

        window.addEventListener("mousemove", HandleMouseMove);
        window.addEventListener("mouseup", HandleMouseUp);

        return () =>
        {
            window.removeEventListener("mousemove", HandleMouseMove);
            window.removeEventListener("mouseup", HandleMouseUp);
        }
    }, [isDragging]);
    
    return (
        <div
            ref={elementRef}
            className="relative select-none cursor-move"
            style={{
                width: direction === "x" ? "55px" : "16px",
                height: direction === "x" ? "16px" : "55px",
            }}
            onMouseDown={(event) => 
                {
                    const rect = elementRef.current.parentElement.getBoundingClientRect();
                    if (direction === "x") offset.current = event.clientX - rect.left + elements[selected.id]?.props?.width / 2;
                    else if (direction === "y") offset.current = event.clientY - rect.top - rect.height + elements[selected.id]?.props?.height / 2 - 4;
                    setIsDragging(true);
                }
            }
        >
            <div
                className="bg-white absolute left-0 top-1/2 -translate-y-1/2 rounded-bl-[2px]"
                style={{
                    width: direction === "x" ? "40px" : "8px",
                    height: direction === "x" ? "8px" : "40px",
                    top: direction === "x" ? "50%" : "0",
                    translate: direction === "x" ? "0% -50%" : "50% 15px",
                    borderBottomRightRadius: direction === "x" ? "0px" : "2px",
                    borderTopLeftRadius: direction === "x" ? "2px" : "0px"
                }}
            ></div>

            <div 
                className="border-8 border-transparent border-l-white absolute left-10.5 top-0 scale-x-150"
                style={{
                    left: direction === "x" ? "44px" : "0px",
                    top: direction === "x" ? "0px" : "-5px",
                    rotate: direction === "x" ? "0deg" : "-90deg"
                }}
            ></div>
        </div>
    );
}