import type { Metadata } from "next";
import { FrameworkArchitecturePage } from "../components/framework-map/FrameworkArchitecturePage";

export const metadata: Metadata = {
  title: "Enterprise AI Transformation Framework — Bhanu Harish Bandreddy",
  description:
    "The Enterprise AI Delivery Framework, mapped: seven stages sized by real specification depth, connected by the document's own sequence and feedback loop.",
};

export default function Page() {
  return <FrameworkArchitecturePage />;
}
