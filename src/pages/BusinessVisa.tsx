
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Globe, CheckCircle, Clock, Shield, Users } from "lucide-react";

const BusinessVisa = () => {
  const visaTypes = [
    {
      name: "United States B1 Visa",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
      description: "For business meetings, conferences, and negotiations in the USA",
      features: ["Multiple Entry", "Up to 6 months stay", "Fast processing"]
    },
    {
      name: "UK Business Visa",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      description: "Attend business meetings and establish corporate relationships",
      features: ["Long-term options", "Priority service", "Flexible duration"]
    },
    {
      name: "Schengen Business Visa",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
      description: "Access to 26 European countries for business purposes",
      features: ["Multi-country access", "90 days validity", "Business networking"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/50 to-white">
      <Navbar />
      <div className="pt-32 container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Business Visa Services
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Streamline your international business travel with our comprehensive visa services. We handle the paperwork while you focus on business.
          </motion.p>
        </div>

        {/* Featured Visa Types */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {visaTypes.map((visa, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
              whileHover={{ y: -10 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img
                    src={visa.image}
                    alt={visa.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{visa.name}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-4">{visa.description}</p>
                  <ul className="space-y-2 mb-4">
                    {visa.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">Apply Now</Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Services */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div 
            className="text-center p-6 bg-white rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ y: -5 }}
          >
            <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
            <p className="text-gray-600">Quick turnaround times for urgent business travel needs.</p>
          </motion.div>

          <motion.div 
            className="text-center p-6 bg-white rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ y: -5 }}
          >
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Document Assistance</h3>
            <p className="text-gray-600">Expert help with all required documentation and verification.</p>
          </motion.div>

          <motion.div 
            className="text-center p-6 bg-white rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            whileHover={{ y: -5 }}
          >
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Dedicated Support</h3>
            <p className="text-gray-600">Personal assistance throughout the application process.</p>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mb-16 p-12 bg-primary/5 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Application?</h2>
          <p className="text-gray-600 mb-6">
            Our expert team is ready to assist you with your business visa application.
          </p>
          <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
            <Briefcase className="w-4 h-4 mr-2" />
            Contact Our Visa Experts
          </Button>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default BusinessVisa;
