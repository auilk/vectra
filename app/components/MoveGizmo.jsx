"use client";

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
        SetElement(selected.id, {...elements[selected.id].props, x: x });
    }

    const setY = (y) =>
    {
        SetElement(selected.id, {...elements[selected.id].props, y: y });
    }

    return (
        <div 
            className="w-[30px] h-[30px] bg-yellow-500 absolute -translate-1/2 z-1 cursor-move"
            style={{
                top: `${elements[selected.id]?.props?.y + elements[selected.id]?.props.height / 2}px`,
                left: `${elements[selected.id]?.props?.x + elements[selected.id]?.props.width / 2}px`,
            }}
        >
            <AxisArrow direction="x" setX={setX}></AxisArrow>
            <AxisArrow direction="y" setY={setY}></AxisArrow>
        </div>
    );
}