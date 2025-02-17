
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Book, Globe, Users, CheckCircle } from "lucide-react";

const StudentVisa = () => {
  const countries = [
    {
      name: "United States",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8",
      description: "Study at top-ranked universities in the USA",
      features: ["F-1 Student Visa", "Optional Practical Training", "Multiple Entry"]
    },
    {
      name: "United Kingdom",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
      description: "Quality education in the heart of Europe",
      features: ["Tier 4 Student Visa", "Post-Study Work Visa", "NHS Access"]
    },
    {
      name: "Canada",
      image: "https://images.unsplash.com/photo-1517935706615-2717063c2225",
      description: "Excellent education and quality of life",
      features: ["Study Permit", "Work While Studying", "Immigration Pathway"]
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
            Student Visa Services
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Your gateway to international education. We help students achieve their dreams of studying abroad.
          </motion.p>
        </div>

        {/* Featured Countries */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {countries.map((country, index) => (
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
                    src={country.image}
                    alt={country.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{country.name}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-4">{country.description}</p>
                  <ul className="space-y-2 mb-4">
                    {country.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">Learn More</Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Services */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <motion.div 
            className="text-center p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <GraduationCap className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Visa Guidance</h3>
            <p className="text-gray-600">Expert assistance throughout your visa application process.</p>
          </motion.div>

          <motion.div 
            className="text-center p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Book className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Documentation</h3>
            <p className="text-gray-600">Complete document preparation and verification.</p>
          </motion.div>

          <motion.div 
            className="text-center p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">University Selection</h3>
            <p className="text-gray-600">Help choosing the right university and program.</p>
          </motion.div>

          <motion.div 
            className="text-center p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Interview Prep</h3>
            <p className="text-gray-600">Comprehensive visa interview preparation.</p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudentVisa;
