import { Layout } from "@/components/layout/Layout";
import { ECGAnimation } from "@/components/home/ECGAnimation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Activity,
  Brain,
  Moon,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  ArrowRight,
  Heart,
  Waves,
  Clock,
  LineChart,
} from "lucide-react";

const ecgFeatures = [
  "Real-time waveform visualization",
  "Abnormal heart rate detection",
  "Arrhythmia pattern recognition",
  "P-wave, QRS, T-wave analysis",
  "Automatic critical alerts",
  "Historical data comparison",
];

const stressIndicators = [
  { label: "Heart Rate Variability", value: "45ms", status: "normal" },
  { label: "Stress Score", value: "28%", status: "normal" },
  { label: "Recovery Rate", value: "92%", status: "normal" },
  { label: "Activity Level", value: "Moderate", status: "normal" },
];

const sleepMetrics = [
  { label: "Sleep Duration", value: "7.5 hrs" },
  { label: "Deep Sleep", value: "1.8 hrs" },
  { label: "REM Sleep", value: "2.1 hrs" },
  { label: "Sleep Score", value: "85/100" },
];

export default function FeaturesPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-glow-gradient opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Health Prediction Features
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Three AI-Powered Modules for
              <span className="gradient-text block mt-2">Complete Health Insights</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Our advanced health prediction system continuously monitors your ECG,
              stress levels, and sleep patterns to provide comprehensive health insights.
            </p>
          </div>
        </div>
      </section>

      {/* ECG Monitoring */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sentinel-teal/10 border border-sentinel-teal/20 mb-6">
                <Activity className="h-4 w-4 text-sentinel-teal" />
                <span className="text-sm font-medium text-sentinel-teal">ECG Monitoring</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">
                Real-Time ECG Analysis
              </h2>
              <p className="text-muted-foreground mb-6">
                Our AI continuously analyzes your heart's electrical activity,
                detecting abnormalities and potential issues before they become
                critical.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {ecgFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-status-normal flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <div className="px-4 py-2 rounded-lg bg-status-normal/10 border border-status-normal/20">
                  <span className="text-status-normal text-sm font-medium">Normal</span>
                </div>
                <div className="px-4 py-2 rounded-lg bg-status-warning/10 border border-status-warning/20">
                  <span className="text-status-warning text-sm font-medium">Warning</span>
                </div>
                <div className="px-4 py-2 rounded-lg bg-status-critical/10 border border-status-critical/20">
                  <span className="text-status-critical text-sm font-medium">Critical</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-card border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Live ECG Monitor</h3>
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-sentinel-coral heartbeat" />
                    <span className="font-bold">72 BPM</span>
                  </div>
                </div>
                <ECGAnimation />
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">P-Wave</p>
                    <p className="font-semibold">0.12s</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">QRS</p>
                    <p className="font-semibold">0.08s</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">T-Wave</p>
                    <p className="font-semibold">0.16s</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stress Analysis */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="p-6 rounded-2xl bg-background border border-border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold">Stress Analysis Dashboard</h3>
                  <div className="px-3 py-1 rounded-full bg-status-normal/10">
                    <span className="text-status-normal text-sm font-medium">Low Stress</span>
                  </div>
                </div>
                {/* Stress Meter */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Current Stress Level</span>
                    <span className="font-semibold">28%</span>
                  </div>
                  <div className="h-4 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-status-normal to-sentinel-teal"
                      style={{ width: "28%" }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Relaxed</span>
                    <span>Moderate</span>
                    <span>High</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {stressIndicators.map((indicator) => (
                    <div
                      key={indicator.label}
                      className="p-4 rounded-xl bg-muted/50 border border-border"
                    >
                      <p className="text-xs text-muted-foreground mb-1">{indicator.label}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{indicator.value}</span>
                        <span className="status-dot status-dot-normal"></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sentinel-purple/10 border border-sentinel-purple/20 mb-6">
                <Brain className="h-4 w-4 text-sentinel-purple" />
                <span className="text-sm font-medium text-sentinel-purple">Stress Rate Analysis</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">
                Comprehensive Stress Monitoring
              </h2>
              <p className="text-muted-foreground mb-6">
                Using heart rate variability and activity patterns, our system
                calculates your stress levels and provides actionable insights for
                better mental health.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: Waves, text: "Heart rate variability analysis" },
                  { icon: TrendingUp, text: "Daily activity trend tracking" },
                  { icon: AlertTriangle, text: "Mental health warning alerts" },
                  { icon: LineChart, text: "Long-term pattern analysis" },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-sentinel-purple/10 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-sentinel-purple" />
                    </div>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sleep Detection */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sentinel-amber/10 border border-sentinel-amber/20 mb-6">
                <Moon className="h-4 w-4 text-sentinel-amber" />
                <span className="text-sm font-medium text-sentinel-amber">Sleep Disorder Detection</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">
                AI-Powered Sleep Analysis
              </h2>
              <p className="text-muted-foreground mb-6">
                Track your sleep cycles, detect disorders like insomnia, and receive
                personalized recommendations for better sleep health.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Sleep cycle & duration analysis",
                  "Insomnia detection",
                  "Irregular sleep pattern alerts",
                  "AI-based sleep health score",
                  "Personalized improvement tips",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-status-normal" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-card border border-border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold">Sleep Analysis</h3>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Last Night</span>
                  </div>
                </div>
                {/* Sleep Score */}
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        fill="none"
                        stroke="hsl(var(--muted))"
                        strokeWidth="12"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        fill="none"
                        stroke="hsl(var(--sentinel-amber))"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={`${85 * 3.51} 351`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold">85</span>
                      <span className="text-xs text-muted-foreground">Sleep Score</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {sleepMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="p-4 rounded-xl bg-muted/50 border border-border text-center"
                    >
                      <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
                      <p className="font-semibold">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Start Monitoring Your Health Today
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of patients who trust Sentinel to keep them healthy
              with AI-powered predictions and real-time monitoring.
            </p>
            <Link to="/auth?mode=signup">
              <Button variant="hero" size="lg" className="gap-2">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
