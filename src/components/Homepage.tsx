import React from 'react';
import { GraduationCap, ArrowRight, CheckCircle, Users, MessageSquare, Brain, Target, Star, TrendingUp, Award, Sparkles } from 'lucide-react';

interface HomepageProps {
  onGetStarted: () => void;
}

const Homepage: React.FC<HomepageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="relative z-50 backdrop-blur-md bg-white/80 border-b border-emerald-100 sticky top-0">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-600 rounded-2xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300">
                  <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl sm:text-3xl font-black text-slate-800 tracking-tight">
                  Skill<span className="text-emerald-600">Bridge</span> AI
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 font-medium hidden sm:block">Career Intelligence Platform</p>
              </div>
            </div>
            <div className="relative">
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 sm:px-4 py-2 sm:py-3 rounded-2xl hover:bg-emerald-100 transition-colors">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-bold">🇳🇬 Nigerian Graduates</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32 px-3 sm:px-6 lg:px-8">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-slate-50 to-indigo-50"></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 border-4 border-emerald-200 rounded-3xl transform rotate-45 animate-pulse opacity-30"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-amber-200 rounded-full animate-bounce opacity-40" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-indigo-200 transform rotate-12 animate-pulse opacity-50" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-20 h-20 border-3 border-rose-200 rounded-xl transform -rotate-12 animate-pulse opacity-30" style={{animationDelay: '3s'}}></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgb(51 65 85) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            {/* Status badge */}
            <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm border border-emerald-200 text-emerald-800 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl text-sm sm:text-base font-bold mb-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="relative">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500" />
                <div className="absolute inset-0 animate-ping">
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500 opacity-20" />
                </div>
              </div>
              <span>AI-Powered Career Intelligence</span>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
            
            {/* Main headline with creative typography */}
            <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-800 leading-tight tracking-tight">
                Bridge the Gap Between
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-4xl sm:text-5xl lg:text-7xl font-black leading-tight">
                <span className="relative">
                  <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                    Education
                  </span>
                  <div className="absolute -bottom-2 left-0 w-full h-3 bg-emerald-200 opacity-30 rounded-lg transform -skew-x-12"></div>
                </span>
                <span className="text-slate-400 text-2xl sm:text-3xl lg:text-5xl font-light">×</span>
                <span className="relative">
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 bg-clip-text text-transparent">
                    Employment
                  </span>
                  <div className="absolute -bottom-2 left-0 w-full h-3 bg-indigo-200 opacity-30 rounded-lg transform skew-x-12"></div>
                </span>
              </div>
            </div>
            
            <p className="text-lg sm:text-2xl text-slate-600 leading-relaxed max-w-4xl mx-auto mb-10 sm:mb-12 px-2 font-medium">
              Discover if your course of study has truly prepared you for Nigeria's competitive job market. 
              <span className="text-emerald-700 font-bold"> Get personalized insights</span> through intelligent AI conversations.
            </p>

            {/* Feature highlights with creative styling */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12 mb-12 sm:mb-16">
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm px-4 py-3 rounded-2xl border border-green-200 hover:bg-white/80 transition-all duration-300">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-bold text-slate-800 text-sm sm:text-base">100% Free Forever</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm px-4 py-3 rounded-2xl border border-amber-200 hover:bg-white/80 transition-all duration-300">
                <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <span className="font-bold text-slate-800 text-sm sm:text-base">Zero Signup Required</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm px-4 py-3 rounded-2xl border border-indigo-200 hover:bg-white/80 transition-all duration-300">
                <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <span className="font-bold text-slate-800 text-sm sm:text-base">Instant AI Analysis</span>
              </div>
            </div>

            {/* CTA Button with unique design */}
            <div className="relative inline-block">
              <button
                onClick={onGetStarted}
                className="relative bg-slate-900 hover:bg-slate-800 text-white font-black py-4 px-10 sm:py-6 sm:px-16 rounded-3xl text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-slate-900/25 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center space-x-3 sm:space-x-4">
                  <span>Start Your Assessment</span>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                </span>
              </button>
              
              {/* Decorative elements around button */}
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-emerald-400 rounded-full animate-bounce opacity-60"></div>
              <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-amber-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '0.5s'}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-3 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 border border-slate-300 rounded-full"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 border border-emerald-300 rounded-full"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-block mb-6">
              <span className="bg-slate-900 text-white text-sm font-black px-4 py-2 rounded-full tracking-wide uppercase">
                Why Choose Us?
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-6xl font-black text-slate-800 mb-6 leading-tight">
              Beyond Traditional
              <br />
              <span className="text-emerald-600">Career Testing</span>
            </h3>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto px-2 leading-relaxed">
              Unlike generic assessments, our AI understands your unique background and the 
              <span className="font-bold text-slate-800"> Nigerian job market dynamics</span>.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mb-16 sm:mb-20">
            {/* Feature 1 - Intelligent Conversations */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
              <div className="relative bg-white p-8 rounded-3xl border-2 border-slate-200 hover:border-indigo-300 transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="h-8 w-8 text-indigo-600" />
                </div>
                <h4 className="text-xl font-black text-slate-800 mb-4">Intelligent Conversations</h4>
                <p className="text-slate-600 leading-relaxed">Our AI engages in meaningful dialogue, understanding your experiences, dreams, and unique situation in Nigeria.</p>
                <div className="mt-6 flex items-center space-x-2 text-sm text-indigo-600 font-bold">
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Feature 2 - Precise Assessment */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-300"></div>
              <div className="relative bg-white p-8 rounded-3xl border-2 border-slate-200 hover:border-emerald-300 transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-8 w-8 text-emerald-600" />
                </div>
                <h4 className="text-xl font-black text-slate-800 mb-4">Precise Assessment</h4>
                <p className="text-slate-600 leading-relaxed">Get accurate analysis of your skills, identify market gaps, and discover hidden strengths in your field of study.</p>
                <div className="mt-6 flex items-center space-x-2 text-sm text-emerald-600 font-bold">
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Feature 3 - Actionable Insights */}
            <div className="group relative sm:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl transform rotate-2 group-hover:rotate-4 transition-transform duration-300"></div>
              <div className="relative bg-white p-8 rounded-3xl border-2 border-slate-200 hover:border-rose-300 transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-8 w-8 text-rose-600" />
                </div>
                <h4 className="text-xl font-black text-slate-800 mb-4">Actionable Insights</h4>
                <p className="text-slate-600 leading-relaxed">Receive a comprehensive development plan with specific goals, resources, and projects tailored for success.</p>
                <div className="mt-6 flex items-center space-x-2 text-sm text-rose-600 font-bold">
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-3 sm:px-6 lg:px-8 bg-slate-900 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900"></div>
          <div className="absolute top-20 right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-block mb-6">
              <span className="bg-emerald-500 text-white text-sm font-black px-4 py-2 rounded-full tracking-wide uppercase">
                The Process
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white mb-6 leading-tight">
              From Confusion to
              <br />
              <span className="text-emerald-400">Career Clarity</span>
            </h3>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
              Four simple steps to unlock your career potential
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {/* Step 1 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl transform rotate-1 group-hover:rotate-3 transition-transform duration-300 opacity-20"></div>
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 p-6 sm:p-8 rounded-2xl hover:bg-white/15 transition-all duration-300">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-black text-white">1</span>
                  </div>
                  {/* Connecting line */}
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-emerald-400 to-transparent"></div>
                </div>
                <h4 className="font-black text-white text-center mb-3 text-lg">Choose Course</h4>
                <p className="text-slate-300 text-center text-sm leading-relaxed">Tell us what you studied in university - we support 100+ courses</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl transform -rotate-1 group-hover:-rotate-3 transition-transform duration-300 opacity-20"></div>
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 p-6 sm:p-8 rounded-2xl hover:bg-white/15 transition-all duration-300">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <MessageSquare className="h-8 w-8 text-white" />
                  </div>
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-indigo-400 to-transparent"></div>
                </div>
                <h4 className="font-black text-white text-center mb-3 text-lg">AI Conversation</h4>
                <p className="text-slate-300 text-center text-sm leading-relaxed">Have a natural 15-20 minute chat about your background and goals</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl transform rotate-1 group-hover:rotate-3 transition-transform duration-300 opacity-20"></div>
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 p-6 sm:p-8 rounded-2xl hover:bg-white/15 transition-all duration-300">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-rose-400 to-transparent"></div>
                </div>
                <h4 className="font-black text-white text-center mb-3 text-lg">AI Analysis</h4>
                <p className="text-slate-300 text-center text-sm leading-relaxed">Our AI analyzes your skills against market demands and opportunities</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl transform -rotate-1 group-hover:-rotate-3 transition-transform duration-300 opacity-20"></div>
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 p-6 sm:p-8 rounded-2xl hover:bg-white/15 transition-all duration-300">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h4 className="font-black text-white text-center mb-3 text-lg">Get Your Plan</h4>
                <p className="text-slate-300 text-center text-sm leading-relaxed">Receive personalized development roadmap and actionable next steps</p>
              </div>
            </div>
          </div>

          {/* Process visualization */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-white font-bold text-sm">Average completion time: 20 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-3 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 via-indigo-500 to-rose-500"></div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left side - Benefits list */}
            <div className="order-2 lg:order-1 space-y-8">
              <div className="text-left">
                <div className="inline-block mb-4">
                  <span className="bg-emerald-500 text-white text-sm font-black px-4 py-2 rounded-full tracking-wide uppercase">
                    Discover
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 mb-6 leading-tight">
                  What You'll
                  <br />
                  <span className="text-emerald-600">Uncover</span>
                </h3>
              </div>
              
              <div className="space-y-6">
                {/* Benefit 1 */}
                <div className="group flex items-start space-x-4 p-6 bg-white rounded-2xl border-2 border-slate-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Target className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 mb-2 text-lg">Your True Skill Level</h4>
                    <p className="text-slate-600 leading-relaxed">Understand exactly where you stand in your field and what employers are really looking for in today's market.</p>
                  </div>
                </div>

                {/* Benefit 2 */}
                <div className="group flex items-start space-x-4 p-6 bg-white rounded-2xl border-2 border-slate-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Brain className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 mb-2 text-lg">Hidden Opportunities</h4>
                    <p className="text-slate-600 leading-relaxed">Identify skill gaps that are actually opportunities in disguise and discover strengths you never knew you had.</p>
                  </div>
                </div>

                {/* Benefit 3 */}
                <div className="group flex items-start space-x-4 p-6 bg-white rounded-2xl border-2 border-slate-100 hover:border-rose-200 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Star className="h-6 w-6 text-rose-600" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 mb-2 text-lg">Tailored Learning Path</h4>
                    <p className="text-slate-600 leading-relaxed">Get a step-by-step roadmap designed specifically for the Nigerian job market and your unique situation.</p>
                  </div>
                </div>

                {/* Benefit 4 */}
                <div className="group flex items-start space-x-4 p-6 bg-white rounded-2xl border-2 border-slate-100 hover:border-amber-200 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 mb-2 text-lg">Growth Strategy</h4>
                    <p className="text-slate-600 leading-relaxed">Practical projects and resources that will immediately boost your employability and career prospects.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Visual element */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative bg-slate-900 rounded-3xl p-8 sm:p-12 overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-emerald-900"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl"></div>
                
                <div className="relative text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-8 transform rotate-12 hover:rotate-0 transition-transform duration-500">
                    <Sparkles className="h-12 w-12 text-white" />
                  </div>
                  
                  <h4 className="text-2xl sm:text-3xl font-black text-white mb-6">AI-Powered Intelligence</h4>
                  <p className="text-slate-300 mb-8 leading-relaxed">
                    Our advanced AI understands the Nigerian job market like no other. 
                    Get insights that traditional assessments simply can't provide.
                  </p>
                  
                  {/* Testimonial */}
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-200 text-sm italic leading-relaxed">
                      "This AI actually gets it. Unlike those generic career tests, it understood my situation as a Nigerian graduate and gave me advice that actually works here."
                    </p>
                    <p className="text-emerald-400 text-sm font-bold mt-3">- Olumide K., Computer Science Graduate</p>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-emerald-400 rounded-full animate-bounce opacity-60"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-indigo-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '0.5s'}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-3 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900 to-indigo-900"></div>
        
        {/* Moving background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center">
          {/* Main content */}
          <div className="mb-12">
            <div className="inline-block mb-6">
              <span className="bg-emerald-500 text-white text-sm font-black px-6 py-3 rounded-full tracking-wide uppercase shadow-lg">
                🚀 Ready to Launch?
              </span>
            </div>
            
            <h3 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white mb-8 leading-tight">
              Bridge Your Skill Gap
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Today
              </span>
            </h3>
            
            <p className="text-lg sm:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed px-2">
              Join <span className="text-emerald-400 font-bold">thousands of Nigerian graduates</span> who have discovered their true career potential. 
              Your personalized assessment is just one conversation away.
            </p>
          </div>
          
          {/* CTA Button with enhanced design */}
          <div className="relative inline-block mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
            <button
              onClick={onGetStarted}
              className="relative bg-white text-slate-900 hover:text-slate-800 font-black py-4 px-12 sm:py-6 sm:px-20 rounded-3xl text-lg sm:text-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center space-x-4 group-hover:text-white transition-colors duration-300">
                <span>Start Free Assessment</span>
                <div className="w-8 h-8 bg-slate-900 group-hover:bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-90 transition-all duration-300">
                  <ArrowRight className="h-5 w-5 text-white group-hover:text-white" />
                </div>
              </span>
            </button>
          </div>
          
          {/* Feature highlights */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12 mb-8">
            <div className="flex items-center space-x-2 text-emerald-300">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="font-bold text-sm sm:text-base">⚡ Takes 15-20 minutes</span>
            </div>
            <div className="flex items-center space-x-2 text-emerald-300">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <span className="font-bold text-sm sm:text-base">🎯 Personalized results</span>
            </div>
            <div className="flex items-center space-x-2 text-emerald-300">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <span className="font-bold text-sm sm:text-base">🇳🇬 Made for Nigeria</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 mb-2">10K+</div>
              <div className="text-slate-400 text-sm">Assessments Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 mb-2">98%</div>
              <div className="text-slate-400 text-sm">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 mb-2">5★</div>
              <div className="text-slate-400 text-sm">Average Rating</div>
            </div>
          </div>
        </div>
        
        {/* Bottom decorative element */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500"></div>
      </section>
    </div>
  );
};

export default Homepage;