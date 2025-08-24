import Image from "next/image";


export default function Personal() {
  return (
    <div className="w-72 h-36 bg-blue-600 flex-col justify-center items-center">
      <div className="w-72 h-24 flex justify-center items-center gap-4">
        <Image
          src="/avatar.png"
          alt="Twisuki"
          width="400"
          height="400"
          className="w-18 h-18 rounded-full object-cover"
        />
        <div className="text-white text-3xl">
          Nya_Twisuki
        </div>
      </div>
      <div className="w-full h-12 text-white text-xl flex justify-center">
        大家好这里是Twisuki~
      </div>
    </div>
  );
}
