import React, { useState } from 'react';
import { SOCIAL_LINKS, PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUpRight, Check, Copy, ExternalLink, Mail, Send, Terminal } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [copied, setCopied] = useState(false);
  const [transmissionStatus, setTransmissionStatus] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    setTransmissionStatus('TRANSMITTING...');
    setTimeout(() => {
      setTransmissionStatus('DISPATCH CONFIRMED // PACKET LOGGED (LOCAL SIMULATION)');
      // Open mailto fallback as convenient real dispatch
      const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
        formData.subject || 'Portfolio Inquiry'
      )}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
      window.location.href = mailtoUrl;
    }, 600);
  };

  return (
    <section
      id="contact"
      className="w-full border-b-4 border-black bg-white relative"
    >
      {/* Section Header Banner */}
      <div className="border-b-4 border-black bg-[#F2F2F2] p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-[#FF3000] uppercase block mb-1">
            04. NETWORK PROTOCOL & TELEMETRY
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase text-black">
            CONNECT & TRANSMIT
          </h2>
        </div>

        {/* Copy Direct Email Button */}
        <button
          id="btn-copy-email"
          onClick={handleCopyEmail}
          className="h-12 px-6 bg-black text-white hover:bg-[#FF3000] uppercase font-black text-xs tracking-widest flex items-center gap-2 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-sm"
        >
          {copied ? <Check className="w-4 h-4 text-white animate-bounce" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY EMAIL: VIPLOV7@ICLOUD.COM'}</span>
        </button>
      </div>

      {/* Asymmetric 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y-4 lg:divide-y-0 lg:divide-x-4 divide-black">
        {/* Left Column: Transmission Terminal Form (6 Cols) */}
        <div className="lg:col-span-6 p-6 sm:p-10 md:p-12 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-4 mb-6 border-b-2 border-black/20 text-xs font-mono font-bold tracking-widest uppercase text-neutral-600">
              <span className="w-2.5 h-2.5 bg-[#FF3000]" />
              <span>TRANSMISSION TERMINAL // FORM PROTOCOL</span>
            </div>

            <form onSubmit={handleSend} className="space-y-6">
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-widest text-black mb-2">
                  01. SENDER IDENTITY [NAME]
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="E.G. PROF. SMITH / RECRUITER"
                  className="w-full h-12 px-4 bg-[#F2F2F2] border-2 border-black text-sm font-mono uppercase font-bold text-black placeholder:text-neutral-400 focus:outline-none focus:border-[#FF3000] focus:bg-white transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-widest text-black mb-2">
                  02. RETURN TELEMETRY [EMAIL]
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="CONTACT@ORGANIZATION.COM"
                  className="w-full h-12 px-4 bg-[#F2F2F2] border-2 border-black text-sm font-mono uppercase font-bold text-black placeholder:text-neutral-400 focus:outline-none focus:border-[#FF3000] focus:bg-white transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-widest text-black mb-2">
                  03. TOPIC / SUBJECT
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="PROJECT COLLABORATION // INTERNSHIP // INQUIRY"
                  className="w-full h-12 px-4 bg-[#F2F2F2] border-2 border-black text-sm font-mono uppercase font-bold text-black placeholder:text-neutral-400 focus:outline-none focus:border-[#FF3000] focus:bg-white transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-widest text-black mb-2">
                  04. MESSAGE PAYLOAD
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="INPUT DETAILS REGARDING THE PROPOSED COMPUTATION OR OPPORTUNITY..."
                  className="w-full p-4 bg-[#F2F2F2] border-2 border-black text-sm font-mono uppercase font-bold text-black placeholder:text-neutral-400 focus:outline-none focus:border-[#FF3000] focus:bg-white transition-all duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                id="btn-submit-transmission"
                className="w-full h-14 bg-black text-white text-xs font-black tracking-widest uppercase hover:bg-[#FF3000] transition-all duration-200 flex items-center justify-between px-6 cursor-pointer group shadow-xs hover:shadow-sm"
              >
                <span>DISPATCH TRANSMISSION</span>
                <Send className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              {transmissionStatus && (
                <div className="p-3 bg-black text-white font-mono text-xs border-2 border-[#FF3000] flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FF3000] animate-pulse" />
                  <span>{transmissionStatus}</span>
                </div>
              )}
            </form>
          </div>

          <div className="mt-8 pt-6 border-t-2 border-black/20 text-[10px] font-mono text-neutral-500 uppercase">
            END-TO-END TRANSMISSION ENCODING // DIRECT DISPATCH
          </div>
        </div>

        {/* Right Column: Direct Channels Matrix (6 Cols) */}
        <div className="lg:col-span-6 bg-white divide-y-4 divide-black">
          <div className="p-6 sm:p-8 bg-black text-white">
            <span className="text-xs font-mono font-bold tracking-widest text-[#FF3000] uppercase block mb-1">
              OFFICIAL CHANNELS
            </span>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
              COMMUNICATION REGISTRY
            </h3>
            <p className="text-xs font-sans text-neutral-300 mt-1">
              Direct verification links across digital networks and developer nodes.
            </p>
          </div>

          {SOCIAL_LINKS.map((link, idx) => (
            <a
              key={link.id}
              id={`social-link-${link.id}`}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="p-6 sm:p-8 flex items-center justify-between hover:bg-[#FF3000] hover:text-white transition-all duration-200 group cursor-pointer"
            >
              <div className="flex items-center gap-4 transition-transform duration-200 group-hover:translate-x-1">
                <span className="w-8 h-8 border-2 border-black group-hover:border-white bg-white group-hover:bg-white text-black flex items-center justify-center font-mono font-black text-xs transition-colors duration-200">
                  0{idx + 1}
                </span>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF3000] group-hover:text-white block transition-colors duration-200">
                    {link.platform}
                  </span>
                  <span className="text-base sm:text-lg font-black uppercase tracking-tight text-black group-hover:text-white transition-colors duration-200">
                    {link.label}
                  </span>
                </div>
              </div>

              <div className="w-10 h-10 border-2 border-black group-hover:border-white flex items-center justify-center bg-black group-hover:bg-white text-white group-hover:text-[#FF3000] transition-all duration-200 shadow-xs group-hover:scale-105">
                <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          ))}

          {/* Quick Base Coordinates */}
          <div className="p-6 sm:p-8 bg-[#F2F2F2] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
            <div>
              <span className="text-neutral-500 font-bold uppercase block">RESIDENCE & CAMPUS</span>
              <span className="font-bold text-black uppercase">DELHI & GREATER NOIDA, INDIA</span>
            </div>
            <div className="text-right">
              <span className="text-neutral-500 font-bold uppercase block">LOCAL TIME ZONE</span>
              <span className="font-bold text-[#FF3000] uppercase">UTC+05:30 (IST)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
