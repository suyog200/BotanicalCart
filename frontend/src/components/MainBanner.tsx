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
            <div className="relative max-w-md animate-fade-in">
              <button
                type="button"
                className="text-white bg-(--color-primary) hover:bg-(--color-primary-dull) focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-(--color-primary) dark:hover:bg-(--color-primary-dull) transition duration-300 cursor-pointer"
              >
                Shop Now
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainBanner;
