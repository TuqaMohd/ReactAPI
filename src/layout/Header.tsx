import type { Tab } from "../shared/types/navigation";
import Navbar from "./Navbar";

interface HeaderProps {
  activeTab: Tab;
}

export default function Header({ activeTab }: HeaderProps) {
  return (
    <header className="text-center mb-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-goldBright">JavaScript vs TypeScript</h1>
      <p className="text-parchmentDark mt-1 mb-5 text-sm sm:text-base px-2">
        Welcome to Tuqa's quest where you will explore the difference between JavaScript and TypeScript
      </p>
      <Navbar activeTab={activeTab} />
    </header>
  );
}
