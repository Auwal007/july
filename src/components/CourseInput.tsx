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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Navigation Header */}
      {onBackToHome && (
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBackToHome}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={onBackToHome}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
            </div>
          </div>
        </div>
      )}

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

          {/* AI Assessment Start Button */}
          {course.trim() && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Start Your AI-Powered Assessment
                </h3>
                <p className="text-gray-600">
                  Have a personalized conversation with AI to deeply understand your skills and career potential
                </p>
              </div>

              {/* AI Chat Assessment Card */}
              <div className="bg-white rounded-xl border-2 border-purple-200 shadow-lg overflow-hidden max-w-2xl mx-auto">
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">AI Career Assessment</h4>
                      <p className="text-sm text-gray-600">Intelligent & Personalized</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center space-x-2 text-sm text-gray-700">
                      <MessageSquare className="w-4 h-4 text-purple-600" />
                      <span>Conversational AI interaction</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-700">
                      <Clock className="w-4 h-4 text-purple-600" />
                      <span>15-25 minutes</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-700">
                      <Target className="w-4 h-4 text-purple-600" />
                      <span>Deep skill exploration</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-700">
                      <BookOpen className="w-4 h-4 text-purple-600" />
                      <span>Comprehensive career guidance</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <h5 className="font-medium text-purple-900 mb-2">What You'll Get:</h5>
                      <ul className="space-y-1 text-sm text-purple-800">
                        <li>• Personalized skill analysis based on your unique background</li>
                        <li>• Tailored development plan with specific goals and timelines</li>
                        <li>• Nigerian job market-focused recommendations</li>
                        <li>• Custom project ideas to build your portfolio</li>
                        <li>• Free learning resources curated for your needs</li>
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAssessmentSelect()}
                    className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 flex items-center justify-center space-x-3 font-medium text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <Brain className="w-5 h-5" />
                    <span>Start AI Assessment</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Why AI Assessment */}
              <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
                <div className="flex items-start space-x-3">
                  <Brain className="w-6 h-6 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">🤖 Why Choose AI Assessment?</h4>
                    <p className="text-sm opacity-90">
                      Unlike traditional questionnaires, our AI has real conversations with you to understand your unique situation, 
                      experiences, and aspirations. This creates highly personalized recommendations that truly match your needs as a 
                      <strong> {course}</strong> graduate in Nigeria.
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
