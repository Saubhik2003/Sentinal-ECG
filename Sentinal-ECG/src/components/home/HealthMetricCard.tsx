import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface HealthMetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  unit: string;
  status: "normal" | "warning" | "critical";
  trend?: "up" | "down" | "stable";
  className?: string;
}

export function HealthMetricCard({
  icon: Icon,
  label,
  value,
  unit,
  status,
  trend,
  className,
}: HealthMetricCardProps) {
  const statusColors = {
    normal: "text-status-normal border-status-normal/30 bg-status-normal/5",
    warning: "text-status-warning border-status-warning/30 bg-status-warning/5",
    critical: "text-status-critical border-status-critical/30 bg-status-critical/5",
  };

  const statusLabels = {
    normal: "Normal",
    warning: "Warning",
    critical: "Critical",
  };

  return (
    <div
      className={cn(
        "p-4 rounded-xl border bg-card/50 backdrop-blur-sm card-hover",
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn("p-2 rounded-lg", statusColors[status])}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex items-center gap-1">
          <span className={cn("status-dot", `status-dot-${status}`)}></span>
          <span className={cn("text-xs font-medium", {
            "text-status-normal": status === "normal",
            "text-status-warning": status === "warning",
            "text-status-critical": status === "critical",
          })}>
            {statusLabels[status]}
          </span>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold">{value}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
      </div>
    </div>
  );
}
