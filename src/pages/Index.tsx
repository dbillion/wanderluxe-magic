
import React from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe2, Compass, Award } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-secondary to-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 animate-fade-up">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Your Gateway to{" "}
                <span className="text-primary">Seamless Travel</span> Experiences
              </h1>
              <p className="text-lg text-gray-600 max-w-xl">
                At our travel agency, we simplify your journey from booking tickets to obtaining visas. Experience hassle-free travel planning tailored to your unique needs.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                  Plan Your Trip
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <img
                src="/lovable-uploads/56740bd4-c926-4550-bde0-74f949632112.png"
                alt="Travel Planning"
                className="rounded-lg shadow-2xl animate-fade-down"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Your Journey Starts Here</h2>
            <p className="text-gray-600">Effortless travel planning at your fingertips.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover-scale glass-card">
              <Globe2 className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Seamless Ticket Booking</h3>
              <p className="text-gray-600">Book flights easily with our user-friendly platform.</p>
            </Card>
            
            <Card className="p-6 hover-scale glass-card">
              <Compass className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI Travel Planning</h3>
              <p className="text-gray-600">Get personalized itineraries crafted by our AI.</p>
            </Card>
            
            <Card className="p-6 hover-scale glass-card">
              <Award className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Visa Assistance</h3>
              <p className="text-gray-600">Streamlined visa process with expert guidance.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-secondary">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 glass-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20" />
                <div>
                  <h4 className="font-semibold">John Doe</h4>
                  <p className="text-sm text-gray-600">Student Traveler</p>
                </div>
              </div>
              <p className="text-gray-600">"The service was exceptional and saved me so much time!"</p>
            </Card>
            
            {/* Add more testimonials similarly */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Start Your Journey Today</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Let us help you plan your next adventure with our AI-powered travel planning tools.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
            Get Started
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
