import type { Metadata } from "next";
import { FrameworkPage } from "../components/framework/FrameworkPage";

export const metadata: Metadata = {
  title: "Enterprise AI Transformation Framework — Bhanu Harish Bandreddy",
  description:
    "Seven modules docking into one governed vessel — the Enterprise AI Transformation Delivery Framework, from a measurable business outcome to institutionalised learning.",
};

export default function Page() {
  return <FrameworkPage />;
}
