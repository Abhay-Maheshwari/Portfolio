import { educationList, testimonials } from "../constants";
import TitleHeader from "../components/TitleHeader";

const Education = () => {
    return (
        <section id="education" className="flex-center section-padding">
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="Background"
                    sub=""
                />

                {/* Education Card */}
                <div className="flex flex-col gap-6 mt-16">
                    {educationList.map((edu) => (
                        <div
                            key={edu.id}
                            className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl border border-black-50 bg-black-100 hover:border-white/20 transition-all duration-300"
                        >
                            {/* Icon/Logo Placeholder */}
                            <div className="md:w-24 md:h-24 w-16 h-16 flex-shrink-0 rounded-xl bg-white-10 p-4 flex-center border border-white/10">
                                <span className="text-3xl">🎓</span>
                            </div>

                            <div className="flex flex-col flex-1 gap-2">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                    <h3 className="text-xl font-bold text-white">{edu.institution}</h3>
                                    <span className="text-white-50 text-sm py-1 px-3 rounded-full border border-white/10 bg-white/5 w-fit">
                                        {edu.date}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <p className="text-secondary font-semibold text-lg">{edu.degree}</p>
                                    <p className="text-white-60 font-medium">{edu.grade}</p>
                                </div>

                                <p className="text-white-50 text-sm mt-2 leading-relaxed">
                                    {edu.desc}
                                </p>

                                {edu.coursework && (
                                    <div className="mt-4 pt-4 border-t border-white/10">
                                        <h4 className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-3">Relevant Coursework</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {edu.coursework.map((course, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-2.5 py-1 text-xs text-blue-200 bg-blue-500/10 border border-blue-500/20 rounded-md"
                                                >
                                                    {course}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Certifications Grid */}
                <div className="mt-12">
                    <h3 className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-6">Certifications & Achievements</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        {testimonials.map((cert, index) => (
                            <div
                                key={index}
                                className="group relative bg-black-100 border border-black-50 rounded-xl p-5 
                           hover:border-white/20 transition-all duration-300 hover:-translate-y-1
                           hover:shadow-lg hover:shadow-white/5"
                            >
                                {/* Icon/Image */}
                                <div className="mb-3 h-10 w-10 flex items-center justify-center bg-white-10 rounded-lg p-2">
                                    <img
                                        src={cert.imgPath}
                                        alt={cert.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                {/* Title */}
                                <h4 className="text-base font-bold text-white mb-1">{cert.name}</h4>

                                {/* Credential */}
                                <p className="text-xs font-medium mb-2 text-secondary">
                                    {cert.mentions}
                                </p>

                                {/* Description */}
                                <p className="text-white-50 text-xs leading-relaxed">
                                    {cert.review}
                                </p>

                                {/* Verify Link */}
                                {cert.verifyUrl && cert.verifyUrl !== "#" && (
                                    <a
                                        href={cert.verifyUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-secondary hover:text-white transition-colors"
                                    >
                                        Verify →
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
            </div>
        </section>
    );
};

export default Education;
