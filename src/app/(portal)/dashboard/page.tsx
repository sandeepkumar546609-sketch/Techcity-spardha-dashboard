import type { Metadata } from "next";
import { DashboardScreen } from "@/components/portal/DashboardScreen";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return <DashboardScreen />;
}
