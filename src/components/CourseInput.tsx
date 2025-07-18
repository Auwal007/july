import React, { useState } from 'react';
import { Search, BookOpen, ArrowRight } from 'lucide-react';

interface CourseInputProps {
  onCourseSubmit: (course: string) => void;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <BookOpen className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Course Did You Study?
          </h2>
          <p className="text-lg text-gray-600">
            Enter your course of study to get personalized skill assessment questions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <button
            type="submit"
            disabled={!course.trim()}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-4 px-6 rounded-2xl text-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center space-x-2"
          >
            <span>Start Assessment</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>

        <div className="mt-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Popular Courses
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {popularCourses.slice(0, 12).map((popularCourse) => (
              <button
                key={popularCourse}
                onClick={() => handleSuggestionClick(popularCourse)}
                className="text-left p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 hover:border-green-300"
              >
                <span className="text-sm font-medium text-gray-700">{popularCourse}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInput;