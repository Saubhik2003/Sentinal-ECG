import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Stethoscope, Star, Calendar, Clock } from "lucide-react";

const doctors = [
  {
    name: "Dr. Sarah Chen",
    role: "Chief Medical Officer",
    specialty: "Cardiology",
    rating: 4.9,
    reviews: 324,
    available: true,
    image: null,
  },
  {
    name: "Dr. Michael Roberts",
    role: "Senior Cardiologist",
    specialty: "Interventional Cardiology",
    rating: 4.8,
    reviews: 256,
    available: true,
    image: null,
  },
  {
    name: "Dr. Emily Watson",
    role: "Neurologist",
    specialty: "Sleep Medicine",
    rating: 4.9,
    reviews: 189,
    available: false,
    image: null,
  },
  {
    name: "Dr. James Liu",
    role: "Internal Medicine",
    specialty: "Preventive Care",
    rating: 4.7,
    reviews: 412,
    available: true,
    image: null,
  },
];

const nurses = [
  {
    name: "Nurse Maria Garcia",
    role: "Head Nurse",
    specialty: "Critical Care",
    experience: "12 years",
    available: true,
  },
  {
    name: "Nurse David Kim",
    role: "Emergency Response",
    specialty: "Trauma Care",
    experience: "8 years",
    available: true,
  },
  {
    name: "Nurse Rachel Adams",
    role: "Patient Care Coordinator",
    specialty: "Chronic Care Management",
    experience: "10 years",
    available: true,
  },
];

export default function TeamPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-glow-gradient opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Our Medical Team
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Expert Healthcare
              <span className="gradient-text block mt-2">Professionals</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Our team of board-certified doctors and experienced nurses are
              dedicated to providing you with the best possible care.
            </p>
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Our Doctors</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doctor) => (
              <div
                key={doctor.name}
                className="p-6 rounded-2xl bg-card border border-border card-hover"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center">
                  <Stethoscope className="h-10 w-10 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold mb-1">{doctor.name}</h3>
                  <p className="text-sm text-primary mb-1">{doctor.role}</p>
                  <p className="text-sm text-muted-foreground mb-3">{doctor.specialty}</p>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Star className="h-4 w-4 text-sentinel-amber fill-current" />
                    <span className="text-sm font-medium">{doctor.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({doctor.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span
                      className={`status-dot ${
                        doctor.available ? "status-dot-normal" : "status-dot-warning"
                      }`}
                    ></span>
                    <span className="text-sm">
                      {doctor.available ? "Available" : "Busy"}
                    </span>
                  </div>
                </div>
                <Button variant="heroOutline" size="sm" className="w-full mt-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nurses */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Our Nursing Staff</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {nurses.map((nurse) => (
              <div
                key={nurse.name}
                className="p-6 rounded-2xl bg-background border border-border card-hover"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sentinel-emerald to-sentinel-teal flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-white">
                      {nurse.name.split(" ")[1][0]}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{nurse.name}</h3>
                    <p className="text-sm text-primary mb-1">{nurse.role}</p>
                    <p className="text-sm text-muted-foreground">{nurse.specialty}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {nurse.experience}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="status-dot status-dot-normal"></span>
                      <span className="text-sm">On Duty</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
            <p className="text-muted-foreground mb-8">
              We're always looking for talented healthcare professionals who share
              our mission of proactive patient care.
            </p>
            <Button variant="hero" size="lg">
              View Open Positions
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
