
import React, { useState, useEffect } from 'react';
import {
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ArrowRight,
  Menu,
  X,
  Newspaper,
  Globe,
  MessageSquare,
  Send,
  Loader2,
  MapPin,
  Clock,
  Sparkles,
  FileText,
  BadgeCheck,
  Radio,
  Share2,
  TrendingUp,
  CloudSun,
  Printer,
  Quote,
  Mail,
  Phone,
  Award
} from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PERSONAL_INFO, PROJECTS, EVENTS, SOCIAL_LINKS } from './constants';
import SectionHeader from './components/SectionHeader';
import TimelineItem from './components/TimelineItem';
import AICrawlerDemo from './components/AICrawlerDemo';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentEventIdx, setCurrentEventIdx] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // AI Press Desk State
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [groundingLinks, setGroundingLinks] = useState<{ title: string, uri: string }[]>([]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    const savedTheme = localStorage.getItem('gazette-theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('gazette-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('gazette-theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleAiInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim() || isAiLoading) return;

    setIsAiLoading(true);
    setAiResponse(null);
    setGroundingLinks([]);

    try {
      const genAI = new GoogleGenerativeAI(process.env.API_KEY || '');
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-exp",
        tools: [{ googleSearch: {} }]
      });

      const prompt = `You are the Virtual Press Secretary for Yisehak Wondwossen, a prominent Digital Architect and the founder of Ndoto IT Solutions. 
        Your goal is to answer inquiries from journalists and the public with extreme professionalism, authoritative insight, and a sophisticated broadsheet tone (like The New York Times or The Gazette).
        
        CONTEXT:
        ${PERSONAL_INFO.bio}
        
        CURRENT VENTURES:
        1. Ndoto IT Solutions: Focused on high-fidelity digital solutions and regional digital sovereignty.
        2. Notify: An educational communication platform bridging parents and schools.
        
        INQUIRY: "${aiQuery}"
        
        RESPONSE GUIDELINES:
        - Use a journalistic, formal, and objective tone.
        - Reference his advocacy for digital growth in Ethiopia.
        - Use Google Search to provide context on current trends in Ethiopian tech if relevant.
        - Keep the response between 2-4 sentences.
        - Be authoritative but accessible.`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const responseText = response.text();

      setAiResponse(responseText || "The Press Bureau has no official comment on this specific dispatch at this time.");

      // Extract grounding metadata if available
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        const links = chunks
          .filter((chunk: any) => chunk.web)
          .map((chunk: any) => ({
            title: chunk.web?.title || 'Verified Editorial Resource',
            uri: chunk.web?.uri || ''
          }));
        const uniqueLinks = Array.from(new Map(links.map(l => [l.uri, l])).values());
        setGroundingLinks(uniqueLinks);
      }
    } catch (error) {
      console.error("Press Desk Dispatch Error:", error);
      setAiResponse("The editorial wire is currently down. Please resubmit your inquiry shortly.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const nameParts = PERSONAL_INFO.name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans relative overflow-x-hidden ${isDarkMode ? 'bg-[#0a0a0a] text-white' : 'bg-[#fafafa] text-gray-900'}`}>

      {/* Newspaper Ticker */}
      <div className="fixed top-0 w-full py-2 border-b border-black/10 dark:border-white/10 overflow-hidden whitespace-nowrap bg-black text-white dark:bg-white dark:text-black z-[70]">
        <div className="flex animate-marquee">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="mx-12 text-[10px] font-black uppercase tracking-[0.25em] flex items-center gap-3">
              <Newspaper className="w-3 h-3" /> Latest Dispatch: Ndoto IT Solutions expansion reaches new regional milestones
              <Sparkles className="w-3 h-3 ml-4" /> Editorial: How 'Notify' is transforming communication in schools
              <TrendingUp className="w-3 h-3 ml-4" /> Market: Ethiopian Tech Index shows historic growth
              <Globe className="w-3 h-3 ml-4" /> Yishak Wendosen advocates for digital sovereignty in the horn of Africa
            </span>
          ))}
        </div>
      </div>

      {/* Main Masthead Navigation */}
      <nav className={`fixed top-[33px] w-full z-50 transition-all duration-300 border-b ${isScrolled
        ? (isDarkMode ? 'bg-black/95 border-white/10 py-2' : 'bg-white/95 border-black/10 py-2 shadow-md')
        : 'bg-transparent border-transparent py-10'
        } backdrop-blur-md`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center">
            <div className="flex justify-between w-full items-end mb-4 md:mb-1">
              <div className="hidden md:block text-[9px] font-black uppercase tracking-[0.4em] opacity-40">
                {today} • VOL. 01 • ISSUE 042
              </div>
              <a href="#" className="text-4xl md:text-8xl font-black tracking-tighter serif uppercase italic leading-none hover:opacity-70 transition-opacity">
                The {firstName} <span className="not-italic">{lastName}</span>
              </a>
              <div className="hidden md:block text-[9px] font-black uppercase tracking-[0.4em] opacity-40 text-right">
                <CloudSun className="w-3 h-3 inline mr-2" /> Addis Ababa: 24°C • Bureau Dispatch
              </div>
            </div>

            <div className="w-full flex justify-center items-center gap-6 md:gap-10 border-t border-black dark:border-white pt-4 mt-2">
              <div className="hidden md:flex items-center gap-10">
                {[
                  { label: 'The Chronicle', id: 'story' },
                  { label: 'Archives', id: 'creativity' },
                  { label: 'BizWach Tool', id: 'bizwach' },
                  { label: 'Certifications', id: 'certifications' },
                  { label: 'Press Desk', id: 'inquiry' },
                  { label: 'Partners', id: 'partners' },
                  { label: 'Letter to Editor', id: 'letter' }
                ].map((item) => (
                  <a
                    key={item.label}
                    href={`#${item.id}`}
                    className="text-[10px] font-black uppercase tracking-[0.25em] hover:opacity-50 transition-all relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all"></span>
                  </a>
                ))}
                <div className="w-px h-3 bg-black/10 dark:bg-white/10 mx-2"></div>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:scale-110 transition-transform bg-black/5 dark:bg-white/5"
                  aria-label="Toggle Dark Mode"
                >
                  {isDarkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>
              <button
                className="md:hidden p-2 flex items-center gap-2"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center space-y-12 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
          <button className="absolute top-12 right-6 p-2" onClick={() => setMobileMenuOpen(false)}>
            <X className="w-10 h-10" />
          </button>
          {[
            { label: 'The Chronicle', id: 'story' },
            { label: 'Archives', id: 'creativity' },
            { label: 'BizWach Tool', id: 'bizwach' },
            { label: 'Certifications', id: 'certifications' },
            { label: 'Press Desk', id: 'inquiry' },
            { label: 'Partners', id: 'partners' },
            { label: 'Letter to Editor', id: 'letter' }
          ].map((item) => (
            <a
              key={item.label}
              href={`#${item.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-4xl font-black serif uppercase italic hover:opacity-50 transition-opacity"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      {/* Hero Editorial Header */}
      <header className="max-w-6xl mx-auto px-6 pt-80 pb-32 border-b-[10px] border-double border-black dark:border-white grid grid-cols-1 md:grid-cols-12 gap-16 relative">
        <div className="md:col-span-8 space-y-14">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[12px] font-black uppercase tracking-[0.6em] text-gray-400 block">Lead Editorial Feature</span>
              <div className="h-px flex-1 bg-gray-200 dark:bg-white/10"></div>
            </div>
            <h1 className="text-6xl md:text-[12rem] font-black tracking-tighter serif leading-[0.75] md:leading-[0.6] uppercase">
              Digital<br />
              <span className="text-stroke italic serif">Architect</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-8 relative">
              <p className={`text-2xl md:text-3xl serif leading-relaxed italic drop-cap ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                {PERSONAL_INFO.bio.split('\n\n')[0]}
              </p>
            </div>
            <div className="space-y-10">
              <p className={`text-base leading-loose ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {PERSONAL_INFO.bio.split('\n\n')[1] || PERSONAL_INFO.bio}
              </p>
              <div className="flex flex-wrap gap-4 pt-6">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    className="p-4 border border-black/10 dark:border-white/10 rounded-none hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all hover:-translate-y-1 shadow-sm"
                    title={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 relative flex flex-col items-center">
          <div className="sticky top-40 group w-full max-w-md mx-auto">
            {/* Creative Photo Display with No Background */}
            <div className="relative">
              {/* Decorative Background Elements */}
              <div className="absolute inset-0 -z-10">
                {/* Newspaper texture overlay */}
                <div className="absolute top-10 left-10 w-64 h-64 border-2 border-black/10 dark:border-white/10 rotate-6 group-hover:rotate-12 transition-all duration-1000"></div>
                <div className="absolute bottom-10 right-10 w-48 h-48 border-2 border-black/10 dark:border-white/10 -rotate-12 group-hover:-rotate-6 transition-all duration-1000"></div>
                {/* Dot pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <div className="grid grid-cols-4 gap-2">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-black dark:bg-white rounded-full"></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Photo Container with No Background */}
              <div className="relative z-10 transform group-hover:scale-105 transition-all duration-700">
                {/* Photo with transparent background */}
                <div className="relative">
                  <img
                    src="/profile-basquiat.png"
                    alt={PERSONAL_INFO.name}
                    className="w-full h-auto object-contain drop-shadow-2xl transition-all duration-1000 group-hover:scale-110"
                  />

                  {/* Floating name tag */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-black dark:bg-white text-white dark:text-black px-8 py-4 shadow-2xl group-hover:translate-y-0 transition-all duration-500">
                    <p className="text-sm font-black uppercase tracking-[0.3em] whitespace-nowrap">
                      {PERSONAL_INFO.name.split(' ')[0]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Badge - Newspaper Stamp Style */}
              <div className="absolute -top-6 -right-6 w-28 h-28 border-4 border-black dark:border-white rounded-full flex items-center justify-center rotate-12 group-hover:rotate-[180deg] transition-transform duration-1000 z-20 bg-white dark:bg-black shadow-2xl">
                <div className="text-center">
                  <BadgeCheck className="w-10 h-10 mx-auto mb-1" />
                  <p className="text-[7px] font-black uppercase tracking-tighter leading-tight">
                    Digital<br />Architect<br />2024
                  </p>
                </div>
              </div>

              {/* Decorative Quote Marks */}
              <div className="absolute -top-4 -left-4 text-6xl font-black opacity-10 serif">"</div>
              <div className="absolute -bottom-4 -right-4 text-6xl font-black opacity-10 serif rotate-180">"</div>

              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-black dark:border-white opacity-30"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-black dark:border-white opacity-30"></div>
            </div>

            {/* Photo Credit & Quote */}
            <div className="mt-16 space-y-4 text-center">
              <div className="h-px w-24 bg-black dark:bg-white mx-auto opacity-20"></div>
              <p className="text-[8px] font-black uppercase tracking-[0.5em] opacity-30">Featured Portrait</p>
              <p className="text-sm serif italic opacity-60 max-w-xs mx-auto leading-relaxed">
                "Engineering dreams into high-fidelity digital reality."
              </p>
              <div className="flex items-center justify-center gap-2 opacity-40">
                <Sparkles className="w-3 h-3" />
                <span className="text-[8px] font-black uppercase tracking-widest">Verified Gazette 2024</span>
                <Sparkles className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Editorial Body */}
      <main className="max-w-6xl mx-auto px-6 space-y-48 md:space-y-64 pb-64 pt-40">

        {/* Section: The Chronicle */}
        <section id="story" className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
          <div className="md:col-span-4 space-y-12">
            <SectionHeader title="The Life Chronicle" />
            <div className={`p-8 md:p-10 border-l-[8px] border-black dark:border-white ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'} shadow-sm serif italic text-2xl md:text-4xl leading-snug tracking-tight relative`}>
              <Quote className="absolute -top-6 -left-6 w-12 h-12 opacity-10" />
              "Imagination is the blueprint; technical rigor is the mortar. Everything starts with a single dream."
            </div>
            <div className="flex items-center gap-4 opacity-30">
              <BadgeCheck className="w-6 h-6" />
              <span className="text-[9px] font-black uppercase tracking-widest">Bureau Identity Verified</span>
            </div>
          </div>
          <div className="md:col-span-8 md:pl-24 relative">
            <div className="absolute left-0 top-0 bottom-0 hairline-y hidden md:block"></div>
            <TimelineItem
              year="The Foundation"
              title="A Silicon Awakening"
              description="A formative curiosity in Asela led to a life-long mission of problem-solving through software engineering, sparked by a gift of a first computer."
            />
            <TimelineItem
              year="The Academic Era"
              title="Technical Excellence"
              description="Mastering the technical arts at Jimma University, building the foundation for what would become a career in digital architecture."
            />
            <TimelineItem
              year="The Zenith"
              title="Ndoto IT Solutions"
              description="Launching an independent bureau dedicated to creating high-fidelity digital experiences and societal impact projects like the 'Notify' parent-bridge."
              isLast
            />
          </div>
        </section>

        {/* Section: AI Press Desk */}
        <section id="inquiry" className="py-24 md:py-48 bg-newspaper border-y-8 border-black dark:border-white relative overflow-hidden shadow-inner px-4 md:px-0">
          <div className="max-w-4xl mx-auto space-y-20 relative z-10">
            <div className="text-center space-y-8">
              <div className="flex items-center justify-center gap-4 mb-2">
                <Radio className="w-5 h-5 text-red-500 animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-[0.8em] text-gray-400">Bureau Secretary: Live Grounding</span>
              </div>
              <h2 className="text-6xl md:text-9xl font-black serif uppercase italic leading-none">The Press Inquiry Desk</h2>
              <p className={`text-xl md:text-3xl serif ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} italic max-w-2xl mx-auto leading-relaxed`}>
                "Official communiqués regarding Yishak's ventures are dispatched instantly via our AI Editorial Assistant."
              </p>
            </div>

            <form onSubmit={handleAiInquiry} className="relative group max-w-3xl mx-auto mt-20">
              <input
                type="text"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder="Submit inquiry about Doto IT or Notify..."
                className={`w-full py-10 md:py-16 px-6 md:px-12 rounded-none border-b-4 outline-none transition-all text-2xl md:text-4xl serif italic placeholder:opacity-20 ${isDarkMode ? 'bg-transparent border-white/20 focus:border-white' : 'bg-transparent border-black/30 focus:border-black'}`}
              />
              <button
                type="submit"
                disabled={isAiLoading}
                className={`absolute right-0 md:right-4 bottom-8 md:bottom-12 p-4 md:p-6 hover:scale-125 transition-transform disabled:opacity-50`}
              >
                {isAiLoading ? <Loader2 className="w-10 h-10 md:w-16 md:h-16 animate-spin" /> : <Send className="w-10 h-10 md:w-16 md:h-16" />}
              </button>
            </form>

            {aiResponse && (
              <div className={`p-10 md:p-20 border-2 rounded-none ${isDarkMode ? 'bg-black/90 border-white/10' : 'bg-white border-black/10'} shadow-2xl space-y-16 animate-in fade-in slide-in-from-bottom-12 duration-1000`}>
                <div className="flex items-center justify-between opacity-50">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
                    <span className="text-[11px] font-black uppercase tracking-[0.4em]">Official Response Dispatched</span>
                  </div>
                  <span className="text-[10px] font-black uppercase">{new Date().toLocaleTimeString()}</span>
                </div>
                <div className="relative">
                  <p className="text-3xl md:text-5xl serif leading-relaxed italic border-l-[16px] border-black/20 dark:border-white/20 pl-8 md:pl-16">
                    {aiResponse}
                  </p>
                </div>

                {groundingLinks.length > 0 && (
                  <div className="pt-16 border-t border-black/10 dark:border-white/10">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40 mb-10 flex items-center gap-3">
                      <Globe className="w-4 h-4" /> Verified Editorial Citations
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {groundingLinks.map((link, idx) => (
                        <a key={idx} href={link.uri} target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-4 p-8 border border-black/5 dark:border-white/5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shadow-md">
                          <div className="flex justify-between items-center">
                            <FileText className="w-6 h-6 opacity-30 group-hover:opacity-100 transition-opacity" />
                            <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                          </div>
                          <p className="text-sm font-black uppercase tracking-tight group-hover:underline leading-tight">{link.title}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Section: Feature Archives */}
        <section id="creativity" className="space-y-32">
          <div className="text-center space-y-8">
            <h2 className="text-7xl md:text-[14rem] font-black serif uppercase leading-none italic tracking-tighter">Feature Archives</h2>
            <div className="h-2 w-32 md:w-64 bg-black dark:bg-white mx-auto"></div>
            <p className="text-xs font-black uppercase tracking-[0.8em] opacity-40 italic">Catalogued Digital Ventures</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 overflow-hidden shadow-2xl">
            {PROJECTS.map((project) => (
              <div key={project.id} className={`group p-12 md:p-20 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-[#fafafa]'} hover:bg-white dark:hover:bg-black transition-all duration-700 min-h-[500px] md:h-[650px] flex flex-col justify-between relative`}>
                <div className="space-y-10 md:space-y-16">
                  <div className="p-4 md:p-8 border border-black/10 dark:border-white/10 inline-block grayscale group-hover:grayscale-0 transition-all bg-white dark:bg-black shadow-sm group-hover:rotate-12 duration-500">
                    {project.icon}
                  </div>
                  <h3 className="text-4xl md:text-6xl font-black serif leading-tight uppercase group-hover:italic transition-all tracking-tighter">{project.title}</h3>
                  <p className={`text-xl md:text-2xl leading-relaxed opacity-70 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} serif`}>{project.description}</p>
                </div>
                <div className="pt-12 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">Full Dispatch</span>
                  <ExternalLink className="w-10 h-10 opacity-20 group-hover:opacity-100 transition-all" />
                </div>
                <div className="absolute top-12 right-12 text-[12rem] font-black opacity-[0.02] serif italic pointer-events-none group-hover:opacity-10 transition-opacity">
                  0{project.id}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: BizWach Demo */}
        <section id="bizwach" className="space-y-32">
          <div className="text-center space-y-8">
            <h2 className="text-6xl md:text-[10rem] font-black serif uppercase leading-none italic tracking-tighter">BizWach Tool</h2>
            <div className="h-2 w-32 md:w-64 bg-black dark:bg-white mx-auto"></div>
            <p className="text-xs font-black uppercase tracking-[0.8em] opacity-40 italic">Global Opportunity Scanner</p>
          </div>

          <div className="max-w-5xl mx-auto px-4">
            <AICrawlerDemo />
          </div>
        </section>

        {/* Section: Certifications & Credentials */}
        <section id="certifications" className="space-y-32">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center gap-4 mb-2">
              <Award className="w-6 h-6 opacity-40" />
              <span className="text-[11px] font-black uppercase tracking-[0.8em] text-gray-400">Professional Credentials</span>
            </div>
            <h2 className="text-7xl md:text-[14rem] font-black serif uppercase leading-none italic tracking-tighter">Certifications</h2>
            <div className="h-2 w-32 md:w-64 bg-black dark:bg-white mx-auto"></div>
            <p className="text-xs font-black uppercase tracking-[0.8em] opacity-40 italic">Verified Credentials Bureau</p>
          </div>


          <div className="max-w-6xl mx-auto">
            {/* Certificates Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

              {/* Certificate 1: Foundations of Cybersecurity */}
              <a
                href="https://coursera.org/share/51e6fd3856298781ab08a70836009dd4"
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className={`relative overflow-hidden border-4 border-black dark:border-white ${isDarkMode ? 'bg-white' : 'bg-white'} shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 h-full flex flex-col`}>
                  {/* Certificate Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src="/google-cert-foundations.png"
                      alt="Google Cybersecurity Certificate - Foundations of Cybersecurity"
                      className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-700 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 text-white bg-black/80 px-6 py-3 rounded-none">
                        <p className="text-xs font-black uppercase tracking-[0.3em] flex items-center gap-2">
                          <ExternalLink className="w-4 h-4" />
                          View Certificate
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Certificate Details */}
                  <div className="p-6 md:p-8 border-t-4 border-black dark:border-white bg-gray-50 dark:bg-gray-900 flex-1 flex flex-col">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-black dark:bg-white">
                          <Award className="w-6 h-6 text-white dark:text-black" />
                        </div>
                        <div>
                          <h3 className="text-xl md:text-2xl font-black serif uppercase italic leading-tight text-black dark:text-white">
                            Google Cybersecurity
                          </h3>
                          <p className="text-xs font-bold uppercase tracking-wide text-gray-600 dark:text-gray-400 mt-1">
                            Foundations of Cybersecurity
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-3 border-t border-black/10 dark:border-white/10">
                        <div>
                          <p className="text-[8px] font-black uppercase tracking-[0.4em] opacity-40 mb-1">Issued By</p>
                          <p className="text-sm font-bold text-black dark:text-white">Google via Coursera</p>
                        </div>
                        <div>
                          <p className="text-[8px] font-black uppercase tracking-[0.4em] opacity-40 mb-1">Date</p>
                          <p className="text-sm font-bold text-black dark:text-white">Dec 4, 2025</p>
                        </div>
                      </div>
                    </div>

                    {/* View Certificate Link */}
                    <div className="mt-4 pt-4 border-t border-black/10 dark:border-white/10">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 text-black dark:text-white">
                          View Credential
                        </p>
                        <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-black dark:text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              {/* Certificate 2: Play It Safe */}
              <a
                href="https://coursera.org/share/97a726c94fab427e6aa068fe576e989b"
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className={`relative overflow-hidden border-4 border-black dark:border-white ${isDarkMode ? 'bg-white' : 'bg-white'} shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 h-full flex flex-col`}>
                  {/* Certificate Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src="/google-cert.png"
                      alt="Google Cybersecurity Certificate - Play It Safe: Manage Security Risks"
                      className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-700 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 text-white bg-black/80 px-6 py-3 rounded-none">
                        <p className="text-xs font-black uppercase tracking-[0.3em] flex items-center gap-2">
                          <ExternalLink className="w-4 h-4" />
                          View Certificate
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Certificate Details */}
                  <div className="p-6 md:p-8 border-t-4 border-black dark:border-white bg-gray-50 dark:bg-gray-900 flex-1 flex flex-col">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-black dark:bg-white">
                          <Award className="w-6 h-6 text-white dark:text-black" />
                        </div>
                        <div>
                          <h3 className="text-xl md:text-2xl font-black serif uppercase italic leading-tight text-black dark:text-white">
                            Google Cybersecurity
                          </h3>
                          <p className="text-xs font-bold uppercase tracking-wide text-gray-600 dark:text-gray-400 mt-1">
                            Play It Safe: Manage Security Risks
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-3 border-t border-black/10 dark:border-white/10">
                        <div>
                          <p className="text-[8px] font-black uppercase tracking-[0.4em] opacity-40 mb-1">Issued By</p>
                          <p className="text-sm font-bold text-black dark:text-white">Google via Coursera</p>
                        </div>
                        <div>
                          <p className="text-[8px] font-black uppercase tracking-[0.4em] opacity-40 mb-1">Date</p>
                          <p className="text-sm font-bold text-black dark:text-white">Dec 29, 2025</p>
                        </div>
                      </div>
                    </div>

                    {/* View Certificate Link */}
                    <div className="mt-4 pt-4 border-t border-black/10 dark:border-white/10">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 text-black dark:text-white">
                          View Credential
                        </p>
                        <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-black dark:text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </a>

            </div>
          </div>
        </section>


        {/* Section: Partners */}
        <section id="partners" className="space-y-32">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center gap-4 mb-2">
              <Globe className="w-6 h-6 opacity-40" />
              <span className="text-[11px] font-black uppercase tracking-[0.8em] text-gray-400">Strategic Collaborations</span>
            </div>
            <h2 className="text-7xl md:text-[14rem] font-black serif uppercase leading-none italic tracking-tighter">Partners</h2>
            <div className="h-2 w-32 md:w-64 bg-black dark:bg-white mx-auto"></div>
            <p className="text-xs font-black uppercase tracking-[0.8em] opacity-40 italic">Trusted Organizations Bureau</p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Partners Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12">

              {/* Partner 1: UNDP */}
              <div className="group flex items-center justify-center p-8 border-2 border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white transition-all duration-500 hover:-translate-y-2 bg-white dark:bg-black shadow-lg hover:shadow-2xl">
                <img
                  src="/partner-undp.png"
                  alt="UNDP - United Nations Development Programme"
                  className="w-full h-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Partner 2: Innovative Finance Lab */}
              <div className="group flex items-center justify-center p-8 border-2 border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white transition-all duration-500 hover:-translate-y-2 bg-white dark:bg-black shadow-lg hover:shadow-2xl">
                <img
                  src="/partner-ifl.png"
                  alt="Innovative Finance Lab"
                  className="w-full h-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Partner 3: Ministry of Labor and Skills */}
              <div className="group flex items-center justify-center p-8 border-2 border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white transition-all duration-500 hover:-translate-y-2 bg-white dark:bg-black shadow-lg hover:shadow-2xl">
                <img
                  src="/partner-ministry.png"
                  alt="Ministry of Labor and Skills"
                  className="w-full h-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Partner 4: MInT */}
              <div className="group flex items-center justify-center p-8 border-2 border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white transition-all duration-500 hover:-translate-y-2 bg-white dark:bg-black shadow-lg hover:shadow-2xl">
                <img
                  src="/partner-mint.png"
                  alt="MInT - Ministry of Innovation and Technology"
                  className="w-full h-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Partner 5: JICA */}
              <div className="group flex items-center justify-center p-8 border-2 border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white transition-all duration-500 hover:-translate-y-2 bg-white dark:bg-black shadow-lg hover:shadow-2xl">
                <img
                  src="/partner-jica.png"
                  alt="JICA - Japan International Cooperation Agency"
                  className="w-full h-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>

            </div>

            {/* Partnership Statement */}
            <div className={`mt-24 p-12 md:p-16 border-l-[8px] border-black dark:border-white ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'} shadow-sm`}>
              <p className="text-2xl md:text-4xl serif italic leading-relaxed text-center">
                "Collaborating with leading organizations to drive digital transformation and innovation across Ethiopia's technology landscape."
              </p>
            </div>
          </div>
        </section>

        {/* Section: Letter to the Editor */}
        <section id="letter" className="pt-32 md:pt-64 border-t-[6px] border-black dark:border-white space-y-32">
          <div className="text-center space-y-8">
            <h2 className="text-7xl md:text-[14rem] font-black serif uppercase leading-none italic tracking-tighter">Letter to the Editor</h2>
            <div className="h-2 w-32 md:w-64 bg-black dark:bg-white mx-auto"></div>
            <p className="text-xs font-black uppercase tracking-[0.8em] opacity-40 italic">Correspondence Bureau</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
            <div className="space-y-12">
              <div className={`p-12 md:p-16 border-l-[8px] border-black dark:border-white ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'} shadow-sm`}>
                <p className="text-2xl md:text-4xl serif italic leading-relaxed">
                  "For press inquiries, collaboration proposals, or general correspondence, the editorial bureau welcomes your dispatch."
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="p-4 border border-black/10 dark:border-white/10 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-2">Electronic Mail</p>
                    <a href="mailto:yishak@dotoit.com" className="text-xl md:text-2xl font-bold hover:underline">yishak@dotoit.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="p-4 border border-black/10 dark:border-white/10 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-2">Telegraph Wire</p>
                    <a href="tel:+251911234567" className="text-xl md:text-2xl font-bold hover:underline">+251 911 234 567</a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="p-4 border border-black/10 dark:border-white/10 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-2">Bureau Address</p>
                    <p className="text-xl md:text-2xl font-bold">Addis Ababa, Ethiopia</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-12 md:p-16 ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'} border border-black/10 dark:border-white/10 shadow-xl`}>
              <form className="space-y-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Your Name</label>
                  <input
                    type="text"
                    className={`w-full py-6 px-8 border-b-2 outline-none transition-all text-xl serif ${isDarkMode ? 'bg-transparent border-white/20 focus:border-white' : 'bg-transparent border-black/30 focus:border-black'}`}
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Email Address</label>
                  <input
                    type="email"
                    className={`w-full py-6 px-8 border-b-2 outline-none transition-all text-xl serif ${isDarkMode ? 'bg-transparent border-white/20 focus:border-white' : 'bg-transparent border-black/30 focus:border-black'}`}
                    placeholder="you@example.com"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Your Message</label>
                  <textarea
                    rows={6}
                    className={`w-full py-6 px-8 border-b-2 outline-none transition-all text-xl serif resize-none ${isDarkMode ? 'bg-transparent border-white/20 focus:border-white' : 'bg-transparent border-black/30 focus:border-black'}`}
                    placeholder="Write your message here..."
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-8 px-12 font-black uppercase tracking-[0.3em] text-sm transition-all ${isDarkMode ? 'bg-white text-black hover:bg-black hover:text-white border-2 border-white' : 'bg-black text-white hover:bg-white hover:text-black border-2 border-black'}`}
                >
                  Submit Dispatch
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`border-t-[10px] border-double border-black dark:border-white py-32 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 mb-24">
            <div className="space-y-8">
              <h3 className="text-5xl md:text-7xl font-black serif uppercase italic leading-none">The Gazette</h3>
              <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                A digital chronicle of innovation, creativity, and impact in Ethiopia's technology landscape.
              </p>
            </div>

            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Quick Links</h4>
              <div className="space-y-4">
                {[
                  { label: 'The Chronicle', id: 'story' },
                  { label: 'Archives', id: 'creativity' },
                  { label: 'Press Desk', id: 'inquiry' },
                  { label: 'Global Correspondences', id: 'impact' },
                  { label: 'Letter to Editor', id: 'letter' }
                ].map((item) => (
                  <a
                    key={item.label}
                    href={`#${item.id}`}
                    className="block text-lg font-bold hover:opacity-50 transition-opacity"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Connect</h4>
              <div className="flex flex-wrap gap-4">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    className="p-4 border border-black/10 dark:border-white/10 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                    title={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-16 border-t border-black/10 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-sm opacity-40">© 2024 The Yishak Gazette. All dispatches reserved.</p>
            <div className="flex items-center gap-4">
              <Clock className="w-4 h-4 opacity-40" />
              <p className="text-xs font-black uppercase tracking-[0.3em] opacity-40">
                {today}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;