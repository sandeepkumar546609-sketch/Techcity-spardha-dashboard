import type { Metadata } from "next";
import { ComingSoon } from "@/components/portal/ComingSoon";

export const metadata: Metadata = {
  title: "Results",
};

export default function ResultsPage() {
  return <ComingSoon title="Results" />;
}
