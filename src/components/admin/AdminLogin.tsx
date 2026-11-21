import React, { useState } from 'react';
import { Lock, Key, ArrowRight, ShieldCheck, X, AlertCircle } from 'lucide-react';
import { CinematicAudio } from '../../utils/audio';

interface AdminLoginProps {
  onSuccess: () => void;
  onClose: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      // Default passkey for instant access or custom override
      if (password === 'gokul2026' || password === 'admin' || password === 'gokulavasan') {
        CinematicAudio.playMassHit();
        onSuccess();
      } else {
        CinematicAudio.playClick();
        setError('Invalid Security Passkey. Please try again.');
      }
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
      <div className="relative w-full max-w-md rounded-2xl bg-[#0b0b0d] border border-[#261a1a] shadow-[0_0_60px_rgba(255,32,32,0.4)] p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-[#121216] text-gray-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#B50016] to-[#FF5A00] p-[1px] mx-auto mb-4 shadow-[0_0_20px_rgba(255,32,32,0.5)]">
            <div className="w-full h-full bg-[#0b0b0d] rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-[#FF5A00]" />
            </div>
          </div>
          <h2 className="font-cinema font-extrabold text-2xl text-white uppercase tracking-wider">
            ADMIN PORTAL
          </h2>
          <p className="text-xs font-mono text-gray-400 mt-1">
            GOKULAVASAN CINEMATIC CMS
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-950/60 border border-red-800/80 flex items-center gap-2.5 text-xs text-red-200">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-mono tracking-widest uppercase text-gray-400 font-bold mb-1.5">
              SECURITY PASSKEY
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter secret passkey"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#121216] border border-[#261a1a] focus:border-[#FF5A00] focus:outline-none text-white text-xs font-mono placeholder-gray-600 transition-colors"
              />
              <Key className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl text-xs font-mono font-bold tracking-[0.2em] uppercase text-white bg-gradient-to-r from-[#B50016] via-[#FF2020] to-[#FF5A00] hover:brightness-110 shadow-[0_0_20px_rgba(255,32,32,0.4)] transition-all flex items-center justify-center gap-2"
          >
            <span>{isLoading ? 'AUTHENTICATING...' : 'ENTER DASHBOARD'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
