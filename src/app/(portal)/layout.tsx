import { PortalFrame } from "@/components/portal/PortalFrame";

export const instant = false;

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <PortalFrame>{children}</PortalFrame>;
}
