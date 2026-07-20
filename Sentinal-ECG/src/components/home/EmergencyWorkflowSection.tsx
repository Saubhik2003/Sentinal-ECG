import { 
  AlertTriangle, 
  User, 
  Stethoscope, 
  Ambulance,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const workflowSteps = [
  {
    icon: AlertTriangle,
    title: "Risk Detected",
    description: "AI identifies critical health readings",
    color: "bg-status-critical text-white",
    ringColor: "ring-status-critical/30",
  },
  {
    icon: User,
    title: "Patient Notified",
    description: "Instant alert sent to patient's device",
    color: "bg-sentinel-amber text-white",
    ringColor: "ring-sentinel-amber/30",
  },
  {
    icon: Stethoscope,
    title: "Medical Staff Alerted",
    description: "Nurse and doctor receive notifications",
    color: "bg-sentinel-teal text-white",
    ringColor: "ring-sentinel-teal/30",
  },
  {
    icon: Ambulance,
    title: "Emergency Response",
    description: "Ambulance dispatched if escalation needed",
    color: "bg-sentinel-coral text-white",
    ringColor: "ring-sentinel-coral/30",
  },
];

export function EmergencyWorkflowSection() {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-medium text-sm uppercase tracking-wider">
            Emergency Response
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
            Rapid Alert <span className="gradient-text">Escalation System</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            When critical health events are detected, our system automatically 
            notifies the right people in the right order — within seconds.
          </p>
        </div>

        {/* Workflow */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2 z-0" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {workflowSteps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className={`w-20 h-20 rounded-full ${step.color} ${step.ringColor} ring-4 flex items-center justify-center mb-6 shadow-lg`}>
                    <step.icon className="h-10 w-10" />
                  </div>
                  
                  {/* Step Number */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center text-sm font-bold text-primary">
                    {index + 1}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>

                {/* Arrow */}
                {index < workflowSteps.length - 1 && (
                  <div className="hidden lg:flex absolute top-10 -right-4 z-20">
                    <ArrowRight className="h-8 w-8 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            { title: "Multi-Channel Alerts", desc: "SMS, email, push notifications, and dashboard alerts" },
            { title: "Smart Escalation", desc: "Automatic escalation if initial responders don't acknowledge" },
            { title: "Location Tracking", desc: "Nearest hospital mapping and ambulance dispatch" },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border"
            >
              <CheckCircle className="h-5 w-5 text-status-normal flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
