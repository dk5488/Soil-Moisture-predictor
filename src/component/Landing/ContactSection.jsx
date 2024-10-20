import React from "react";

const ContactSection = () => {
  const socialIcons = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/85eb4d4ca6711de5f14c7ce9c7515f919074192a24cbb1544308692cb79388e4",
      alt: "Social icon 1",
      className: "w-8 aspect-square object-contain",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/7739cd2f1fe32cdcd61c9d7e39c268255052981c66282f0d9152cbfd102d7160",
      alt: "Social icon 2",
      className: "w-8 aspect-square object-contain",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/c97811f3e96dc0c27d95b1159174bf37192c12c58742441603b4db2102fe0e77",
      alt: "Social icon 3",
      className: "w-8 aspect-square object-contain",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/cc7af5f8049308fad1f51da7c5191c4883cc6717232219d3c65e9faf95d48b5b",
      alt: "Social icon 4",
      className: "w-8 aspect-square object-contain",
    },
  ];

  return (
    <section className="p-6 bg-gray-900 text-white min-h-[250px] w-full flex flex-col">
      <h2 className="text-2xl mb-4 text-center">Get in Touch</h2>
      <p className="text-lg mb-4 text-center">We'd love to hear from you! Reach out to us through the following channels:</p>
      <div className="flex justify-center mb-4">
        <div className="flex gap-4">
          {socialIcons.map((icon, index) => (
            <img key={index} src={icon.src} alt={icon.alt} className={icon.className} loading="lazy" />
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl mb-4">About Us</h3>
          <p className="mb-4">
          We are final year students working on this project to provide a solution that helps farmers enhance their productivity and manage their crops more effectively. Our goal is to bring technology to the field and support farmers with practical tools.
          </p>
          <div className="text-center mb-4">
            <p className="mb-2">SRM-IST, Kattankulathur-603203</p>
            <p className="mb-2">Email 1 : divypandey104@gmail.com</p>
            <p className="mb-2">Email 2: tushar786@gmail.com</p>
            <p>Phone: 9999999999</p>
          </div>
          <div className="w-full h-32 bg-gray-700 rounded-lg mb-4">
            {/* Placeholder for a map or additional content */}
            <p className="text-center text-gray-400 p-6">Map Placeholder</p>
          </div>
        </div>
        <form className="flex-1 bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl mb-3 text-center">Send Us a Message</h3>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm mb-1">Name</label>
            <input type="text" id="name" name="name" className="w-full p-2 rounded bg-gray-700 text-white" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm mb-1">Email</label>
            <input type="email" id="email" name="email" className="w-full p-2 rounded bg-gray-700 text-white" />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm mb-1">Message</label>
            <textarea id="message" name="message" rows="4" className="w-full p-2 rounded bg-gray-700 text-white" />
          </div>
          <button type="submit" className="w-full bg-blue-500 px-4 py-2 rounded-lg text-white">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
