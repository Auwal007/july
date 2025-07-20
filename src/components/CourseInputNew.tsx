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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <BookOpen className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Course Did You Study?
          </h2>
          <p className="text-lg text-gray-600">
            Enter your course of study and choose your preferred assessment type
          </p>
        </div>

        <div className="space-y-8">
          {/* Course Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={course}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="e.g., Computer Science, Mass Communication, Engineering..."
              className="block w-full pl-10 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
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

          {/* Assessment Type Selection */}
          {course.trim() && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Choose Your Assessment Type
                </h3>
                <p className="text-gray-600">
                  Select the assessment style that works best for you
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Quick Assessment */}
                <div className="bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 transition-all duration-200 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">Quick Assessment</h4>
                        <p className="text-sm text-gray-600">Fast & Focused</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>5-10 minutes</span>
                      </div>
                      <div className="text-sm text-gray-700">
                        • 8 targeted yes/no questions
                      </div>
                      <div className="text-sm text-gray-700">
                        • Instant employability score
                      </div>
                      <div className="text-sm text-gray-700">
                        • Basic skill gap analysis
                      </div>
                      <div className="text-sm text-gray-700">
                        • Quick recommendations
                      </div>
                    </div>

                    <button
                      onClick={() => handleAssessmentSelect('quick')}
                      className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2 font-medium"
                    >
                      <span>Start Quick Assessment</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* AI Chat Assessment */}
                <div className="bg-white rounded-xl border-2 border-gray-200 hover:border-purple-500 transition-all duration-200 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                        <Brain className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">AI Chat Assessment</h4>
                        <p className="text-sm text-gray-600">Deep & Personalized</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MessageSquare className="w-4 h-4" />
                        <span>15-25 minutes</span>
                      </div>
                      <div className="text-sm text-gray-700">
                        • Conversational AI interaction
                      </div>
                      <div className="text-sm text-gray-700">
                        • Deep skill exploration
                      </div>
                      <div className="text-sm text-gray-700">
                        • Personalized development plan
                      </div>
                      <div className="text-sm text-gray-700">
                        • Comprehensive career guidance
                      </div>
                    </div>

                    <button
                      onClick={() => handleAssessmentSelect('chat')}
                      className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 flex items-center justify-center space-x-2 font-medium"
                    >
                      <span>Start AI Chat</span>
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Recommendation */}
              <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
                <div className="flex items-start space-x-3">
                  <Brain className="w-6 h-6 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">💡 Our Recommendation</h4>
                    <p className="text-sm opacity-90">
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
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Courses</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {popularCourses.slice(0, 12).map((popularCourse) => (
                  <button
                    key={popularCourse}
                    onClick={() => setCourse(popularCourse)}
                    className="text-left p-3 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg text-sm transition-colors"
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
