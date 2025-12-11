import TitleHeader from "../components/TitleHeader";
import { testimonials } from "../constants";

const Certifications = () => {
  return (
    <section id="testimonials" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Certifications & Achievements"
          sub="🎓 Industry-recognized certifications"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-16">
          {testimonials.map((cert, index) => (
            <div
              key={index}
              className="group relative bg-black-100 border border-black-50 rounded-xl p-6 
                         hover:border-white/20 transition-all duration-300 hover:-translate-y-1
                         hover:shadow-lg hover:shadow-white/5"
            >
              {/* Icon/Image */}
              <div className="mb-4 h-12 w-12 flex items-center justify-center bg-white-10 rounded-lg p-2">
                <img
                  src={cert.imgPath}
                  alt={cert.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-1">{cert.name}</h3>

              {/* Credential */}
              <p
                className="text-sm font-medium mb-3 text-secondary"
              >
                {cert.mentions}
              </p>

              {/* Description */}
              <p className="text-white-50 text-sm leading-relaxed">
                {cert.review}
              </p>

              {/* Verify Link */}
              {cert.verifyUrl && cert.verifyUrl !== "#" && (
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-secondary hover:text-white transition-colors"
                >
                  Verify Certificate →
                </a>
              )}

              {/* Subtle glow on hover */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-white"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
