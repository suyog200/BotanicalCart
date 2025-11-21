import heroImg from "../assets/hero-plants.jpg";

const MainBanner = () => {
  return (
    <section className="relative h-96 overflow-hidden rounded-2xl shadow-lg">
      <img
        src={heroImg}
        alt="Plant nursery"
        className="w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainBanner;
