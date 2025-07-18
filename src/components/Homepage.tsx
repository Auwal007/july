import React from 'react';
import { GraduationCap, Brain, Target, ArrowRight, CheckCircle, Users, TrendingUp } from 'lucide-react';

interface HomepageProps {
  onGetStarted: () => void;
}

const Homepage: React.FC<HomepageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">SkillBridge AI</h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              <span>For Nigerian Graduates</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              🎓 Welcome to SkillBridge AI
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Are you a Nigerian graduate wondering if your course of study has prepared you for the job market?
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <p className="text-lg text-gray-700 mb-6">
              SkillBridge AI is your intelligent career companion — designed to help you:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Identify Key Skills</h3>
                  <p className="text-gray-600">Discover the employability skills expected in your field</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Assess Your Skills</h3>
                  <p className="text-gray-600">Evaluate which skills you already possess</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Discover Gaps</h3>
                  <p className="text-gray-600">Identify which skills you may be missing</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Get Recommendations</h3>
                  <p className="text-gray-600">Receive personalized learning resources and project ideas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Process Overview */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white mb-12">
            <h3 className="text-2xl font-bold mb-6">🔍 How It Works</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Brain className="h-8 w-8" />
                </div>
                <h4 className="font-semibold mb-2">Smart Questions</h4>
                <p className="text-sm opacity-90">AI asks you targeted questions based on your course</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Target className="h-8 w-8" />
                </div>
                <h4 className="font-semibold mb-2">Gap Analysis</h4>
                <p className="text-sm opacity-90">Analyzes your answers to identify skill gaps</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <h4 className="font-semibold mb-2">Growth Plan</h4>
                <p className="text-sm opacity-90">Recommends free resources to help you improve</p>
              </div>
            </div>
          </div>

          {/* Supported Courses */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              🚀 Whether you studied Computer Science, Mass Communication, Agriculture, or any other course
            </h3>
            <p className="text-gray-600 mb-8">
              This AI-powered tool will provide personalized insights for your specific field of study.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
            >
              <span>Get Started - It's Free!</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <p className="text-sm text-gray-500 mt-4">
              No signup required • Takes 5 minutes • Get instant results
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;