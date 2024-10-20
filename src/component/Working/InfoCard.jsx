import React from "react";

function InfoCard({ title, imageSrc, content }) {
  return (
    <article className="flex flex-col w-full p-5 bg-[#242424] rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-[#ff6f61] mb-4">{title}</h2>
      <img
        loading="lazy"
        src={imageSrc}
        alt={title}
        className="object-contain mb-6 mx-auto w-40 h-40 rounded-md"
      />
      <div className="text-sm text-white">
        {content.map((paragraph, index) => (
          <React.Fragment key={index}>
            <p className="mb-4">{paragraph}</p>
          </React.Fragment>
        ))}
      </div>
    </article>
  );
}

export default InfoCard;
