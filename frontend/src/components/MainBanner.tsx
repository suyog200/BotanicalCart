import heroImg from "../assets/hero-plants.jpg";

const MainBanner = () => {
  return (
    <section className="relative h-96 overflow-hidden">
      <img
        src={heroImg}
        alt="Plant nursery"
        className="w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold text-foreground mb-4 animate-fade-in">
              Bring Nature Home
            </h2>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
              Discover our curated collection of beautiful plants for every
              space and purpose
            </p>
            {/* Optional search bar */}
            {/* <div className="relative max-w-md animate-fade-in">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search plants..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 bg-card/80 backdrop-blur-sm border-border/50"
          />
        </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainBanner;
