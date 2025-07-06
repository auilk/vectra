"use client";

import { useCallback, useRef, useState } from "react";
import AxisArrow from "./AxisArrow";
import { useSvgStore } from "../stores/svg-store";
import { useShallow } from "zustand/react/shallow";

/**
 * MoveGizmo component for moving SVG elements.
 * 
 * Displays draggable arrows for X and Y axis movement.
 * Tracks and updates current position coordinates.
 * 
 * @returns {JSX.Element}
 */
export default function MoveGizmo()
{
    const elementRef = useRef(null);

    const { elements, selected, SetElement } = useSvgStore(useShallow((state) => 
        ({
            elements: state.elements,
            selected: state.selected,
            SetElement: state.SetElement
        })
    ));

    const setX = (x) =>
    {
        SetElement(selected.id, {...elements[selected.id].props, x: x - elements[selected.id]?.props?.width / 2 + 8 });
    }

    const setY = (y) =>
    {
        SetElement(selected.id, {...elements[selected.id].props, y: y - elements[selected.id]?.props?.height / 2 + 8});
    }

    return (
        <div
            ref={elementRef}
            className="w-8 h-8 shadow-[0px_0px_1px_2px] rounded-full shadow-amber-300 absolute -top-100 left-0 -translate-1/4 before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-amber-400 before:left-1/2 before:top-1/2 before:-translate-1/2 before:absolute"
            style={{
                top: `${elements[selected.id]?.props?.y + elements[selected.id]?.props?.height / 2}px`,
                left: `${elements[selected.id]?.props?.x + elements[selected.id]?.props?.width / 2}px`,
            }}
        >
            <AxisArrow direction="x" setX={setX}></AxisArrow>
            <AxisArrow direction="y" setY={setY}></AxisArrow>
        </div>
    );
}