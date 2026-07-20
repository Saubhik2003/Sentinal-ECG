import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Heart } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8">
            <Heart className="h-4 w-4 text-accent heartbeat" />
            <span className="text-sm font-medium text-accent">Start Your Health Journey</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Your Health Deserves
            <br />
            <span className="gradient-text">24/7 Protection</span>
          </h2>

          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of patients who trust Sentinel to watch over their health. 
            Get started with continuous monitoring, AI predictions, and instant emergency alerts.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth?mode=signup">
              <Button variant="hero" size="xl" className="gap-2">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="heroOutline" size="xl" className="gap-2">
                <Shield className="h-5 w-5" />
                Schedule Demo
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground mt-8">
            Free 30-day trial • No credit card required • HIPAA compliant
          </p>
        </div>
      </div>
    </section>
  );
}
