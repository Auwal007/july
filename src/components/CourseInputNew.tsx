import React, { useState } from 'react';
import { Search, BookOpen, ArrowRight, MessageSquare, Clock, Brain, Zap } from 'lucide-react';

interface CourseInputProps {
  onCourseSubmit: (course: string, assessmentType: 'quick' | 'chat') => void;
}

const CourseInput: React.FC<CourseInputProps> = ({ onCourseSubmit }) => {
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

  const handleAssessmentSelect = (assessmentType: 'quick' | 'chat') => {
    if (course.trim()) {
      onCourseSubmit(course.trim(), assessmentType);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCourse(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 px-3 sm:px-6 lg:px-8">
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
                  className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl border-b border-gray-100 last:border-b-0 text-sm sm:text-base"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Assessment Type Selection */}
          {course.trim() && (
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  Choose Your Assessment Type
                </h3>
                <p className="text-gray-600 text-sm sm:text-base px-2">
                  Select the assessment style that works best for you
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Quick Assessment */}
                <div className="bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 transition-all duration-200 overflow-hidden">
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-base sm:text-lg font-semibold text-gray-900">Quick Assessment</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Fast & Focused</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                      <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span>5-10 minutes</span>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-700">
                        • 8 targeted yes/no questions
                      </div>
                      <div className="text-xs sm:text-sm text-gray-700">
                        • Instant employability score
                      </div>
                      <div className="text-xs sm:text-sm text-gray-700">
                        • Basic skill gap analysis
                      </div>
                      <div className="text-xs sm:text-sm text-gray-700">
                        • Quick recommendations
                      </div>
                    </div>

                    <button
                      onClick={() => handleAssessmentSelect('quick')}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2 font-medium text-sm sm:text-base"
                    >
                      <span>Start Quick Assessment</span>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>

                {/* AI Chat Assessment */}
                <div className="bg-white rounded-xl border-2 border-gray-200 hover:border-purple-500 transition-all duration-200 overflow-hidden">
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-base sm:text-lg font-semibold text-gray-900">AI Chat Assessment</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Deep & Personalized</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                      <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                        <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span>15-25 minutes</span>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-700">
                        • Conversational AI interaction
                      </div>
                      <div className="text-xs sm:text-sm text-gray-700">
                        • Deep skill exploration
                      </div>
                      <div className="text-xs sm:text-sm text-gray-700">
                        • Personalized development plan
                      </div>
                      <div className="text-xs sm:text-sm text-gray-700">
                        • Comprehensive career guidance
                      </div>
                    </div>

                    <button
                      onClick={() => handleAssessmentSelect('chat')}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 flex items-center justify-center space-x-2 font-medium text-sm sm:text-base"
                    >
                      <span>Start AI Chat</span>
                      <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Recommendation */}
              <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-4 sm:p-6 text-white">
                <div className="flex items-start space-x-3">
                  <Brain className="w-5 h-5 sm:w-6 sm:h-6 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 text-sm sm:text-base">💡 Our Recommendation</h4>
                    <p className="text-xs sm:text-sm opacity-90">
                      For the most comprehensive assessment and personalized guidance, we recommend the 
                      <strong> AI Chat Assessment</strong>. It provides deeper insights into your unique situation 
                      and creates a tailored development plan specifically for Nigerian graduates in {course}.
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
