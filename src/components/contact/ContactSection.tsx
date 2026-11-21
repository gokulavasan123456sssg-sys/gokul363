import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, MapPin, Send, Instagram, Youtube, Sparkles, CheckCircle2, Film } from 'lucide-react';
import { SiteProfile } from '../../types';
import { CinematicAudio } from '../../utils/audio';

interface ContactSectionProps {
  profile: SiteProfile;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Video Editing',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    CinematicAudio.playMassHit();
    setSubmitted(true);
    // Simulate inquiry send
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', projectType: 'Video Editing', message: '' });
    }, 4500);
  };

  return (
    <section id="contact" className="relative py-28 bg-[#0b0b0d] overflow-hidden border-t border-[#261a1a]/60">
      {/* Background Graphic Blocks & Fiery Laser Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-[#B50016]/15 via-[#FF2020]/15 to-[#FF5A00]/15 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121216] border border-[#261a1a] mb-4">
            <Film className="w-3.5 h-3.5 text-[#FF2020]" />
            <span className="text-xs font-mono tracking-[0.25em] text-gray-300 uppercase">
              12 • COLLABORATION & INQUIRY
            </span>
          </div>
          <h2 className="font-cinema font-extrabold tracking-wider text-3xl sm:text-4xl md:text-5xl text-white uppercase mb-4">
            LET'S CREATE SOMETHING CINEMATIC.
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#B50016] via-[#FF2020] to-[#FF5A00] mx-auto rounded-full mb-4" />
          <p className="text-sm text-gray-400 font-sans max-w-xl mx-auto">
            Available for commercial film editing, wedding cinematography, high-impact YouTube series, music videos, and VFX compositing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Direct Contacts & Socials */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Phone Card */}
            <a
              href={`tel:${profile.contact.phone.replace(/\s+/g, '')}`}
              onClick={() => CinematicAudio.playClick()}
              className="flex items-center gap-4 p-5 rounded-2xl bg-[#121216] border border-[#261a1a] hover:border-[#FF2020] hover:shadow-[0_0_25px_rgba(255,32,32,0.25)] transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#050505] border border-gray-800 flex items-center justify-center text-[#FF2020] group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold block">
                  CALL DIRECTLY
                </span>
                <span className="font-cinema font-bold text-base text-white group-hover:text-[#FF9B24] transition-colors">
                  {profile.contact.phone}
                </span>
              </div>
            </a>

            {/* Email Card */}
            <a
              href={`mailto:${profile.contact.email}?subject=Cinematic%20Project%20Inquiry%20-%20Gokulavasan`}
              onClick={() => CinematicAudio.playClick()}
              className="flex items-center gap-4 p-5 rounded-2xl bg-[#121216] border border-[#261a1a] hover:border-[#FF5A00] hover:shadow-[0_0_25px_rgba(255,90,0,0.25)] transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#050505] border border-gray-800 flex items-center justify-center text-[#FF5A00] group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold block">
                  EMAIL INQUIRY
                </span>
                <span className="font-mono text-xs sm:text-sm text-white group-hover:text-[#FF9B24] transition-colors truncate block">
                  {profile.contact.email}
                </span>
              </div>
            </a>

            {/* WhatsApp Card */}
            <a
              href={`https://wa.me/${profile.contact.whatsapp}?text=Hi%20Gokulavasan%2C%20I%20saw%20your%20cinematic%20portfolio%20and%20would%20love%20to%20discuss%20a%20project!`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => CinematicAudio.playClick()}
              className="flex items-center gap-4 p-5 rounded-2xl bg-[#121216] border border-[#261a1a] hover:border-[#FF9B24] hover:shadow-[0_0_25px_rgba(255,155,36,0.25)] transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#050505] border border-gray-800 flex items-center justify-center text-[#FF9B24] group-hover:scale-110 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold block">
                  WHATSAPP CHAT
                </span>
                <span className="font-cinema font-bold text-base text-white group-hover:text-[#FF9B24] transition-colors">
                  Instant WhatsApp Message
                </span>
              </div>
            </a>

            {/* Location Card */}
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#050505] border border-[#261a1a]">
              <div className="w-12 h-12 rounded-xl bg-[#121216] border border-gray-800 flex items-center justify-center text-[#FF2020]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold block">
                  CREATIVE BASE
                </span>
                <span className="font-cinema font-bold text-base text-white">
                  {profile.contact.location}
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="p-5 rounded-2xl bg-[#121216] border border-[#261a1a]">
              <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold block mb-3">
                CONNECT ACROSS PLATFORMS
              </span>
              <div className="flex items-center gap-3">
                {profile.contact.youtube && (
                  <a
                    href={profile.contact.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#0b0b0d] border border-gray-800 hover:border-[#FF2020] hover:text-[#FF2020] text-gray-300 transition-colors"
                    title="YouTube Channel"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                )}
                {profile.contact.instagram && (
                  <a
                    href={profile.contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#0b0b0d] border border-gray-800 hover:border-[#FF5A00] hover:text-[#FF5A00] text-gray-300 transition-colors"
                    title="Instagram Profile"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Direct Message Booking Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#121216] border border-[#261a1a] shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
              <h3 className="font-cinema font-bold text-xl sm:text-2xl text-white uppercase tracking-wide mb-2">
                SEND A PRODUCTION BRIEF
              </h3>
              <p className="text-xs text-gray-400 font-sans mb-8">
                Tell me about your narrative idea, upcoming shoot date, or post-production requirements.
              </p>

              {submitted ? (
                <div className="p-8 rounded-xl bg-[#0b0b0d] border border-[#FF5A00] text-center space-y-3 animate-fade-in">
                  <CheckCircle2 className="w-12 h-12 text-[#FF9B24] mx-auto" />
                  <h4 className="font-cinema font-bold text-lg text-white">BRIEF DISPATCHED</h4>
                  <p className="text-xs text-gray-300">
                    Thank you! Your message has been logged. Gokulavasan will review and respond promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-mono tracking-wider uppercase text-gray-400 mb-1.5 font-bold">
                        YOUR NAME
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Director / Producer"
                        className="w-full px-4 py-3 rounded-lg bg-[#0b0b0d] border border-[#261a1a] focus:border-[#FF5A00] focus:outline-none text-white text-xs font-sans placeholder-gray-600 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono tracking-wider uppercase text-gray-400 mb-1.5 font-bold">
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@production.com"
                        className="w-full px-4 py-3 rounded-lg bg-[#0b0b0d] border border-[#261a1a] focus:border-[#FF5A00] focus:outline-none text-white text-xs font-sans placeholder-gray-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-mono tracking-wider uppercase text-gray-400 mb-1.5 font-bold">
                        PHONE / WHATSAPP
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 ..."
                        className="w-full px-4 py-3 rounded-lg bg-[#0b0b0d] border border-[#261a1a] focus:border-[#FF5A00] focus:outline-none text-white text-xs font-sans placeholder-gray-600 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono tracking-wider uppercase text-gray-400 mb-1.5 font-bold">
                        SERVICE REQUIRED
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-[#0b0b0d] border border-[#261a1a] focus:border-[#FF5A00] focus:outline-none text-white text-xs font-sans transition-colors"
                      >
                        <option value="Video Editing">Video Editing (Premiere / Resolve)</option>
                        <option value="Cinematography">Cinematography & Camera Rig</option>
                        <option value="Photography">Photography (Portrait / Event / Product)</option>
                        <option value="Wedding Film">Cinematic Wedding Film</option>
                        <option value="VFX & 3D">VFX Compositing / 3D Simulation</option>
                        <option value="Full Production">End-to-End Visual Production</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono tracking-wider uppercase text-gray-400 mb-1.5 font-bold">
                      PROJECT DETAILS & VISION
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your timeline, footage details, or creative concept..."
                      className="w-full px-4 py-3 rounded-lg bg-[#0b0b0d] border border-[#261a1a] focus:border-[#FF5A00] focus:outline-none text-white text-xs font-sans placeholder-gray-600 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-lg text-xs font-mono font-bold tracking-[0.2em] uppercase text-white bg-gradient-to-r from-[#B50016] via-[#FF2020] to-[#FF5A00] hover:brightness-110 shadow-[0_0_25px_rgba(255,32,32,0.4)] transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>TRANSMIT CINEMATIC BRIEF</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
