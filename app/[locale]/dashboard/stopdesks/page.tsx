import StopdeskManagement from "./stopdesk-management";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <StopdeskManagement />
      <Toaster />
    </main>
  );
}
