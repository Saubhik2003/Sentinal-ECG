import { 
  Activity, 
  Brain, 
  Moon, 
  Bell, 
  Shield, 
  Users,
  Zap,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Activity,
    title: "ECG Monitoring",
    description: "Real-time ECG waveform visualization with AI-powered arrhythmia detection and instant alerts.",
    color: "text-sentinel-teal",
    bgColor: "bg-sentinel-teal/10",
  },
  {
    icon: Brain,
    title: "Stress Analysis",
    description: "Continuous stress level monitoring using heart rate variability and activity patterns.",
    color: "text-sentinel-purple",
    bgColor: "bg-sentinel-purple/10",
  },
  {
    icon: Moon,
    title: "Sleep Detection",
    description: "Track sleep cycles, detect disorders, and receive personalized improvement recommendations.",
    color: "text-sentinel-amber",
    bgColor: "bg-sentinel-amber/10",
  },
  {
    icon: Bell,
    title: "Instant Alerts",
    description: "Automatic emergency notifications to nurses, doctors, and ambulance teams when critical.",
    color: "text-sentinel-coral",
    bgColor: "bg-sentinel-coral/10",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "HIPAA-compliant data encryption and consent-based sharing with healthcare providers.",
    color: "text-sentinel-emerald",
    bgColor: "bg-sentinel-emerald/10",
  },
  {
    icon: Users,
    title: "Care Team Access",
    description: "Seamless collaboration between patients, doctors, nurses, and emergency responders.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

const stats = [
  { value: "99.9%", label: "Prediction Accuracy", icon: Zap },
  { value: "<3s", label: "Alert Response Time", icon: Clock },
  { value: "24/7", label: "Continuous Monitoring", icon: Activity },
  { value: "10k+", label: "Patients Protected", icon: Users },
];

export function FeaturesSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-glow-gradient opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Powerful Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
            AI-Powered Health Monitoring
            <br />
            <span className="gradient-text">That Never Sleeps</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Advanced algorithms continuously analyze your health data, 
            predicting risks before they become emergencies.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-card border border-border card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", feature.bgColor)}>
                <feature.icon className={cn("h-6 w-6", feature.color)} />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-card/50 border border-border"
            >
              <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
