import { Layout } from "@/components/layout/Layout";
import { Shield, Heart, Target, Lock, Users, TrendingUp } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Patient-First Care",
    description: "Every feature is designed with patient well-being as the top priority.",
  },
  {
    icon: Target,
    title: "Proactive Prevention",
    description: "We believe in predicting and preventing health issues before they escalate.",
  },
  {
    icon: Lock,
    title: "Privacy & Security",
    description: "Your health data is encrypted and protected with industry-leading security.",
  },
  {
    icon: Users,
    title: "Connected Care",
    description: "Seamless communication between patients, doctors, nurses, and emergency teams.",
  },
];

const stats = [
  { value: "50k+", label: "Patients Monitored" },
  { value: "99.9%", label: "Uptime Reliability" },
  { value: "< 3s", label: "Alert Response Time" },
  { value: "200+", label: "Healthcare Partners" },
];

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-glow-gradient opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">About Sentinel</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Revolutionizing Healthcare with
              <span className="gradient-text block mt-2">Proactive Monitoring</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              We're on a mission to transform reactive healthcare into proactive care. 
              By combining AI with continuous monitoring, we help identify health risks 
              before they become emergencies.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                The Problem: <span className="text-accent">Delayed Diagnosis</span>
              </h2>
              <p className="text-muted-foreground mb-4">
                Traditional healthcare is reactive — patients often don't receive care until 
                symptoms become severe. This delay can lead to preventable complications, 
                emergency room visits, and even loss of life.
              </p>
              <p className="text-muted-foreground">
                Sentinel was founded to solve this problem by providing continuous, 
                AI-powered health monitoring that catches warning signs early and 
                alerts the right people immediately.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-6 rounded-2xl bg-background border border-border text-center"
                >
                  <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do at Sentinel.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-6 rounded-2xl bg-card border border-border card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How Sentinel Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered system continuously monitors your health and acts instantly when needed.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Continuous Monitoring",
                description: "Health data is collected from connected devices and wearables 24/7.",
              },
              {
                step: "02",
                title: "AI Analysis",
                description: "Advanced algorithms analyze patterns and detect anomalies in real-time.",
              },
              {
                step: "03",
                title: "Instant Response",
                description: "When risks are detected, alerts are sent immediately to patients and care teams.",
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-6xl font-bold text-primary/10 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Security & Compliance</h2>
            <p className="text-muted-foreground mb-8">
              Your health data is protected by enterprise-grade security and strict compliance standards.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["HIPAA Compliant", "SOC 2 Type II", "256-bit Encryption", "GDPR Ready"].map((badge) => (
                <div
                  key={badge}
                  className="px-6 py-3 rounded-full bg-card border border-border text-sm font-medium"
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
