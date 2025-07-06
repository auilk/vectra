import AddElementBtn from "./components/AddElementBtn";
import ObjectInfo from "./components/ObjectInfo";
import SvgBounds from "./components/SvgBounds";
import SvgCanvas from "./components/SvgCanvas";

export default function Home() {
  return (
    <div className="w-dvw h-dvh p-2 flex flex-col gap-2 bg-[#0A0A0A]">
      <div className="border-1 rounded-lg border-[#292929] bg-[#161616] flex-grow">
        <SvgCanvas></SvgCanvas>
        <ObjectInfo></ObjectInfo>
      </div>
      <div className="flex justify-center">
        <AddElementBtn></AddElementBtn>
      </div>
      <SvgBounds></SvgBounds>
    </div>
  );
}