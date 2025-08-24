import Main from "@/sections/Main";
import Menus from "@/sections/Menus";

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Menus/>
      <Main/>
    </div>
  );
}
