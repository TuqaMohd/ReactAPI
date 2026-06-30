import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom"; //routes: container that holds all our routes. Route: decides which component should appear for a specific URl. useLocation: returns information about the current URL
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Dashboard from "../features/dashboard/Dashboard";
import Game from "../features/quest/Game";
import type { Tab } from "../shared/types/navigation"; //the "type" means we're importing only the type of TS, and not the actual JS code.

export default function App() { // create and export the main React component
  const { pathname } = useLocation(); //destructuring - return an object. ex: homepage has its own title, and we go on the quest page, the html title changes to /quest.
  const activeTab: Tab = pathname.startsWith("/quest") ? "game" : "dashboard";

  useEffect(() => {
    document.title = activeTab === "game" ? "Official Quest - JS vs TS" : "Dashboard - JS vs TS";
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2a3a30] to-[#11201a]">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:px-5 sm:py-8">
        <Header activeTab={activeTab} />

        <main className="bg-parchment border-2 border-gold rounded-lg p-4 sm:p-6 shadow-xl overflow-hidden">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/quest" element={<Game />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
}
