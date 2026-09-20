import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Send,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  Flag,
} from 'lucide-react';

interface ContactSectionProps {
  onBackToHome: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onBackToHome }) => {
  const [topic, setTopic] = useState<'feedback' | 'report' | 'suggestion'>('feedback');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setError('Please enter your feedback or message.');
      return;
    }

    try {
      // Save feedback locally to persistent feedback log
      const existing = JSON.parse(localStorage.getItem('quizmaster_feedback_v1') || '[]');
      const newEntry = {
        id: 'fb-' + Date.now(),
        topic,
        name: name.trim() || 'Anonymous User',
        email: email.trim() || 'Not provided',
        message: message.trim(),
        date: new Date().toISOString(),
      };
      existing.unshift(newEntry);
      localStorage.setItem('quizmaster_feedback_v1', JSON.stringify(existing.slice(0, 30)));
    } catch {
      // localstorage fallback
    }

    setSubmitted(true);
    setError(null);
  };

  const handleReset = () => {
    setMessage('');
    setName('');
    setEmail('');
    setSubmitted(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-50 text-sm font-semibold transition-colors cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Header card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Feedback &amp; Support</span>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Contact &amp; Feedback
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Have an idea for a new category? Found a question typo? Or simply want to share your experience? We would love to hear from you!
        </p>
      </motion.div>

      {/* Form or Confirmation */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
        {submitted ? (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="py-8 text-center space-y-4"
          >
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-2xl font-bold text-slate-900">Thank You!</h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your feedback has been successfully recorded. We appreciate you taking the time to help make Quiz Master even better!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-bold transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
              <button
                onClick={onBackToHome}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
              >
                Return to Quizzes
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Topic selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                What would you like to do?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setTopic('feedback')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    topic === 'feedback'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-xs'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>General Feedback</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTopic('report')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    topic === 'report'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-xs'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Flag className="w-4 h-4 text-rose-600" />
                  <span>Report Question / Typo</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTopic('suggestion')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    topic === 'suggestion'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-xs'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  <span>Feature Suggestion</span>
                </button>
              </div>
            </div>

            {/* Name & Email inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="contact-name" className="text-xs font-semibold text-slate-700">
                  Your Name (Optional)
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-slate-50"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-email" className="text-xs font-semibold text-slate-700">
                  Email Address (Optional)
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-slate-50"
                />
              </div>
            </div>

            {/* Message input */}
            <div className="space-y-1.5">
              <label htmlFor="contact-message" className="text-xs font-semibold text-slate-700 flex justify-between">
                <span>Message or Issue Description *</span>
                <span className="text-[11px] text-slate-600 font-normal">Required</span>
              </label>
              <textarea
                id="contact-message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  topic === 'report'
                    ? 'Please specify which category or question had an issue and what the correction should be...'
                    : 'Write your message, suggestions, or feedback here...'
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-slate-50 resize-y"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 text-rose-700 text-xs border border-rose-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit button */}
            <button
              id="submit-contact-button"
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 min-h-[44px]"
            >
              <Send className="w-4 h-4" />
              <span>Submit Feedback</span>
            </button>
          </form>
        )}
      </div>

      {/* Direct Contact details */}
      <div className="rounded-2xl bg-slate-100/80 p-4 sm:p-5 border border-slate-200/80 text-xs sm:text-sm text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-slate-700 font-medium">
          <Mail className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>Direct Contact: uzair370312333301@gmail.com</span>
        </div>
        <span className="text-xs text-slate-600">Response time: within 24-48 hours</span>
      </div>
    </div>
  );
};
