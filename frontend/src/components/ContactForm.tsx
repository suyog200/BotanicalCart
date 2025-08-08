import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ContactFormSchema } from "@/lib/validation";

const ContactForm = () => {

  const form = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      email: "",
      subject: "",
      message: "",
    }
  });

  async function handleSubmit(values: z.infer<typeof ContactFormSchema>) {
    // Handle form submission
    console.log(values);
  }

  return (
    <section className="rounded-2xl bg-[var(--newsletter-background)]">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">
          Contact Us
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">
          Got a technical issue? Want to send feedback about a beta feature?
          Need details about our Business plan? Let us know.
        </p>
        <form className="space-y-8" onSubmit={form.handleSubmit(handleSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-primary-500 block w-full p-2.5"
              placeholder="name@flowbite.com"
            />
          </div>
          {
            form.formState.errors.email && (
              <p className="text-sm text-red-600">
                {form.formState.errors.email.message}
              </p>
            )}
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-green-500 focus:border-primary-500"
              placeholder="Let us know how we can help you"
            />
          </div>
          {
            form.formState.errors.subject && (
              <p className="text-sm text-red-600">
                {form.formState.errors.subject.message}
              </p>
            )}
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows={6}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-green-500 focus:border-primary-500"
              placeholder="Leave a comment..."
            ></textarea>
          </div>
          {
            form.formState.errors.message && (
              <p className="text-sm text-red-600">
                {form.formState.errors.message.message}
              </p>
            )
          }
          <button
            type="submit"
            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 cursor-pointer"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
