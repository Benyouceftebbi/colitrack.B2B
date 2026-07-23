"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { type AlgeriaStatesData } from "./data";
import { cn } from "@/lib/utils";

interface StatesTableProps {
  data: AlgeriaStatesData;
  hoveredState: string | null;
}

export function StatesTable({ data, hoveredState }: StatesTableProps) {
  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-4">
        <div className="grid grid-cols-3 text-sm font-medium text-gray-400">
          <div>State</div>
          <div className="text-right">Users</div>
          <div className="text-right">Bounce Rate</div>
        </div>
        {Object.entries(data).map(([state, stats]) => (
          <div
            key={state}
            className={cn(
              "grid grid-cols-3 text-sm border-b border-gray-800 pb-4",
              hoveredState === state && "bg-gray-800/50 rounded-md"
            )}
          >
            <div className="text-white">{state}</div>
            <div className="text-right text-white">{stats.users}</div>
            <div className="text-right text-white">{stats.bounceRate}</div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}