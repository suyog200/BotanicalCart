import { Link } from "react-router-dom";

const linkSections = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", to: "/" },
      { label: "Best Sellers", to: "/products" },
      { label: "Offers & Deals", to: "/products" },
      { label: "Contact Us", to: "/about" },
      { label: "FAQs", to: "/about" },
    ],
  },
  {
    title: "Need Help?",
    links: [
      { label: "Delivery Information", to: "/about" },
      { label: "Return & Refund Policy", to: "/about" },
      { label: "Payment Methods", to: "/about" },
      { label: "Track your Order", to: "/orders" },
      { label: "Contact Us", to: "/about" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { label: "Instagram", to: "https://instagram.com", external: true },
      { label: "Twitter", to: "https://twitter.com", external: true },
      { label: "Facebook", to: "https://facebook.com", external: true },
      { label: "YouTube", to: "https://youtube.com", external: true },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/10">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        <div>
          <Link to="/">
            <h2 className="text-2xl font-bold text-gray-900">Botanical Cart</h2>
          </Link>
          <p className="max-w-[410px] mt-6">
            Botanical Cart is your go-to online destination for vibrant,
            healthy, and hand-picked plants. Whether you're looking to green up
            your home, office, or garden, we offer a wide range of indoor,
            outdoor, and medicinal plants to suit every space and lifestyle.
            Grown with care and delivered with love, our mission is to make
            plant shopping simple, affordable, and joyful.
          </p>
        </div>

        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {linkSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link) =>
                  "external" in link && link.external ? (
                    <li key={link.label}>
                      <a
                        href={link.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline transition"
                      >
                        {link.label}
                      </a>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <Link to={link.to} className="hover:underline transition">
                        {link.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className="py-4 text-center text-sm md:text-base text-gray-500">
        Copyright {new Date().getFullYear()} ©{" "}
        <Link to="/" className="hover:underline">
          Botanical Cart
        </Link>{" "}
        All Rights Reserved.
      </p>
    </footer>
  );
};
