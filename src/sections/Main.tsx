import Left from "@/components/main/Left";
import Personal from "@/components/main/Personal";
import Footer from "@/components/main/Footer";

export default function Main() {
  return (
    <div className="bg-gray-400">
      <div className="flex flex-col gap-4 items-center justify-center">
        <div className="flex flex-row gap-4 items-center justify-center">
          <Personal/>
          <Left/>
        </div>
        <Footer/>
      </div>
    </div>
  );
}
