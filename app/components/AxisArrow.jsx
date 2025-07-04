"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AxisArrow component for moving SVG elements along a specified axis.
 * 
 * Renders an interactive arrow aligned to either the "x" or "y" axis,
 * used as a control handle in an SVG editor to move elements precisely.
 *
 * @param {Object} props - Component properties.
 * @param {"x"|"y"} [props.direction="x"] - Axis along which the arrow moves the SVG element. Must be "x" or "y".
 * @throws {Error} Throws if `direction` is not "x" or "y".
 * @returns {JSX.Element} JSX element representing the SVG axis arrow control.
 */
export default function AxisArrow({ direction = "y" })
{
    if (direction !== "x" && direction !== "y") throw new Error(`Invalid direction prop: "${direction}". Expected "x" or "y".`);

    const elementRef = useRef(null);
    const offset = useRef(0);

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

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
            className="absolute cursor-move z-1"
            style={{
                width: direction === "x" ? "60px" : "8px",
                height: direction === "x" ? "8px" : "60px",
                borderTopLeftRadius: direction === "x" ? "4px" : "0px",
                borderBottomRightRadius: direction === "x" ? "0px" : "4px",
                borderBottomLeftRadius: "4px",
                left: x,
                top: y,
                backgroundColor: direction === "x" ? "oklch(57.7% 0.245 27.325)" : "oklch(62.7% 0.194 149.214)"
            }}
            onMouseDown={(event) => 
                {
                    const rect = elementRef.current.getBoundingClientRect();
                    const parentRect = elementRef.current.parentElement.getBoundingClientRect();
                    console.log(parentRect.left);
                    if (direction === "x") offset.current = event.clientX - rect.left + parentRect.left;
                    else offset.current = event.clientY - rect.top + parentRect.top;
                    setIsDragging(true)
                }
            }
        >
            <div 
                className="border-12 border-transparent absolute -translate-y-1/3 pointer-events-none z-0"
                style={{
                    top: direction === "x" ? "0" : "-25%",
                    left: direction === "x" ? "88%" : "-100%",
                    borderLeftColor: direction === "x" ? "oklch(57.7% 0.245 27.325)" : "transparent",
                    borderBottomColor: direction === "x" ? "transparent" : "oklch(62.7% 0.194 149.214)",
                }}
            ></div>
        </div>
    );
}