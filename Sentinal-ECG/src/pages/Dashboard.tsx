import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ECGAnimation } from "@/components/home/ECGAnimation";
import { HealthMetricCard } from "@/components/home/HealthMetricCard";
import {
  Shield,
  Activity,
  Heart,
  Brain,
  Moon,
  Bell,
  AlertTriangle,
  TrendingUp,
  Calendar,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Ambulance,
  User,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const healthMetrics = [
  { icon: Heart, label: "Heart Rate", value: "72", unit: "bpm", status: "normal" as const },
  { icon: Brain, label: "Stress Level", value: "28", unit: "%", status: "normal" as const },
  { icon: Moon, label: "Sleep Score", value: "85", unit: "/100", status: "normal" as const },
  { icon: Activity, label: "Activity", value: "6,432", unit: "steps", status: "normal" as const },
];

const recentAlerts = [
  {
    id: 1,
    type: "info",
    message: "Weekly health report is ready",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "success",
    message: "Heart rate has stabilized",
    time: "5 hours ago",
  },
  {
    id: 3,
    type: "warning",
    message: "Mild elevated stress detected",
    time: "Yesterday",
  },
];

const upcomingAppointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Chen",
    specialty: "Cardiology",
    date: "Feb 3, 2024",
    time: "10:00 AM",
  },
  {
    id: 2,
    doctor: "Dr. Emily Watson",
    specialty: "Sleep Medicine",
    date: "Feb 10, 2024",
    time: "2:30 PM",
  },
];

const sidebarItems = [
  { icon: Activity, label: "Dashboard", href: "/dashboard", active: true },
  { icon: Heart, label: "Health Metrics", href: "/dashboard/metrics" },
  { icon: Bell, label: "Alerts", href: "/dashboard/alerts", badge: 3 },
  { icon: Calendar, label: "Appointments", href: "/dashboard/appointments" },
  { icon: FileText, label: "Reports", href: "/dashboard/reports" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleEmergency = () => {
    toast.error("Emergency SOS Activated!", {
      description: "Notifying your care team and emergency services...",
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 lg:translate-x-0 lg:static",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <Link to="/" className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold gradient-text">Sentinel</span>
            </Link>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-4 space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  item.active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto px-2 py-0.5 text-xs bg-accent text-accent-foreground rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* User */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">John Doe</p>
                <p className="text-xs text-muted-foreground">Patient</p>
              </div>
              <Button variant="ghost" size="icon" className="flex-shrink-0">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-muted"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
              <div>
                <h1 className="text-xl font-bold">Health Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, John
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="heroOutline" size="sm" className="gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </Button>
              <Button
                variant="emergency"
                size="sm"
                className="gap-2"
                onClick={handleEmergency}
              >
                <Ambulance className="h-4 w-4" />
                <span className="hidden sm:inline">Emergency SOS</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 space-y-6 overflow-auto">
          {/* Status Banner */}
          <div className="p-4 rounded-xl bg-status-normal/10 border border-status-normal/20 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-status-normal/20 flex items-center justify-center">
              <Activity className="h-6 w-6 text-status-normal" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-status-normal">
                All Systems Normal
              </h3>
              <p className="text-sm text-muted-foreground">
                Your health metrics are within normal ranges. Keep up the good
                work!
              </p>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {healthMetrics.map((metric) => (
              <HealthMetricCard key={metric.label} {...metric} />
            ))}
          </div>

          {/* ECG & Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* ECG */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Live ECG Monitor</h3>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-sentinel-coral heartbeat" />
                  <span className="font-bold">72 BPM</span>
                </div>
              </div>
              <ECGAnimation />
              <div className="flex items-center justify-between mt-4 text-sm">
                <span className="text-muted-foreground">
                  Last updated: Just now
                </span>
                <Button variant="ghost" size="sm">
                  View Details
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>

            {/* Health Score */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="font-semibold mb-4">Overall Health Score</h3>
              <div className="flex items-center justify-center py-8">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="hsl(var(--muted))"
                      strokeWidth="12"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="hsl(var(--status-normal))"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={`${87 * 4.4} 440`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold">87</span>
                    <span className="text-sm text-muted-foreground">
                      Excellent
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <TrendingUp className="h-4 w-4 text-status-normal mx-auto mb-1" />
                  <p className="font-medium">+5</p>
                  <p className="text-muted-foreground">vs last week</p>
                </div>
                <div>
                  <Heart className="h-4 w-4 text-primary mx-auto mb-1" />
                  <p className="font-medium">92%</p>
                  <p className="text-muted-foreground">Heart Health</p>
                </div>
                <div>
                  <Brain className="h-4 w-4 text-sentinel-purple mx-auto mb-1" />
                  <p className="font-medium">Low</p>
                  <p className="text-muted-foreground">Stress</p>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts & Appointments */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Alerts */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Recent Alerts</h3>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
              <div className="space-y-3">
                {recentAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                        alert.type === "info" && "bg-primary/10 text-primary",
                        alert.type === "success" &&
                          "bg-status-normal/10 text-status-normal",
                        alert.type === "warning" &&
                          "bg-status-warning/10 text-status-warning"
                      )}
                    >
                      {alert.type === "warning" ? (
                        <AlertTriangle className="h-4 w-4" />
                      ) : (
                        <Bell className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {alert.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Upcoming Appointments</h3>
                <Button variant="ghost" size="sm">
                  Book New
                </Button>
              </div>
              <div className="space-y-3">
                {upcomingAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{apt.doctor}</p>
                      <p className="text-sm text-muted-foreground">
                        {apt.specialty}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{apt.date}</p>
                      <p className="text-sm text-muted-foreground">{apt.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
