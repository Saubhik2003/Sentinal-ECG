import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Activity,
  Brain,
  Moon,
  Bell,
  Stethoscope,
  Ambulance,
  FileText,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Activity,
    title: "Continuous Health Monitoring",
    description:
      "24/7 real-time tracking of vital signs including heart rate, ECG patterns, blood pressure, and oxygen levels.",
    features: [
      "Real-time ECG visualization",
      "Heart rate variability analysis",
      "Blood oxygen monitoring",
      "Activity tracking integration",
    ],
    color: "bg-sentinel-teal/10 text-sentinel-teal",
  },
  {
    icon: Brain,
    title: "AI-Based Risk Prediction",
    description:
      "Advanced machine learning algorithms analyze your health data to predict potential medical risks before they become emergencies.",
    features: [
      "Predictive analytics",
      "Pattern recognition",
      "Early warning detection",
      "Personalized risk scores",
    ],
    color: "bg-sentinel-purple/10 text-sentinel-purple",
  },
  {
    icon: Bell,
    title: "Emergency Alert System",
    description:
      "Automatic escalation system that notifies nurses, doctors, and emergency services when critical conditions are detected.",
    features: [
      "Multi-channel alerts",
      "Smart escalation",
      "Response tracking",
      "Acknowledgment system",
    ],
    color: "bg-sentinel-coral/10 text-sentinel-coral",
  },
  {
    icon: Stethoscope,
    title: "Doctor Consultation",
    description:
      "Connect with healthcare professionals for virtual consultations, follow-ups, and personalized care plans.",
    features: [
      "Video consultations",
      "Secure messaging",
      "Prescription management",
      "Care plan tracking",
    ],
    color: "bg-sentinel-emerald/10 text-sentinel-emerald",
  },
  {
    icon: Ambulance,
    title: "Hospital Integration",
    description:
      "Seamless connection with hospitals and ambulance services for rapid emergency response when needed.",
    features: [
      "Nearest hospital mapping",
      "Ambulance dispatch",
      "Medical record sharing",
      "Emergency protocols",
    ],
    color: "bg-sentinel-amber/10 text-sentinel-amber",
  },
  {
    icon: FileText,
    title: "Medical Reports",
    description:
      "Auto-generated comprehensive health reports with AI insights that can be shared with your healthcare providers.",
    features: [
      "PDF export",
      "Trend analysis",
      "AI recommendations",
      "Shareable formats",
    ],
    color: "bg-primary/10 text-primary",
  },
];

export default function ServicesPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-glow-gradient opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Comprehensive Health
              <span className="gradient-text block mt-2">Monitoring Services</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              From continuous monitoring to emergency response, Sentinel provides
              end-to-end healthcare solutions powered by AI.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="p-6 rounded-2xl bg-card border border-border card-hover group"
              >
                <div
                  className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-6`}
                >
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-sm text-muted-foreground flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8">
              Experience the future of healthcare monitoring. Sign up today and
              start protecting your health with AI-powered insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth?mode=signup">
                <Button variant="hero" size="lg" className="gap-2">
                  Start Free Trial
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="heroOutline" size="lg">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
