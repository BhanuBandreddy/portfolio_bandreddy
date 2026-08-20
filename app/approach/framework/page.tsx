import type { Metadata } from "next";
import { FrameworkStory } from "../../components/FrameworkStory";

export const metadata: Metadata = {
  title: "Enterprise AI Transformation Delivery Framework — Bhanu Harish Bandreddy",
  description:
    "A seven-stage delivery framework for governed enterprise AI — from a measurable business outcome to evaluated, accountable production.",
};

export default function FrameworkPage() {
  return <FrameworkStory />;
}
