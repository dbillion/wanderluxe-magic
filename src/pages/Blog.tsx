
import React from "react";
import Navbar from "@/components/Navbar";
import InteractiveBentoGallery from "@/components/ui/InteractiveBentoGallery";

const blogPosts = [
  {
    id: 1,
    type: "image",
    title: "Exploring Paris",
    desc: "A journey through the city of lights",
    url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 2,
    type: "image",
    title: "Santorini Sunset",
    desc: "Mediterranean magic in Greece",
    url: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e",
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 3,
    type: "image",
    title: "Tokyo Nights",
    desc: "Neon lights and city life",
    url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
    span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 4,
    type: "image",
    title: "African Safari",
    desc: "Wildlife adventures in Kenya",
    url: "https://images.unsplash.com/photo-1516426122078-c23e76319801",
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 5,
    type: "image",
    title: "Venice Canals",
    desc: "Romantic waterways of Italy",
    url: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <Navbar />
      <div className="pt-32">
        <InteractiveBentoGallery
          mediaItems={blogPosts}
          title="Travel Adventures"
          description="Explore our collection of stunning destinations and travel stories"
        />
      </div>
    </div>
  );
};

export default Blog;
