import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Script from "next/script";

const Hero = () => {
  const { theme } = useTheme();
  const [backgroundVideo, setBackgroundVideo] = useState('');
  const [donationAmount, setDonationAmount] = useState('');

  useEffect(() => {
    const videoUrl = theme === "dark"
      ? "https://videos.pexels.com/video-files/6549275/6549275-sd_640_360_25fps.mp4"
      : "https://videos.pexels.com/video-files/1580505/1580505-sd_640_360_30fps.mp4";
    setBackgroundVideo(videoUrl);
  }, [theme]);

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const makePayment = async () => {
    const res = await initializeRazorpay();
  
    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
  
    const amount = parseFloat(donationAmount);
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid donation amount");
      return;
    }
  
    const options = {
      key: "rzp_test_RtyUUL2QwvFazU", // Enter the Key ID generated from the Dashboard
      amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 100 = ₹1.
      currency: "INR",
      name: "Your Organization Name",
      description: "Donation",
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        // You can add your logic here after successful payment
      },
      prefill: {
        name: "Donor Name",
        email: "donor@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Your Organization Address",
      },
      theme: {
        color: "#3399cc",
      },
    };
  
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <section
        id="home"
        className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px] hero-section"
        style={{ position: 'relative' }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          key={backgroundVideo}
          className="absolute top-0 left-0 w-full h-full object-cover -z-1 filter blur-xl scale-110"
          style={{ filter: 'blur(10px)' }}
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="container relative z-10">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[800px] text-center">
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  Empowering Every Learner, Everywhere
                </h1>
                <p className="mb-12 text-base !leading-relaxed text-black dark:text-white sm:text-lg md:text-xl">
                  We are dedicated to leveling the playing field by providing access to educational resources and support for every student, no matter their background.
                </p>
                <div className="flex flex-col items-center justify-center space-y-4">
  <div className="flex items-center space-x-2">
    <input
      type="number"
      value={donationAmount}
      onChange={(e) => setDonationAmount(e.target.value)}
      placeholder="Enter amount"
      className={`rounded-sm border px-4 py-2 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`} // Updated styles
    />
    <button
      onClick={makePayment}
      className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
    >
      Donate ₹{donationAmount || '0'}
    </button>
  </div>
  <p className="text-sm italic text-gray-600 dark:text-gray-300">
    "Your contribution can change a life."
  </p>
</div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;