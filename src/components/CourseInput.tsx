import React, { useState } from 'react';
import { Search, BookOpen, ArrowRight, MessageSquare, Clock, Brain, Target, ArrowLeft } from 'lucide-react';

interface CourseInputProps {
  onCourseSubmit: (course: string) => void;
  onBackToHome?: () => void;
}

const CourseInput: React.FC<CourseInputProps> = ({ onCourseSubmit, onBackToHome }) => {
  const [course, setCourse] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const popularCourses = [
    'Computer Science',
    'Mass Communication',
    'Mechanical Engineering',
    'Electrical Engineering',
    'Business Administration',
    'Economics',
    'Accounting',
    'Medicine',
    'Law',
    'Agriculture',
    'Civil Engineering',
    'Biochemistry',
    'Psychology',
    'Marketing',
    'Banking and Finance',
    'International Relations',
    'English Language',
    'Mathematics',
    'Physics',
    'Chemistry'
  ];

  const handleInputChange = (value: string) => {
    setCourse(value);
    if (value.length > 0) {
      const filtered = popularCourses.filter(c => 
        c.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleAssessmentSelect = () => {
    if (course.trim()) {
      onCourseSubmit(course.trim());
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCourse(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-blue-50 relative overflow-hidden">
      {/* Background decorations - reduced for better performance */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-emerald-300 rounded-3xl transform rotate-45 animate-pulse opacity-40"></div>
        <div className="absolute bottom-32 right-20 w-24 h-24 bg-gradient-to-r from-indigo-300 to-purple-300 rounded-full animate-bounce opacity-50"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 border-2 border-rose-300 rounded-xl transform -rotate-12 opacity-40"></div>
        <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-gradient-to-r from-amber-200 to-orange-200 rounded-2xl transform rotate-12 opacity-30"></div>
        <div className="absolute bottom-1/4 left-1/3 w-14 h-14 border-2 border-cyan-300 rounded-full opacity-40"></div>
        <div className="absolute top-1/2 right-10 w-40 h-40 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-2xl opacity-30"></div>
        <div className="absolute bottom-20 left-20 w-36 h-36 bg-gradient-to-r from-green-200 to-emerald-200 rounded-full blur-2xl opacity-25"></div>
      </div>

      <div className="relative py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
        {/* Navigation Header */}
        {onBackToHome && (
          <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
            <div className="flex items-center justify-between p-4 sm:p-6 bg-white/90 backdrop-blur-lg rounded-3xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
              <button
                onClick={onBackToHome}
                className="group flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-3 sm:py-4 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all duration-300 font-bold hover:scale-105 transform"
                aria-label="Go back to home page"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Home</span>
              </button>
              <div className="flex items-center space-x-3 text-sm text-slate-600 bg-gradient-to-r from-emerald-50 to-cyan-50 px-4 py-3 rounded-2xl border border-emerald-200 shadow-lg">
                <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse"></div>
                <span className="font-bold">Step 1 of 3</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          {/* Header section */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="relative inline-block mb-8">
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-3xl flex items-center justify-center mx-auto transform rotate-12 hover:rotate-0 transition-all duration-700 shadow-2xl hover:scale-110">
                <BookOpen className="h-12 w-12 sm:h-14 sm:w-14 text-white" />
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full animate-pulse shadow-lg"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-bounce"></div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-800 mb-6 leading-tight">
              What Course Did You
              <br />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">Study?</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
              Tell us your field of study and let's discover your 
              <span className="text-emerald-600 font-bold"> career potential</span> in Nigeria's job market ✨
            </p>
          </div>

          <div className="space-y-8 sm:space-y-12">
            {/* Course Input */}
            <div className="relative max-w-2xl mx-auto group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-3xl blur-xl opacity-30 group-hover:opacity-40 transition-opacity duration-500"></div>
              
              <div className="relative bg-white/95 backdrop-blur-lg rounded-3xl border-2 border-white/50 p-3 shadow-2xl hover:shadow-2xl transition-all duration-500 group-hover:scale-105 transform">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <Search className="h-6 w-6 sm:h-7 sm:w-7 text-slate-400 group-hover:text-emerald-500 transition-colors duration-300" />
                  </div>
                  <input
                    type="text"
                    value={course}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="e.g., Computer Science, Mass Communication, Engineering..."
                    className="block w-full pl-16 sm:pl-18 pr-6 py-5 sm:py-7 border-0 rounded-2xl focus:ring-4 focus:ring-emerald-500/30 text-xl sm:text-2xl font-semibold text-slate-800 placeholder-slate-400 bg-transparent transition-all duration-300"
                    aria-label="Enter your course of study"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Suggestions dropdown */}
            {suggestions.length > 0 && (
              <div className="bg-white/95 backdrop-blur-lg border border-white/50 rounded-2xl shadow-2xl max-w-2xl mx-auto overflow-hidden">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-6 py-4 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 first:rounded-t-2xl last:rounded-b-2xl border-b border-slate-100/50 last:border-b-0 transition-all duration-300 hover:scale-105 transform font-medium text-slate-700 hover:text-emerald-700"
                    aria-label={`Select ${suggestion} as your course`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
                      <span>{suggestion}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* AI Assessment Section */}
            {course.trim() && (
              <div className="space-y-6 sm:space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">
                    Start Your 
                    <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent"> AI-Powered Assessment</span>
                  </h2>
                  <p className="text-lg sm:text-xl text-slate-600 px-4 font-medium">
                    Have a personalized conversation with AI to deeply understand your skills and career potential ✨
                  </p>
                </div>

                {/* AI Assessment Card */}
                <div className="relative group max-w-3xl mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 rounded-3xl blur-xl opacity-30 group-hover:opacity-40 transition-opacity duration-500"></div>
                  
                  <div className="relative bg-white/95 backdrop-blur-lg rounded-3xl border-2 border-white/50 shadow-2xl overflow-hidden group-hover:scale-105 transform transition-all duration-500">
                    <div className="p-6 sm:p-10">
                      <div className="flex items-center space-x-4 sm:space-x-6 mb-6 sm:mb-8">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-600 via-blue-600 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-xl">
                          <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">AI Career Assessment</h3>
                          <p className="text-base sm:text-lg text-slate-600 font-medium">Intelligent & Personalized Experience</p>
                        </div>
                      </div>
                    
                      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                        <div className="flex items-center space-x-3 text-sm sm:text-base text-slate-700 bg-purple-50 p-3 rounded-xl">
                          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
                          <span className="font-medium">Conversational AI interaction</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm sm:text-base text-slate-700 bg-blue-50 p-3 rounded-xl">
                          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                          <span className="font-medium">15-25 minutes</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm sm:text-base text-slate-700 bg-emerald-50 p-3 rounded-xl">
                          <Target className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
                          <span className="font-medium">Deep skill exploration</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm sm:text-base text-slate-700 bg-cyan-50 p-3 rounded-xl">
                          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600 flex-shrink-0" />
                          <span className="font-medium">Comprehensive career guidance</span>
                        </div>
                      </div>

                      <div className="space-y-4 mb-6 sm:mb-8">
                        <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-emerald-50 rounded-2xl p-4 sm:p-6 border border-purple-200">
                          <h4 className="font-bold text-purple-900 mb-3 text-base sm:text-lg flex items-center">
                            <span className="text-2xl mr-2">✨</span>
                            What You'll Get:
                          </h4>
                          <ul className="space-y-2 text-sm sm:text-base text-purple-800">
                            <li className="flex items-start space-x-2">
                              <span className="text-purple-600 font-bold">🎯</span>
                              <span>AI-generated skill analysis based on your unique responses</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <span className="text-blue-600 font-bold">📋</span>
                              <span>Personalized development plan created from your conversation</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <span className="text-emerald-600 font-bold">🇳🇬</span>
                              <span>Nigerian job market-focused recommendations</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <span className="text-orange-600 font-bold">💼</span>
                              <span>Custom project ideas tailored to your experience level</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <span className="text-pink-600 font-bold">📚</span>
                              <span>AI-curated learning resources matching your specific needs</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-4 sm:p-6 border border-blue-200">
                          <div className="flex items-center space-x-3 mb-3">
                            <Brain className="w-5 h-5 text-blue-600" />
                            <h4 className="font-bold text-blue-900 text-base sm:text-lg">100% Personalized by AI</h4>
                          </div>
                          <p className="text-sm sm:text-base text-blue-800 leading-relaxed">
                            Unlike generic questionnaires, our AI analyzes your actual conversation to create recommendations 
                            specifically for <strong className="text-blue-900">your</strong> situation, goals, and background in <strong className="text-emerald-700">{course}</strong>.
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={handleAssessmentSelect}
                        className="w-full px-6 sm:px-8 py-4 sm:py-6 bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 text-white rounded-2xl hover:from-purple-700 hover:via-blue-700 hover:to-emerald-700 flex items-center justify-center space-x-3 sm:space-x-4 font-bold text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl group"
                        aria-label="Start AI-powered career assessment"
                      >
                        <Brain className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-pulse" />
                        <span>Start AI Assessment</span>
                        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Why AI Assessment */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-400 to-blue-400 rounded-2xl blur-xl opacity-30"></div>
                  <div className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 rounded-2xl p-6 sm:p-8 text-white shadow-2xl">
                    <div className="flex items-start space-x-4">
                      <Brain className="w-6 h-6 sm:w-8 sm:h-8 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold mb-3 text-lg sm:text-xl flex items-center">
                          🤖 Why Choose AI Assessment?
                        </h4>
                        <p className="text-sm sm:text-base opacity-95 mb-4 leading-relaxed">
                          Our AI conducts intelligent conversations to understand your unique situation, experiences, and aspirations. 
                          Every recommendation is generated specifically from YOUR responses - not generic templates.
                        </p>
                        <p className="text-sm sm:text-base opacity-95 leading-relaxed">
                          <strong className="text-yellow-200">Your assessment results will be 100% personalized</strong> to your background as a 
                          <strong className="text-emerald-200"> {course}</strong> graduate in Nigeria, based on what you actually tell our AI.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Popular Courses */}
            {!course.trim() && (
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-emerald-200 rounded-2xl blur-xl opacity-20"></div>
                <div className="relative bg-white/95 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/50">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6 flex items-center">
                    <span className="text-2xl mr-3">🎯</span>
                    Popular Courses
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                    {popularCourses.slice(0, 12).map((popularCourse) => (
                      <button
                        key={popularCourse}
                        onClick={() => setCourse(popularCourse)}
                        className="group text-left p-3 sm:p-4 bg-gradient-to-r from-slate-50 to-blue-50 hover:from-emerald-50 hover:to-teal-50 hover:text-emerald-700 rounded-xl text-sm sm:text-base font-medium transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl border border-slate-200 hover:border-emerald-300"
                        aria-label={`Select ${popularCourse} as your course`}
                      >
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full group-hover:animate-pulse"></div>
                          <span>{popularCourse}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInput;