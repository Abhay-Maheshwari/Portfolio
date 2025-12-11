import { educationList } from "../constants";
import TitleHeader from "../components/TitleHeader";

const Education = () => {
  return (
    <section id="education" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Education"
          sub="📚 Academic Background"
        />

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
      </div>
    </section>
  );
};

export default Education;

