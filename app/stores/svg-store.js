import { create } from 'zustand';

export default useSvgStore = create((set) => ({
  elements: {
    rect: { props: { x: 50, y: 50, width: 100, height: 80 } },
  },

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
