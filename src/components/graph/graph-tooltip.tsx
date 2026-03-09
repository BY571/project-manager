"use client";

import { STATUS_LABELS } from "@/types";
import type { ProjectStatus } from "@/types";

export interface TooltipData {
  name: string;
  status: string;
  description: string;
  tasksCompleted: number;
  tasksTotal: number;
  blockerCount: number;
  x: number;
  y: number;
}

const STATUS_DOT_COLORS: Record<string, string> = {
  not_started: "#6b7280",
  in_progress: "#3b82f6",
  on_hold: "#f59e0b",
  done: "#22c55e",
};

interface GraphTooltipProps {
  data: TooltipData | null;
}

export function GraphTooltip({ data }: GraphTooltipProps) {
  if (!data) return null;

  const description =
    data.description.length > 100
      ? data.description.slice(0, 100) + "..."
      : data.description;

  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{
        left: data.x + 16,
        top: data.y - 8,
      }}
    >
      <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-xl px-4 py-3 max-w-xs">
        <p className="font-semibold text-sm text-white">{data.name}</p>

        <div className="flex items-center gap-1.5 mt-1.5">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: STATUS_DOT_COLORS[data.status] ?? "#6b7280" }}
          />
          <span className="text-xs text-gray-300">
            {STATUS_LABELS[data.status as ProjectStatus] ?? data.status}
          </span>
        </div>

        {description && (
          <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
            {description}
          </p>
        )}

        <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
          <span>
            {data.tasksCompleted}/{data.tasksTotal} tasks done
          </span>
          {data.blockerCount > 0 && (
            <span className="text-red-400">
              {data.blockerCount} {data.blockerCount === 1 ? "blocker" : "blockers"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
