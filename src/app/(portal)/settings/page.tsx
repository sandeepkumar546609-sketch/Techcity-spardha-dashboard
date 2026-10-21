import type { Metadata } from "next";
import { ComingSoon } from "@/components/portal/ComingSoon";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return <ComingSoon title="Settings" />;
}
