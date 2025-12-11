import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

// EmailJS Configuration - Set these in .env file
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Contact = () => {
    const formRef = useRef(null);
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState({ type: "", message: "" });

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus({ type: "", message: "" });

        try {
            const result = await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                formRef.current,
                EMAILJS_PUBLIC_KEY
            );

            if (result.status === 200) {
                setStatus({ type: "success", message: "Transmission successful! I'll respond soon." });
                setFormState({ name: "", email: "", message: "" });
            } else {
                setStatus({ type: "error", message: "Transmission failed. Please try again." });
            }
        } catch (error) {
            console.error("EmailJS error:", error);
            setStatus({ type: "error", message: "Transmission failed. Please try again." });
        } finally {
            setIsLoading(false);
            // Clear status after 5 seconds
            setTimeout(() => setStatus({ type: "", message: "" }), 5000);
        }
    };

    return (
        <section className="relative w-full min-h-screen bg-[#020202] text-white overflow-hidden flex flex-col pt-20" id="contact">
            <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

            <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 relative z-10">
                {/* Left Column */}
                <div className="relative border-r border-white/10 p-10 flex flex-col justify-center">

                    <div className="space-y-2 relative z-20">
                        <h3 className="text-xl md:text-2xl font-serif italic text-white/80 font-[300]" style={{ fontFamily: '"Playfair Display", serif' }}>
                            Currently available for collaboration.
                        </h3>
                        <h1 className="text-6xl md:text-8xl font-[900] uppercase leading-[0.9] tracking-tight font-sans">
                            LET'S BUILD
                            <br />
                            THE FUTURE.
                        </h1>
                    </div>

                    {/* Background Watermark/Decor */}
                    <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-5">
                        <h1 className="text-[15vw] font-bold leading-none text-white whitespace-nowrap select-none">
                            MAHESHWARI
                        </h1>
                    </div>
                </div>

                {/* Right Column - Form */}
                <div className="p-10 flex flex-col justify-center relative">

                    <div className="w-full max-w-lg mx-auto space-y-12">
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">

                            <div className="group">
                                <label htmlFor="name" className="block text-xs font-mono text-white/60 mb-2 uppercase tracking-widest">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formState.name}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b border-white/20 py-2 text-xl focus:outline-none focus:border-green-400 transition-colors duration-300 font-sans"
                                    autoComplete="off"
                                />
                            </div>

                            <div className="group">
                                <label htmlFor="email" className="block text-xs font-mono text-white/60 mb-2 uppercase tracking-widest">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formState.email}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b border-white/20 py-2 text-xl focus:outline-none focus:border-green-400 transition-colors duration-300 font-sans"
                                    autoComplete="off"
                                />
                            </div>

                            <div className="group">
                                <label htmlFor="message" className="block text-xs font-mono text-white/60 mb-2 uppercase tracking-widest">Message</label>
                                <div className="relative">
                                    <textarea
                                        name="message"
                                        id="message"
                                        value={formState.message}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full bg-[#0a1f0a]/30 border-b border-white/20 py-2 text-xl focus:outline-none focus:border-green-400 transition-colors duration-300 font-sans resize-none pl-4"
                                    />
                                    {/* Flashing cursor effect or indicator */}
                                    <div className="absolute left-0 top-3 w-1.5 h-5 bg-green-500 animate-pulse" style={{ display: formState.message ? 'none' : 'block' }}></div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-4 border border-green-500/30 text-green-400 font-mono uppercase tracking-widest text-sm hover:bg-green-500/10 hover:shadow-[0_0_15px_rgba(74,222,128,0.3)] transition-all duration-300 group relative overflow-hidden ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Transmitting...
                                        </>
                                    ) : (
                                        'Initiate Transmission'
                                    )}
                                </span>
                                <div className="absolute inset-0 bg-green-500/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                            </button>

                            {/* Status Message */}
                            {status.message && (
                                <div className={`text-center font-mono text-sm py-3 px-4 rounded border ${status.type === 'success'
                                    ? 'text-green-400 border-green-500/30 bg-green-500/10'
                                    : 'text-red-400 border-red-500/30 bg-red-500/10'
                                    }`}>
                                    {status.type === 'success' ? '✓ ' : '✗ '}{status.message}
                                </div>
                            )}

                        </form>
                    </div>

                </div>
            </div>

            {/* Footer Bar */}
            <div className="w-full h-16 border-t border-white/10 flex items-center justify-between px-10 font-mono text-xs text-white/40 uppercase bg-[#050505]">
                <div>
                    © {new Date().getFullYear()} [Abhay Maheshwari]. System Ready.
                </div>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-green-400 transition-colors">Twitter</a>
                    <a href="#" className="hover:text-green-400 transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-green-400 transition-colors">Resume</a>
                </div>
            </div>
        </section>
    );
};

export default Contact;
