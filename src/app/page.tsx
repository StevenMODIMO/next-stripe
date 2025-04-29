import Header from "@/components/Header"
import Pay from "@/components/Pay";

export default function Home() {
  return (
    <div className="h-screen w-screen dark:bg-[#1f1f1f]">
      <Header />
      <Pay />
    </div>
  );
}
