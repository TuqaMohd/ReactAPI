import { useState } from "react";
import { comparisons } from "./data";
import DashboardIntro from "./components/DashboardIntro";
import TopicSelector from "./components/TopicSelector";
import ComparisonPanel from "./components/ComparisonPanel";

export default function Dashboard() {
  const [activeId, setActiveId] = useState(comparisons[0].id);
  const active = comparisons.find((c) => c.id === activeId)!;

  return (
    <div>
      <DashboardIntro />
      <TopicSelector topics={comparisons} activeId={activeId} onSelect={setActiveId} />
      <ComparisonPanel comparison={active} />
    </div>
  );
}

