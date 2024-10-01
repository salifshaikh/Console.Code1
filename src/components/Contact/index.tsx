import NewsLatterBox from "./NewsLatterBox";
import Testimonials from "@/components/Testimonials";

const Contact = () => {
  const faqs = [
    {
      question: "What services does your website offer?",
      answer: "Our website offers a wide range of services including [list your main services here]. We cater to [your target audience] and aim to [your main goal]."
    },
    {
      question: "How can I create an account?",
      answer: "To create an account, click on the 'Sign Up' button in the top right corner of our homepage. Follow the prompts to enter your details and verify your email address."
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we take data security very seriously. We use industry-standard encryption and security measures to protect your personal information. For more details, please review our Privacy Policy."
    },
    {
      question: "How can I get technical support?",
      answer: "For technical support, you can use the contact form on this page, email our support team at support@example.com, or call our helpline at (123) 456-7890 during business hours."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer refunds within 30 days of purchase if you're not satisfied with our service. Please refer to our Refund Policy for more details and conditions."
    }
  ];

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div
              className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s"
            >
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Need Assistance? Contact Our Support Team
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                Our team is here to help you with any issues or questions you may have regarding our platform.
              </p>
              <form>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="message"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="How can we assist you?"
                        className="border-stroke w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <button className="rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark">
                      Submit Query
                    </button>
                  </div>
                </div>
              </form>

            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <NewsLatterBox />
          </div>
        </div>
        <Testimonials />
      {/* FAQs Section */}
        <div className="mt-16">
          <h2 className="mb-8 text-3xl font-bold text-black dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-lg bg-white p-5 shadow-md dark:bg-gray-dark">
                <h3 className="mb-3 text-xl font-semibold text-black dark:text-white">
                  {faq.question}
                </h3>
                <p className="text-body-color dark:text-body-color-dark">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
