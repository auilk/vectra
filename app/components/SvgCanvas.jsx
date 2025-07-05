"use client";

import { useEffect } from "react";
import { useSvgStore } from "../stores/svg-store";
import { useShallow } from 'zustand/react/shallow'

export default function SvgCanvas()
{
    const { elements, AddElement } = useSvgStore(useShallow(state => 
    {
        return { elements: state.elements, AddElement: state.AddElement };
    }));

    useEffect(() =>
    {
        AddElement("rect1", { x: 100, y: 200, width: 250, height: 20 });
        AddElement("rect2", { x: 20, y: 200, width: 25, height: 20 });
    }, []);

    return (
        <svg className="w-full h-full">
            {Object.entries(elements).map(([id, element]) => (
                <rect
                key={id}
                {...element.props}
                fill="black"
                />
            ))}
        </svg>
    );
}
