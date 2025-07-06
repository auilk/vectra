"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AxisArrow component for moving SVG elements along a specified axis.
 * 
 * Renders an interactive arrow aligned to either the "x" or "y" axis,
 * used as a control handle in an SVG editor to move elements precisely.
 *
 * @param {Object} props - Component properties.
 * @param {"x"|"y"} [props.direction="y"] - Axis along which the arrow moves the SVG element.
 * @param {(value: number) => void} props.setX - Callback to update the X position of the SVG element.
 * @param {(value: number) => void} props.setY - Callback to update the Y position of the SVG element.
 * @throws {Error} Throws if `direction` is not "x" or "y".
 * @returns {JSX.Element} JSX element representing the SVG axis arrow control.
 */
export default function AxisArrow({ direction = "y" , setX, setY})
{
    if (direction !== "x" && direction !== "y") throw new Error(`Invalid direction prop: "${direction}". Expected "x" or "y".`);

    const elementRef = useRef(null);
    const offset = useRef(0);

    const [isDragging, setIsDragging] = useState(false);

    console.log("render");

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
            className="absolute select-none cursor-move"
            style={{
                width: direction === "x" ? "60px" : "8px",
                height: direction === "x" ? "8px" : "60px",
                borderTopLeftRadius: direction === "x" ? "4px" : "0px",
                borderBottomRightRadius: direction === "x" ? "0px" : "4px",
                borderBottomLeftRadius: "4px",
                left: direction === "x" ? "50%" : "50%",
                top: direction === "x" ? "50%" : "",
                bottom: direction === "x" ? "" : "50%",
                transform: direction === "x" ? "translate(10%, -50%)" : "translate(-50%, -10%)",
                backgroundColor: direction === "x" ? "oklch(57.7% 0.245 27.325)" : "oklch(62.7% 0.194 149.214)"
            }}
            onMouseDown={(event) => 
                {
                    const rect = elementRef.current.parentElement.getBoundingClientRect();
                    const parentRect = elementRef.current.parentElement.parentElement.getBoundingClientRect();
                    if (direction === "x") offset.current = event.clientX - rect.left + parentRect.left;
                    else offset.current = event.clientY - rect.top + parentRect.top;
                    setIsDragging(true);
                }
            }
        >
            <div 
                className="border-12 border-transparent absolute -translate-y-1/3 pointer-events-none"
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