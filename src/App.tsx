import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TECH_ITEMS } from './data/techData';
import { TechId } from './types';
import { TiltCard } from './components/3dTiltCard';
import pythonPostgresPowerBiImg from '.\assets\images\python_postgres_powerbi_logo_1785583502475.jpg';
import {
  Search,
  X,
  Code2,
  Sun,
  Moon,
  Phone,
  Mail,
  MessageCircle,
  FileText,
  ExternalLink,
  CheckCircle2,
  GitBranch,
  Database
} from 'lucide-react';

export default function App() {
  const [selectedTechId, setSelectedTechId] = useState<TechId>('mysql');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const isDark = theme === 'dark';

  useEffect(() => {
    const faviconEl = document.getElementById('app-favicon') as HTMLLinkElement | null;
    const faviconUrl = isDark ? '/favicon-dark.svg' : '/favicon-light.svg';
    if (faviconEl) {
      faviconEl.href = faviconUrl;
    } else {
      const newFavicon = document.createElement('link');
      newFavicon.id = 'app-favicon';
      newFavicon.rel = 'icon';
      newFavicon.type = 'image/svg+xml';
      newFavicon.href = faviconUrl;
      document.head.appendChild(newFavicon);
    }
  }, [isDark]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const categories = ['All', 'Database & SQL', 'Data Science & Code', 'Spreadsheets', 'Business Intelligence', 'Data Visualization', 'Statistics & Math'];

  const filteredTech = TECH_ITEMS.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTileClick = (techId: TechId) => {
    setSelectedTechId(techId);
  };

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-500 selection:bg-cyan-500 selection:text-slate-950 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
      }`}
    >
      {/* Background Ambient Glow FX */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className={`absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl transition-opacity duration-500 ${
          isDark ? 'bg-cyan-600/10 opacity-100' : 'bg-cyan-400/20 opacity-80'
        }`} />
        <div className={`absolute top-1/3 -right-40 w-96 h-96 rounded-full blur-3xl transition-opacity duration-500 ${
          isDark ? 'bg-purple-600/10 opacity-100' : 'bg-indigo-400/20 opacity-80'
        }`} />
        <div className={`absolute bottom-10 left-1/3 w-96 h-96 rounded-full blur-3xl transition-opacity duration-500 ${
          isDark ? 'bg-amber-600/10 opacity-100' : 'bg-amber-400/20 opacity-80'
        }`} />
      </div>

      {/* Main Wrapper Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-8 landscape:py-4 space-y-6 sm:space-y-12 landscape:space-y-6">
        {/* Navigation Bar */}
        <header className={`flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-6 landscape:pb-4 border-b transition-colors duration-500 ${
          isDark ? 'border-slate-800/80' : 'border-slate-200'
        }`}>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 p-0.5 shadow-lg shadow-cyan-500/20 shrink-0">
                <div className={`w-full h-full rounded-[10px] flex items-center justify-center transition-colors duration-500 ${
                  isDark ? 'bg-slate-950 text-cyan-400' : 'bg-white text-cyan-600'
                }`}>
                  <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
              <div>
                <h1 className={`text-sm sm:text-xl font-bold tracking-tight flex items-center gap-2 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Nazim Khan — Data Analytics Portfolio
                </h1>
                <p className={`text-[10px] sm:text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Interactive Tech Stack & Showcase • MySQL, Python, Excel, Power BI, Tableau, R
                </p>
              </div>
            </div>
          </div>

          {/* Controls: Theme Switcher & Quick Badge */}
          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            <div className={`flex sm:hidden flex-col items-center justify-center px-3 py-1 rounded-xl text-xs font-medium border transition-colors text-center ${
              isDark ? 'bg-slate-900/90 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm'
            }`}>
              <span className="font-semibold leading-tight">Nazim Khan</span>
              <span className={`text-[10px] leading-tight ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Data Analyst</span>
            </div>

            {/* Animated Light / Dark Theme Slider Switch */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                role="switch"
                aria-checked={!isDark}
                onClick={toggleTheme}
                className={`relative w-16 h-8 rounded-full p-1 transition-colors duration-300 focus:outline-none border shadow-inner flex items-center cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 border-slate-700/80 shadow-slate-950/50 justify-start'
                    : 'bg-slate-200 border-slate-300 shadow-slate-300/50 justify-end'
                }`}
                title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
              >
                {/* Track Background Icons */}
                <div className="absolute inset-0 flex items-center justify-between px-2 text-xs pointer-events-none select-none">
                  <Sun className={`w-3.5 h-3.5 transition-opacity ${isDark ? 'text-amber-400' : 'text-slate-400/50'}`} />
                  <Moon className={`w-3.5 h-3.5 transition-opacity ${isDark ? 'text-slate-600/50' : 'text-indigo-600'}`} />
                </div>

                {/* Animated Sliding Thumb Knob */}
                <motion.div
                  layout
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className={`z-10 w-6 h-6 rounded-full flex items-center justify-center shadow-md ${
                    isDark
                      ? 'bg-gradient-to-tr from-amber-400 to-amber-300 text-slate-950'
                      : 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white'
                  }`}
                >
                  {isDark ? (
                    <Sun className="w-3.5 h-3.5 fill-amber-950/20" />
                  ) : (
                    <Moon className="w-3.5 h-3.5 fill-white/20" />
                  )}
                </motion.div>
              </button>
            </div>

            <div className={`hidden sm:flex flex-col items-center justify-center px-3.5 py-1 rounded-xl text-xs font-medium border transition-colors text-center ${
              isDark ? 'bg-slate-900/90 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm'
            }`}>
              <span className="font-semibold leading-tight">Nazim Khan</span>
              <span className={`text-[11px] leading-tight ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Data Analyst</span>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="text-center space-y-2.5 sm:space-y-4 landscape:space-y-3 max-w-3xl mx-auto pt-1 sm:pt-4">
          <h2 className={`text-2xl sm:text-4xl lg:text-5xl landscape:text-3xl font-extrabold tracking-tight leading-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Nazim Khan <br />
            <span className={
              isDark
                ? 'bg-gradient-to-r from-cyan-400 via-amber-300 to-purple-400 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent'
            }>
              Data Analyst
            </span>
          </h2>

          <p className={`text-xs sm:text-base landscape:text-xs leading-relaxed max-w-2xl mx-auto font-normal px-2 ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Motivated AI & Data Science fresher with strong foundation in data analytics, SQL, Python, Excel, and Power BI. Skilled in data cleaning, analysis, and visualization to deliver actionable insights. Seeking an entry-level Data Analyst role.
          </p>

          {/* Resume CTA Button */}
          <div className="pt-1 flex justify-center">
            <a
              href="https://github.com/Nazim2070/resume/blob/main/1_Nazim_Khan_Resume.docx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-lg shadow-emerald-500/25 border border-emerald-300 transition-all hover:scale-105 active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>View Resume</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>

          {/* Category Filter Chips & Search Bar */}
          <div className="pt-2 sm:pt-4 landscape:pt-2 space-y-2.5 sm:space-y-4 landscape:space-y-2.5">
            <div className="relative max-w-md mx-auto">
              <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search MySQL, Pandas, Excel, Power BI, Tableau, R..."
                className={`w-full pl-10 pr-10 py-2.5 border rounded-xl text-xs focus:outline-none focus:border-cyan-500 transition-colors shadow-inner ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-slate-200 placeholder-slate-500'
                    : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 shadow-sm'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                    isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex overflow-x-auto sm:flex-wrap justify-start sm:justify-center items-center gap-1.5 pt-1 pb-2 sm:pb-0 -mx-3 px-3 sm:mx-0 sm:px-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 sm:shrink transition-colors ${
                    selectedCategory === cat
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : isDark
                      ? 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
                      : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 3D Tile Grid Showcase */}
        <section className="space-y-6">
          <div className="grid grid-cols-1 landscape:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredTech.map((tech) => (
              <TiltCard
                key={tech.id}
                tech={tech}
                isSelected={selectedTechId === tech.id}
                onClick={() => handleTileClick(tech.id)}
                theme={theme}
              />
            ))}
          </div>

          {filteredTech.length === 0 && (
            <div className={`p-8 sm:p-12 text-center border rounded-2xl text-xs sm:text-sm ${
              isDark
                ? 'bg-slate-900/50 border-slate-800 text-slate-400'
                : 'bg-white border-slate-200 text-slate-500'
            }`}>
              No technologies found matching "{searchQuery}".
            </div>
          )}
        </section>

        {/* End-to-End Analytics Pipeline Section (Python + PostgreSQL + Power BI) */}
        <section className={`p-5 sm:p-8 rounded-2xl sm:rounded-3xl border transition-colors relative overflow-hidden ${
          isDark
            ? 'bg-slate-900/80 border-slate-800/80 shadow-2xl shadow-cyan-950/20'
            : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
        }`}>
          {/* Subtle Top Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-cyan-500 to-yellow-400" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
            {/* Left: 3D Logo & Pipeline Overview */}
            <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 text-center sm:text-left w-full lg:w-auto">
              <div className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-2xl border shrink-0 transition-transform duration-500 hover:scale-105 ${
                isDark ? 'border-slate-700/60 shadow-cyan-500/10' : 'border-slate-200 shadow-slate-300'
              }`}>
                <img
                  src={pythonPostgresPowerBiImg}
                  alt="Python + PostgreSQL + Power BI 3D Stack Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-40 ${
                  isDark ? 'from-slate-950/70' : 'from-slate-900/20'
                }`} />
              </div>

              <div className="space-y-2 max-w-xl">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full border bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                    Full-Stack Analytics
                  </span>
                  <span className={`text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-md border ${
                    isDark ? 'text-slate-400 bg-slate-800/80 border-slate-700/50' : 'text-slate-600 bg-slate-100 border-slate-200'
                  }`}>
                    End-to-End Project
                  </span>
                </div>

                <h3 className={`text-lg sm:text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Customer Shopping Behaviour
                </h3>

                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Integrated end-to-end analytics workflow for Customer Shopping Behaviour: combining automated Python &amp; Pandas data cleaning, relational PostgreSQL schema storage, and an interactive Power BI dashboard.
                </p>

                {/* Key Features Chips */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1">
                  <span className={`text-[10px] px-2.5 py-1 rounded-lg border flex items-center gap-1 ${
                    isDark ? 'bg-slate-800/60 border-slate-700/60 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}>
                    <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>ETL &amp; Pandas Wrangling</span>
                  </span>
                  <span className={`text-[10px] px-2.5 py-1 rounded-lg border flex items-center gap-1 ${
                    isDark ? 'bg-slate-800/60 border-slate-700/60 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}>
                    <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>PostgreSQL Schemas &amp; Views</span>
                  </span>
                  <span className={`text-[10px] px-2.5 py-1 rounded-lg border flex items-center gap-1 ${
                    isDark ? 'bg-slate-800/60 border-slate-700/60 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}>
                    <CheckCircle2 className="w-3 h-3 text-yellow-400 shrink-0" />
                    <span>Interactive Dashboard</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0 justify-center">
              <a
                href="https://github.com/Nazim-Khan-2315/Customer_Shopping_Behaviour"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 shadow-lg shadow-cyan-500/25 border border-cyan-300 transition-all active:scale-95"
              >
                <GitBranch className="w-4 h-4" />
                <span>Explore Project</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <a
                href="https://github.com/Nazim-Khan-2315/Customer_Shopping_Behaviour/blob/main/Customer%20Shopping%20Behaviour%20Analysis%20Report.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold border transition-all active:scale-95 ${
                  isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                }`}
              >
                <Database className="w-4 h-4 text-cyan-400" />
                <span>Report</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>
          </div>
        </section>

        {/* Contact & Connect Section */}
        <section className={`p-5 sm:p-8 rounded-2xl sm:rounded-3xl border transition-colors ${
          isDark
            ? 'bg-slate-900/80 border-slate-800/80 shadow-2xl shadow-cyan-950/20'
            : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
        }`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
            <div className="flex items-center gap-4 text-center md:text-left w-full md:w-auto justify-center md:justify-start">
              <div>
                <h3 className={`text-base sm:text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Nazim Khan
                </h3>
                <p className={`text-xs sm:text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Data Analyst
                </p>
                <span className="inline-flex items-center gap-1.5 mt-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available for Entry-Level Roles
                </span>
              </div>
            </div>

            {/* Clickable Contact Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 landscape:grid-cols-2 gap-3 w-full md:w-auto shrink-0">
              {/* Phone Button */}
              <a
                href="tel:7290848950"
                className="flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25 border border-cyan-300 transition-all active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>Call: 7290848950</span>
              </a>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/917290848950"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 border border-emerald-300 transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: 7290848950</span>
              </a>

              {/* Email Button */}
              <a
                href="mailto:khan.nazim.2315@gmail.com"
                className={`flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold border transition-all active:scale-95 ${
                  isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                }`}
              >
                <Mail className="w-4 h-4 text-purple-400" />
                <span className="truncate">khan.nazim.2315@gmail.com</span>
              </a>

              {/* Resume Button */}
              <a
                href="https://github.com/Nazim2070/resume/blob/main/1_Nazim_Khan_Resume.docx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/25 border border-emerald-300 transition-all active:scale-95"
              >
                <FileText className="w-4 h-4" />
                <span>Resume</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`pt-6 sm:pt-8 pb-4 sm:pb-6 border-t text-center text-[11px] sm:text-xs transition-colors ${
          isDark ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-500'
        }`}>
          <div className={`flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-4 gap-y-1.5 font-medium px-2 ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            <span>MySQL</span>
            <span className="text-slate-600/60 font-light">•</span>
            <span>Python + Pandas</span>
            <span className="text-slate-600/60 font-light">•</span>
            <span>Excel</span>
            <span className="text-slate-600/60 font-light">•</span>
            <span>Power BI</span>
            <span className="text-slate-600/60 font-light">•</span>
            <span>Tableau</span>
            <span className="text-slate-600/60 font-light">•</span>
            <span>R Language</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
