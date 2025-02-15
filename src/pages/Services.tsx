
import React from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Plane, 
  Hotel, 
  GraduationCap, 
  Briefcase, 
  Map, 
  Compass 
} from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-secondary to-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive travel solutions tailored to your needs. From booking to planning, we've got you covered.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Flight Booking */}
            <Card className="p-6 hover-scale glass-card">
              <Plane className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Flight Booking</h3>
              <p className="text-gray-600 mb-4">Find the best deals on flights worldwide.</p>
              <Button asChild className="w-full">
                <Link to="/tickets">Book Now</Link>
              </Button>
            </Card>

            {/* Accommodation */}
            <Card className="p-6 hover-scale glass-card">
              <Hotel className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Accommodation</h3>
              <p className="text-gray-600 mb-4">Handpicked hotels and stays for every budget.</p>
              <Button asChild className="w-full">
                <Link to="/deals">View Deals</Link>
              </Button>
            </Card>

            {/* Student Visa */}
            <Card className="p-6 hover-scale glass-card">
              <GraduationCap className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Student Visa</h3>
              <p className="text-gray-600 mb-4">Hassle-free student visa processing services.</p>
              <Button asChild className="w-full">
                <Link to="/visa/student">Learn More</Link>
              </Button>
            </Card>

            {/* Business Visa */}
            <Card className="p-6 hover-scale glass-card">
              <Briefcase className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Business Visa</h3>
              <p className="text-gray-600 mb-4">Expert assistance for business travel visas.</p>
              <Button asChild className="w-full">
                <Link to="/visa/business">Learn More</Link>
              </Button>
            </Card>

            {/* Travel Planning */}
            <Card className="p-6 hover-scale glass-card">
              <Map className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI Travel Planning</h3>
              <p className="text-gray-600 mb-4">Personalized itineraries created by AI.</p>
              <Button asChild className="w-full">
                <Link to="/planner">Plan Now</Link>
              </Button>
            </Card>

            {/* Travel Guides */}
            <Card className="p-6 hover-scale glass-card">
              <Compass className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Travel Guides</h3>
              <p className="text-gray-600 mb-4">Expert tips and destination guides.</p>
              <Button asChild className="w-full">
                <Link to="/blog">Read More</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
