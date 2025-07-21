import React, { useState } from 'react';
import { Search, BookOpen, ArrowRight, MessageSquare, Clock, Brain, Target, Home, ArrowLeft } from 'lucide-react';

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
    <div className="min-h-screen py-8 sm:py-12 px-3 sm:px-6 lg:px-8">
      {/* Navigation Header */}
      {onBackToHome && (
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8">
          <div className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg shadow-sm border">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={onBackToHome}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Back</span>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={onBackToHome}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors text-sm sm:text-base"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <BookOpen className="h-12 w-12 sm:h-16 sm:w-16 text-green-600 mx-auto mb-3 sm:mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            What Course Did You Study?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 px-2">
            Enter your course of study and choose your preferred assessment type
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Course Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={course}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="e.g., Computer Science, Mass Communication, Engineering..."
              className="block w-full pl-8 sm:pl-10 pr-4 py-3 sm:py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base sm:text-lg"
              required
            />
          </div>

          {suggestions.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl border-b border-gray-100 last:border-b-0"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* AI Assessment Start Button */}
          {course.trim() && (
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  Start Your AI-Powered Assessment
                </h3>
                <p className="text-gray-600 text-sm sm:text-base px-2">
                  Have a personalized conversation with AI to deeply understand your skills and career potential
                </p>
              </div>

              {/* AI Chat Assessment Card */}
              <div className="bg-white rounded-xl border-2 border-purple-200 shadow-lg overflow-hidden max-w-2xl mx-auto">
                <div className="p-4 sm:p-8">
                  <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold text-gray-900">AI Career Assessment</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Intelligent & Personalized</p>
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-700">
                      <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 flex-shrink-0" />
                      <span>Conversational AI interaction</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-700">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 flex-shrink-0" />
                      <span>15-25 minutes</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-700">
                      <Target className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 flex-shrink-0" />
                      <span>Deep skill exploration</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-700">
                      <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 flex-shrink-0" />
                      <span>Comprehensive career guidance</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6 sm:mb-8">
                    <div className="bg-purple-50 rounded-lg p-3 sm:p-4">
                      <h5 className="font-medium text-purple-900 mb-2 text-sm sm:text-base">What You'll Get:</h5>
                      <ul className="space-y-1 text-xs sm:text-sm text-purple-800">
                        <li>• ✨ AI-generated skill analysis based on your unique responses</li>
                        <li>• 📋 Personalized development plan created from your conversation</li>
                        <li>• 🇳🇬 Nigerian job market-focused recommendations</li>
                        <li>• 💼 Custom project ideas tailored to your experience level</li>
                        <li>• 📚 AI-curated learning resources matching your specific needs</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Brain className="w-4 h-4 text-blue-600" />
                        <h5 className="font-medium text-blue-900 text-sm sm:text-base">100% Personalized by AI</h5>
                      </div>
                      <p className="text-xs sm:text-sm text-blue-800">
                        Unlike generic questionnaires, our AI analyzes your actual conversation to create recommendations 
                        specifically for <strong>your</strong> situation, goals, and background in <strong>{course}</strong>.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAssessmentSelect()}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 flex items-center justify-center space-x-2 sm:space-x-3 font-medium text-base sm:text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Start AI Assessment</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Why AI Assessment */}
              <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-4 sm:p-6 text-white">
                <div className="flex items-start space-x-3">
                  <Brain className="w-5 h-5 sm:w-6 sm:h-6 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 text-sm sm:text-base">🤖 Why Choose AI Assessment?</h4>
                    <p className="text-xs sm:text-sm opacity-90 mb-3">
                      Our AI conducts intelligent conversations to understand your unique situation, experiences, and aspirations. 
                      Every recommendation is generated specifically from YOUR responses - not generic templates.
                    </p>
                    <p className="text-xs sm:text-sm opacity-90">
                      <strong>Your assessment results will be 100% personalized</strong> to your background as a 
                      <strong> {course}</strong> graduate in Nigeria, based on what you actually tell our AI.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Popular Courses */}
          {!course.trim() && (
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Popular Courses</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
                {popularCourses.slice(0, 12).map((popularCourse) => (
                  <button
                    key={popularCourse}
                    onClick={() => setCourse(popularCourse)}
                    className="text-left p-2 sm:p-3 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg text-xs sm:text-sm transition-colors"
                  >
                    {popularCourse}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseInput;
