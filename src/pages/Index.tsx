
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe2, Compass, Award } from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { TextRotate } from "@/components/ui/text-rotate";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const splashImages = [
    {
      url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      title: "Paris Cityscape",
    },
    {
      url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
      title: "Tokyo Nights",
    },
    {
      url: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0",
      title: "Venice Canals",
    },
  ];

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <motion.div
            className="fixed inset-0 z-50 bg-white"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <section className="w-full h-screen overflow-hidden flex flex-col items-center justify-center relative">
              <Floating sensitivity={-0.5} className="h-full">
                {splashImages.map((img, index) => (
                  <FloatingElement
                    key={index}
                    depth={1 + index * 0.5}
                    className={`top-[${15 + index * 20}%] left-[${5 + index * 25}%]`}
                  >
                    <motion.img
                      src={img.url}
                      alt={img.title}
                      className="w-40 h-40 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rounded-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 * index }}
                    />
                  </FloatingElement>
                ))}
              </Floating>

              <div className="z-50 text-center">
                <motion.h1
                  className="text-4xl md:text-6xl font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Make your{" "}
                  <LayoutGroup>
                    <motion.span className="flex inline-flex">
                      <motion.span>travel</motion.span>
                      <TextRotate
                        texts={[
                          "magical ✨",
                          "memorable 🌟",
                          "amazing 🎉",
                          "dreamy ☁️",
                          "perfect 💫",
                        ]}
                        mainClassName="overflow-hidden pl-2 text-primary"
                        staggerDuration={0.03}
                        staggerFrom="last"
                        rotationInterval={2000}
                      />
                    </motion.span>
                  </LayoutGroup>
                </motion.h1>
              </div>
            </section>
          </motion.div>
        ) : (
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
                      src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34"
                      alt="Travel Destination"
                      className="w-full h-auto rounded-lg shadow-xl"
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
                  <Card className="p-6 hover:scale-105 transition-transform">
                    <Globe2 className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Seamless Ticket Booking</h3>
                    <p className="text-gray-600">Book flights easily with our user-friendly platform.</p>
                  </Card>
                  
                  <Card className="p-6 hover:scale-105 transition-transform">
                    <Compass className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">AI Travel Planning</h3>
                    <p className="text-gray-600">Get personalized itineraries crafted by our AI.</p>
                  </Card>
                  
                  <Card className="p-6 hover:scale-105 transition-transform">
                    <Award className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Visa Assistance</h3>
                    <p className="text-gray-600">Streamlined visa process with expert guidance.</p>
                  </Card>
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
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
