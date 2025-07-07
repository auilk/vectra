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
    const { elements, selected, SetElement } = useSvgStore(useShallow((state) => 
        ({
            elements: state.elements,
            selected: state.selected,
            SetElement: state.SetElement
        })
    ));

    const setX = (x) =>
    {
        SetElement(selected.id, {...elements[selected.id].props, x: x});
    }

    const setY = (y) =>
    {
        SetElement(selected.id, {...elements[selected.id].props, y: y });
    }

    return (
        <div
            className="flex flex-col gap-1 absolute -translate-y-1/1 z-2"
            style={{
                top: `${elements[selected.id]?.props?.y + elements[selected.id]?.props?.height / 2 + 8}px`,
                left: `${elements[selected.id]?.props?.x + elements[selected.id]?.props?.width / 2 - 8}px`,
            }}
        >
            <div className="flex">
                <AxisArrow direction="y" setY={setY}></AxisArrow>
            </div>

            <div className="flex gap-1">
                <div className="w-4 h-4 border-2 border-white rounded-sm flex justify-center items-center">
                    <div className="w-1 h-1 rounded-full bg-white"></div>
                </div>

                <AxisArrow direction="x" setX={setX}></AxisArrow>
            </div>
        </div>
    );
}