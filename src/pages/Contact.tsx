
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

const Contact = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSubmit = (data: any) => {
    // Email option
    window.location.href = `mailto:contact@wanderluxe.com?subject=New Contact Form Submission&body=Name: ${data.name}%0D%0AEmail: ${data.email}%0D%0AMessage: ${data.message}`;
    
    // WhatsApp option
    // const whatsappMessage = `Name: ${data.name}%0AEmail: ${data.email}%0AMessage: ${data.message}`;
    // window.open(`https://wa.me/1234567890?text=${whatsappMessage}`, '_blank');
    
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <div className="pt-32 container mx-auto px-4">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Get in Touch</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Let us help you plan your perfect journey. Reach out to our travel experts for personalized assistance.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <Mail className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-gray-600">contact@wanderluxe.com</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <Phone className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="text-gray-600">+1 (234) 567-8900</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <MapPin className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
            <p className="text-gray-600">123 Travel Street, Adventure City</p>
          </motion.div>
        </div>

        {/* Contact Form Section */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mb-20">
          <div className="grid md:grid-cols-2">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4">Send us a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    {...register("name", { required: true })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                    placeholder="Your name"
                  />
                  {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                    placeholder="your@email.com"
                  />
                  {errors.email && <span className="text-red-500 text-sm">Valid email is required</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    {...register("message", { required: true })}
                    className="w-full p-2 border rounded-lg h-32 focus:ring-2 focus:ring-primary/50 outline-none"
                    placeholder="How can we help you?"
                  />
                  {errors.message && <span className="text-red-500 text-sm">Message is required</span>}
                </div>

                <Button type="submit" className="w-full">
                  Send Message <Send className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800"
                alt="Travel Adventure"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10 backdrop-blur-sm">
                <div className="p-8 text-white">
                  <MessageSquare className="w-12 h-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Let's Talk</h3>
                  <p>We're here to help plan your perfect journey.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Message Sent!</DialogTitle>
              <DialogDescription>
                Thank you for contacting us. We'll get back to you shortly.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Contact;
