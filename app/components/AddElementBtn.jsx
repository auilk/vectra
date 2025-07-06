"use client";

import { useRef } from "react";
import { useSvgStore } from "../stores/svg-store";

/**
 * AddElementBtn component.
 *
 * Button to add a new rectangle SVG element.
 * (Supports only rects for now; will support more shapes later.)
 *
 * @returns {JSX.Element}
 */
export default function AddElementBtn()
{
    const id = useRef(0);

    const AddElement = useSvgStore((state) => (state.AddElement));

    return (
        <button
            className="w-1/2 h-fit px-10 py-2 text-white font-bold rounded-lg border-2 border-[#292929] bg-[#161616] cursor-pointer hover:bg-[#202020] transition-[background-color]"
            onClick={() => AddElement(`rect${++id.current}`, { x: Math.max(0, Math.random() * window.innerWidth - 28), y: Math.max(0, Math.random() * window.innerHeight - 90), width: 20, height: 20 })}
        >
            ADD
        </button>
    );
}