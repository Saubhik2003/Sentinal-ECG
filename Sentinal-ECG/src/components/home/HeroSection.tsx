import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ECGAnimation } from "./ECGAnimation";
import { HealthMetricCard } from "./HealthMetricCard";
import { 
  Activity, 
  Shield, 
  AlertTriangle, 
  Heart, 
  Brain, 
  Moon,
  ArrowRight,
  Phone
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-pattern opacity-50" />
      <div className="absolute inset-0 bg-glow-gradient" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Health Guardian</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="gradient-text">Sentinel</span>
              <br />
              <span className="text-foreground">Always Watching Over</span>
              <br />
              <span className="text-foreground">Your Health</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl">
              Continuous health monitoring powered by advanced AI. Predict medical risks, 
              receive instant alerts, and stay connected with your healthcare team — 
              all in real-time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard">
                <Button variant="hero" size="xl" className="gap-2">
                  View Health Dashboard
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="heroOutline" size="xl" className="gap-2">
                  <Phone className="h-5 w-5" />
                  Emergency SOS
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  <strong className="text-foreground">10k+</strong> patients monitored
                </span>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-sm text-muted-foreground">
                <strong className="text-foreground">99.9%</strong> uptime
              </div>
            </div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div className="relative animate-scale-in">
            <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent blur-2xl" />
            
            <div className="relative glass rounded-2xl p-6 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Activity className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Health Overview</p>
                    <p className="text-xs text-muted-foreground">Real-time monitoring</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-status-normal/10">
                  <span className="status-dot status-dot-normal"></span>
                  <span className="text-xs font-medium text-status-normal">All Normal</span>
                </div>
              </div>

              {/* ECG */}
              <ECGAnimation />

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3">
                <HealthMetricCard
                  icon={Heart}
                  label="Heart Rate"
                  value="72"
                  unit="bpm"
                  status="normal"
                />
                <HealthMetricCard
                  icon={Brain}
                  label="Stress Level"
                  value="28"
                  unit="%"
                  status="normal"
                />
                <HealthMetricCard
                  icon={Moon}
                  label="Sleep Score"
                  value="85"
                  unit="/100"
                  status="normal"
                />
              </div>

              {/* Alert Preview */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  No alerts — Your health metrics are within normal range
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
