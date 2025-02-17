
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Clock, Tag, Shield, Search } from "lucide-react";

const TicketBooking = () => {
  const destinations = [
    {
      title: "Paris, France",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      price: "499",
      duration: "7h 30m"
    },
    {
      title: "Tokyo, Japan",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
      price: "899",
      duration: "12h 45m"
    },
    {
      title: "Venice, Italy",
      image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0",
      price: "599",
      duration: "8h 15m"
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
            transition={{ duration: 0.5 }}
          >
            Book Your Flights
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover amazing destinations and book your next adventure with our easy-to-use platform.
          </motion.p>
        </div>

        {/* Search Section */}
        <motion.div 
          className="max-w-4xl mx-auto mb-16 p-8 bg-white rounded-2xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              placeholder="From" 
              className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
            />
            <input 
              type="text" 
              placeholder="To" 
              className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
            />
            <input 
              type="date" 
              className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
            />
            <Button className="md:w-auto">
              <Search className="w-4 h-4 mr-2" />
              Search Flights
            </Button>
          </div>
        </motion.div>

        {/* Popular Destinations */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Popular Destinations</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {destinations.map((dest, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                whileHover={{ y: -10 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img
                      src={dest.image}
                      alt={dest.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{dest.title}</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-600">{dest.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Tag className="w-4 h-4 text-primary mr-2" />
                        <span className="text-lg font-bold text-primary">${dest.price}</span>
                      </div>
                    </div>
                    <Button className="w-full">Book Now</Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div 
            className="text-center p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Plane className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Best Flights</h3>
            <p className="text-gray-600">Find the perfect flight for your journey.</p>
          </motion.div>

          <motion.div 
            className="text-center p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Tag className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
            <p className="text-gray-600">Guaranteed best rates and discounts.</p>
          </motion.div>

          <motion.div 
            className="text-center p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure Booking</h3>
            <p className="text-gray-600">Safe and secure payment processing.</p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TicketBooking;
