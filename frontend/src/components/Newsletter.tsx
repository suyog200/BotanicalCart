
export default function Newsletter() {
  return (
    <div className="w-full bg-[var(--newsletter-background)] px-2 text-center text-black py-20 flex flex-col items-center justify-center mt-5 mb-5 rounded-2xl newsletter">
      <p className="text-hero-text-subtitle font-bold">Get updated</p>

      <h1 className="max-w-lg font-semibold text-4xl leading-[44px] mt-2">
        Subscribe to our newsletter & get the latest news
      </h1>

      <div className="flex items-center justify-center mt-10 border border-green-600 focus-within:outline focus-within:outline-green-600 text-sm rounded-full h-14 max-w-md w-full">
        <input
          type="email"
          className="bg-transparent outline-none focus:outline-none focus:ring-0 border-none focus:border-none rounded-full px-4 h-full flex-1 text-black placeholder:text-black/60"
          placeholder="Enter your email address"
        />
        <button className="bg-primary text-white rounded-full h-11 mr-1 px-8 flex items-center justify-center cursor-pointer sm:px-10">
          Subscribe now
        </button>
      </div>
    </div>
  );
}
