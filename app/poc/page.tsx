"use client";
import "../components/framework/framework.css";
import { STAGES } from "../components/framework/stages";
import { FrameworkStage } from "../components/framework/FrameworkStage";

// Isolated test harness — Stage 1 only, for verifying the three animations
// (dock-in, idle float, glow pulse) before wiring the full page.
export default function Poc() {
  return (
    <div className="sfw">
      <FrameworkStage stage={STAGES[0]} index={0} />
    </div>
  );
}
