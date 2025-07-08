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
            const svgCanvasRect = elementRef.current.parentElement.parentElement.getBoundingClientRect();
            const gizmoOriginRect = elementRef.current.parentElement.getBoundingClientRect();

            if (direction === "x")
            {
                setX(event.clientX - svgCanvasRect.left - elements[selected.id].props.width / 2 - gizmoOriginRect.width / 2 - offset.current);
            }
            else
            {
                setY(event.clientY - svgCanvasRect.top - elements[selected.id].props.height / 2 + gizmoOriginRect.height / 2 + offset.current);
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
            console.log("deleted");
        }
    }, [isDragging]);
    
    return (
        <div
            ref={elementRef}
            className="absolute select-none"
            style={{
                width: direction === "x" ? "80px" : "30px",
                height: direction === "x" ? "30px" : "80px",
                top: direction === "x" ? "0px" : "",
                bottom : direction === "y" ? "100%" : "",
                left: direction === "x" ? "100%" : "0%",
                backgroundColor: direction === "x" ? "#FB2C36" : "#00C951",
                cursor: direction === "x" ? "col-resize" : "row-resize"
            }}
            onMouseDown={(event) =>
                {
                    if (direction === "x") offset.current = event.clientX - event.target.getBoundingClientRect().left;
                    else offset.current = event.target.getBoundingClientRect().height - event.clientY + event.target.getBoundingClientRect().top;
                    setIsDragging(true);
                }
            }
        ></div>
    );
}