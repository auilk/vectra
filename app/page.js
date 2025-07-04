import AxisArrow from "./components/AxisArrow"

export default function Home() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-100 h-100 bg-amber-200 relative">
        <AxisArrow direction="x"></AxisArrow>
        <AxisArrow direction="y"></AxisArrow>
      </div>
    </div>
  );
}
