import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowLeft, Lock, Cookie, Eye, Mail, Database } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onBackToHome: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onBackToHome }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
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

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-3xl bg-white p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Transparent &amp; User-Centric</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Privacy Policy
        </h1>

        <p className="text-sm text-slate-500">
          Last updated: September 20, 2026 • Effective immediately
        </p>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Welcome to <strong>Quiz Master</strong> ("we," "our," or "the App"). We are committed to protecting your personal privacy. This Privacy Policy outlines how our web application handles your information when you access our quizzes, games, and educational services.
        </p>
      </motion.div>

      {/* Policy Sections */}
      <div className="space-y-6">
        {/* Section 1: Information Collection */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">1. Information We Collect &amp; Local Storage</h2>
          </div>
          <div className="text-sm text-slate-600 space-y-2 leading-relaxed pl-13">
            <p>
              Quiz Master is designed to be accessible without requiring user account creation, logins, or personal identification details. We do not collect names, passwords, credit cards, or financial details.
            </p>
            <p>
              <strong>Browser Local Storage:</strong> To provide core app features (such as maintaining your best quiz scores, accuracy percentage, completed quiz counts, and audio mute preferences), Quiz Master stores lightweight JSON keys directly inside your web browser’s <code>localStorage</code>. This data remains completely on your local device and is never transmitted to any external marketing database.
            </p>
          </div>
        </div>

        {/* Section 2: Advertisements and Third-Party Services */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Cookie className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">2. Advertising &amp; Third-Party Cookies (Google AdSense)</h2>
          </div>
          <div className="text-sm text-slate-600 space-y-2 leading-relaxed pl-13">
            <p>
              Quiz Master may display advertisements served by third-party advertising partners, including <strong>Google AdSense</strong>. Third-party ad vendors, including Google, may use cookies or web beacons to serve ads based on prior visits to this website or other sites on the internet.
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 ml-2">
              <li>Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our site and/or other sites on the Internet.</li>
              <li>Users may opt out of personalized advertising by visiting Google’s <a href="https://adssettings.google.com" target="_blank" rel="noreferrer" className="text-indigo-600 underline font-medium">Ads Settings</a> or via <a href="https://www.aboutads.info" target="_blank" rel="noreferrer" className="text-indigo-600 underline font-medium">www.aboutads.info</a>.</li>
            </ul>
          </div>
        </div>

        {/* Section 3: Data Security */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">3. Data Security &amp; Retention</h2>
          </div>
          <div className="text-sm text-slate-600 space-y-2 leading-relaxed pl-13">
            <p>
              Because your quiz history is stored locally in your browser, you retain full ownership and control over it. You can erase all saved scores and quiz records at any moment by clearing your browser cache or site data for Quiz Master.
            </p>
          </div>
        </div>

        {/* Section 4: Children's Privacy */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center shrink-0">
              <Eye className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">4. Children's Educational Privacy</h2>
          </div>
          <div className="text-sm text-slate-600 space-y-2 leading-relaxed pl-13">
            <p>
              Quiz Master is an educational trivia and skill improvement application suitable for general audiences of all ages. We do not knowingly collect personal data from children under the age of 13.
            </p>
          </div>
        </div>

        {/* Section 5: Contact Us */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">5. Contact Information</h2>
          </div>
          <div className="text-sm text-slate-600 space-y-2 leading-relaxed pl-13">
            <p>
              If you have any questions, suggestions, or concerns regarding this Privacy Policy or how Quiz Master manages local data, please reach out via our in-app Contact form or via email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
