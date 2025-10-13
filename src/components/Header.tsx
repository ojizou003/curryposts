import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-spice via-curry to-turmeric shadow-lg border-b border-spice/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-20">
          <div className="flex items-center space-x-3">
            <div className="text-3xl animate-pulse"></div>
            <Link href="/" className="text-2xl md:text-3xl font-bold text-yogurt-white hover:text-curry transition-colors duration-300 tracking-wide drop-shadow-lg">
            カレーギャラリー Ｘ
            </Link>
          </div>
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-coriander via-turmeric to-spice"></div>
    </header>
  );
}