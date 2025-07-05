"use client";

import { useRef, useState } from "react";
import AxisArrow from "./AxisArrow";

export default function MoveGizmo()
{
    const elementRef = useRef(null);

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [offset, setOffset] = useState(0);

    return (
        <div
            ref={elementRef}
            className="w-8 h-8 shadow-[0px_0px_1px_2px] rounded-full shadow-amber-300 absolute top-50 left-1/2 before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-amber-400 before:left-1/2 before:top-1/2 before:-translate-1/2 before:absolute"
            style={{
                top: y,
                left: x,
            }}
        >
            <AxisArrow direction="x" setX={setX}></AxisArrow>
            <AxisArrow direction="y" setY={setY}></AxisArrow>
        </div>
    );
}