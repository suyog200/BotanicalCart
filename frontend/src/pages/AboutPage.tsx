import { ColorfulTextHeader } from "@/components/ColorfulTextHeader";
import { Card, CardContent } from "@/components/ui/card";
import Img from "@/assets/signupImg.png"
import { values } from "@/lib/coreValues"
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";



export default function AboutPage() {
  return (
    <div className="mt-10">
      <ColorfulTextHeader
        featuredText="Botanical Cart"
        text1="About"
        text2=""
      />
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 px-4 py-12">
        {/* Left Side: Image with floating community block */}
        <div className="relative shadow-2xl shadow-indigo-600/40 rounded-2xl overflow-hidden shrink-0">
          <img
            className="max-w-md w-full object-cover rounded-2xl h-100"
            src={Img}
            alt="Plant Showcase"
          />
        </div>

        {/* Right Side: Text Content */}
        <div className="text-xl text-slate-600 max-w-lg">
          <p>
            Botanical Cart is your online destination for beautiful, healthy,
            and hand-picked plants. Whether you're enhancing your home,
            workspace, or garden, we bring nature closer to you with a seamless
            shopping experience.
          </p>
          <p className="mt-4">
            Discover a curated range of plants categorized by style, space, and
            purpose. Each plant comes with care tips, availability info, and
            clean visuals to help you choose the right greenery for your needs.
          </p>
          <p className="mt-4">
            Built with performance and simplicity in mind, Botanical Cart offers
            a clean interface and modern features—making your plant shopping
            journey smooth and inspiring.
          </p>

          <button className="flex items-center gap-2 mt-8 hover:-translate-y-0.5 transition bg-gradient-to-r from-green-600 to-lime-500 py-3 px-8 rounded-full text-white">
            <span>Explore more</span>
            <svg
              width="13"
              height="12"
              viewBox="0 0 13 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z"
                fill="#fff"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-none text-center hover:shadow-plant transition-all duration-300 bg-white">
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </CardContent>
            </Card>
            ))}
          </div>
        </div>
      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-foreground text-center mb-12">Frequently Asked Questions</h2>
        <FAQ />
      </div>
      <div className="mt-16 mb-10">
        <ContactForm />
      </div>
    </div>
  );
}
