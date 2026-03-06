import { Link } from "react-router-dom";
import heroImg from "../assets/hero-plants.jpg";

const MainBanner = () => {
  return (
    <section className="relative h-96 overflow-hidden rounded-2xl shadow-lg">
      <img
        src={heroImg}
        alt="Plant nursery"
        className="w-full h-full object-cover"
        // No lazy — this is the LCP element
        fetchPriority="high"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold text-hero-text-heading mb-4 animate-fade-in">
              Bring Nature Home
            </h2>
            <p className="text-xl text-hero-text-subtitle mb-8 animate-fade-in">
              Discover our curated collection of beautiful plants for every
              space and purpose
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-lime-500 text-white font-semibold py-3 px-8 rounded-full hover:-translate-y-0.5 transition-transform shadow-md"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainBanner;