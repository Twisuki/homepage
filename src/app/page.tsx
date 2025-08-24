import Main from "@/sections/Main";
import Menus from "@/sections/Menus";
import Background from "@/components/Background"


export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Background />
      <div className="z-100">
        <Menus />
        <Main />
      </div>
    </div>
  );
}
