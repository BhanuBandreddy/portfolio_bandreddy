import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SUB_STAGES, getSubStage } from "../../../components/framework-map/substages";
import { SubStagePageView } from "../../../components/framework-map/SubStagePage";

export function generateStaticParams() {
  return SUB_STAGES.map((s) => ({ stage: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ stage: string }> }): Promise<Metadata> {
  const { stage: slug } = await params;
  const stage = getSubStage(slug);
  return {
    title: stage ? `${stage.title} — Enterprise AI Delivery Framework` : "Stage not found",
    description: stage?.intro.whatItDoes,
  };
}

export default async function Page({ params }: { params: Promise<{ stage: string }> }) {
  const { stage: slug } = await params;
  const stage = getSubStage(slug);
  if (!stage) notFound();
  return <SubStagePageView stage={stage} />;
}
