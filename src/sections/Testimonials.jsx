import TitleHeader from "../components/TitleHeader";

const certifications = [
  {
    name: "Oracle Cloud Infrastructure",
    credential: "2025 Certified Foundations Associate",
    description: "Foundational knowledge of OCI services, core concepts, and cloud computing principles.",
    icon: "☁️",
    color: "#F80000",
  },
  {
    name: "Oracle Data Platform",
    credential: "2025 Certified Foundations Associate",
    description: "Data management, analytics, and database services fundamentals.",
    icon: "🗄️",
    color: "#F80000",
  },
  {
    name: "Oracle Fusion AI",
    credential: "2025 Certified Foundations Associate",
    description: "AI/ML capabilities and Fusion applications architecture.",
    icon: "🤖",
    color: "#F80000",
  },
  {
    name: "NVIDIA Deep Learning",
    credential: "DLI Certificate in Deep Learning",
    description: "Deep learning fundamentals, neural networks, and GPU-accelerated computing.",
    icon: "🧠",
    color: "#76B900",
  },
];

const Certifications = () => {
  return (
    <section id="testimonials" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Certifications & Credentials"
          sub="🎓 Industry-recognized certifications"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-16">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="group relative bg-black-100 border border-black-50 rounded-xl p-6 
                         hover:border-white/20 transition-all duration-300 hover:-translate-y-1
                         hover:shadow-lg hover:shadow-white/5"
            >
              {/* Icon */}
              <div className="text-4xl mb-4">{cert.icon}</div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-1">{cert.name}</h3>

              {/* Credential */}
              <p
                className="text-sm font-medium mb-3"
                style={{ color: cert.color }}
              >
                {cert.credential}
              </p>

              {/* Description */}
              <p className="text-white-50 text-sm leading-relaxed">
                {cert.description}
              </p>

              {/* Subtle glow on hover */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{ background: `radial-gradient(circle at center, ${cert.color}, transparent 70%)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
