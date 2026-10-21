import type { Metadata } from "next";
import { ComingSoon } from "@/components/portal/ComingSoon";

export const metadata: Metadata = {
  title: "Assessments",
};

export default function AssessmentPage() {
  return <ComingSoon title="Assessments" />;
}
