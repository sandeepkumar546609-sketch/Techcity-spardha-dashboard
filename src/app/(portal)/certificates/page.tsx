import type { Metadata } from "next";
import { ComingSoon } from "@/components/portal/ComingSoon";

export const metadata: Metadata = {
  title: "Certificates",
};

export default function CertificatesPage() {
  return <ComingSoon title="Certificates" />;
}
