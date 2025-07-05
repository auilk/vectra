import { create } from "zustand";

export const useSvgStore = create((set) => ({
  elements: {},

  AddElement: (id, props) => 
    set(state => 
    {
      const elements = { ...state.elements, [id]: { props }  };
      return { elements };
    }),

  SetElement: (id, newProps) =>
    set(state =>
    {
      const elements = { ...state.elements, [id]: { props: { ...state.elements[id].props, ...newProps } } };
      return { elements };
    }),

  DeleteElement: (id) =>
    set(state =>
    {
      const newElements = { ...state.elements };
      delete newElements[id];
      return { elements: newElements };
    })
}));
