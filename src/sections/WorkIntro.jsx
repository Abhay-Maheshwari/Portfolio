import React from "react";

const WorkIntro = ({ onEnterReel, onPreloadReel }) => {
  return (
    <>
      {/* Anchor for navigation */}
      <div id="work" style={{ position: "relative", top: "-100px" }} aria-hidden="true" />

      <section className="relative overflow-hidden bg-[#0c0a09] py-24 md:py-32 flex items-center justify-center min-h-screen" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 100vh' }}>
        {/* Decorative backdrop glow */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-amber-900/40 rounded-full blur-[130px] animate-pulse" />
          <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] bg-orange-950/40 rounded-full blur-[110px]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12 items-center relative z-10 w-full">
          {/* Text Content */}
          <div className="flex-1 flex flex-col justify-center items-start text-left">
            <span className="text-sm font-semibold tracking-[0.25em] text-[#c24127] uppercase mb-4">
              Selected Showcase
            </span>
            <h2 className="text-5xl md:text-7xl font-bold font-serif leading-tight text-[#e2d5c4] mb-6 drop-shadow-lg">
              Projects & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-orange-500">
                Experiences
              </span>
            </h2>
            <p className="text-stone-400 text-lg md:text-xl max-w-lg leading-relaxed mb-10">
              An interactive scroller showcasing enterprise portals, AI agent automation, custom browser extensions, and developer utilities.
            </p>

            <button
              onClick={onEnterReel}
              onMouseEnter={onPreloadReel}
              onTouchStart={onPreloadReel}
              className="group relative z-50 inline-flex items-center justify-center w-full md:w-auto gap-4 px-10 py-5 bg-[#e2d5c4] text-[#1c1917] font-bold rounded-full text-base tracking-wider shadow-lg hover:bg-[#c24127] hover:text-white transition-all duration-500 transform hover:-translate-y-1 hover:shadow-[#c24127]/20 active:translate-y-0 cursor-pointer border border-transparent hover:border-[#e2d5c4]/30 mt-4 md:mt-0"
            >
              LAUNCH CINEMA REEL
              <span className="flex items-center justify-center w-7 h-7 bg-[#1c1917]/10 rounded-full group-hover:bg-white/20 transition-colors">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="group-hover:translate-x-1.5 transition-transform duration-300"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>

          {/* Graphical Card Stack / Preview Grid */}
          <div className="flex-1 w-full relative flex justify-center items-center h-[320px] md:h-[450px] mt-12 md:mt-0">
            <div className="relative w-full max-w-[320px] h-full flex justify-center items-center">
              {/* Card 1 - VMS */}
              <div
                onClick={onEnterReel}
                className="absolute w-[240px] h-[300px] md:w-[280px] md:h-[360px] rounded-3xl overflow-hidden border border-stone-800 bg-[#1c1917] shadow-2xl transition-all duration-700 transform -rotate-6 -translate-x-12 hover:-translate-y-4 hover:rotate-3 cursor-pointer group hover:z-20 hover:border-amber-700/50"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-[#0c0a09]/50 to-transparent z-10" />
                <img
                  src="/images/VMS Login.webp"
                  alt="VMS"
                  loading="lazy"
                  className="w-full h-full object-cover opacity-60 sepia-[0.3] group-hover:scale-105 group-hover:sepia-0 transition-all duration-700"
                />
                <div className="absolute bottom-6 left-6 z-10">
                  <span className="px-2.5 py-0.5 text-[9px] font-bold bg-[#38281c]/90 border border-amber-900/50 text-[#e2d5c4] rounded-full uppercase tracking-wider">Enterprise</span>
                  <h3 className="text-[#e2d5c4] font-bold text-lg font-serif mt-2">VMS Portal</h3>
                </div>
              </div>

              {/* Card 2 - Chat Index */}
              <div
                onClick={onEnterReel}
                className="absolute w-[240px] h-[300px] md:w-[280px] md:h-[360px] rounded-3xl overflow-hidden border border-stone-800 bg-[#1c1917] shadow-2xl transition-all duration-700 transform rotate-6 translate-x-12 hover:-translate-y-4 hover:-rotate-3 cursor-pointer group hover:z-20 hover:border-orange-700/50"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-[#0c0a09]/50 to-transparent z-10" />
                <img
                  src="/images/ChatIndex.webp"
                  alt="Chat Index"
                  loading="lazy"
                  className="w-full h-full object-cover opacity-60 sepia-[0.3] group-hover:scale-105 group-hover:sepia-0 transition-all duration-700"
                />
                <div className="absolute bottom-6 left-6 z-10">
                  <span className="px-2.5 py-0.5 text-[9px] font-bold bg-[#38281c]/90 border border-orange-900/50 text-[#e2d5c4] rounded-full uppercase tracking-wider">Extension</span>
                  <h3 className="text-[#e2d5c4] font-bold text-lg font-serif mt-2">Chat Indexer</h3>
                </div>
              </div>

              {/* Card 3 - Main Central Card */}
              <div
                onClick={onEnterReel}
                className="absolute w-[240px] h-[300px] md:w-[280px] md:h-[360px] rounded-3xl overflow-hidden border border-stone-700 bg-[#141210] shadow-[0_25px_50px_-12px_rgba(0,0,0,1)] transition-all duration-500 transform hover:scale-105 cursor-pointer group z-10 hover:border-amber-400/40"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-[#0c0a09]/50 to-transparent z-10" />
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-[#1c1917]/60 backdrop-blur-md border border-stone-500/50 flex items-center justify-center text-[#e2d5c4] scale-90 group-hover:scale-100 group-hover:bg-[#c24127] group-hover:border-transparent transition-all duration-500 shadow-xl">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 3l14 9-14 9V3z" />
                    </svg>
                  </div>
                </div>
                <img
                  src="/images/FocusShift.webp"
                  alt="FocusShift"
                  loading="lazy"
                  className="w-full h-full object-cover opacity-50 sepia-[0.4] group-hover:opacity-75 group-hover:sepia-0 transition-all duration-500"
                />
                <div className="absolute bottom-6 left-6 z-10">
                  <span className="px-2.5 py-0.5 text-[9px] font-bold bg-[#e2d5c4]/10 backdrop-blur-md border border-[#e2d5c4]/20 text-[#e2d5c4] rounded-full uppercase tracking-wider">Visual Experience</span>
                  <h3 className="text-[#e2d5c4] font-bold text-xl font-serif mt-2">Interactive Reel</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WorkIntro;
