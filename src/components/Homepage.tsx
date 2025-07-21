import React from 'react';
import { GraduationCap, ArrowRight, CheckCircle, Users, MessageSquare, Brain, Target, Star, TrendingUp, Award, Zap } from 'lucide-react';

interface HomepageProps {
  onGetStarted: () => void;
}

const Homepage: React.FC<HomepageProps> = ({ onGetStarted }) => {
  return (
    <div>
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">SkillBridge AI</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Career Assessment Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600 bg-blue-50 px-2 sm:px-3 py-1 sm:py-2 rounded-full">
              <Users className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="font-medium">For Nigerian Graduates</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 sm:py-16 lg:py-20 px-3 sm:px-6 lg:px-8">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-20 sm:top-40 right-5 sm:right-10 w-48 h-48 sm:w-72 sm:h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 text-green-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Zap className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>AI-Powered Career Assessment</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Bridge the Gap Between
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> Education</span>
              <br />
              and <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Employment</span>
            </h2>
            
            <p className="text-base sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-6 sm:mb-8 px-2">
              Discover if your course of study has truly prepared you for Nigeria's competitive job market. 
              Get personalized insights through intelligent AI conversations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-8 mb-8 sm:mb-12">
              <div className="flex items-center space-x-2 text-gray-600">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                <span className="font-medium text-sm sm:text-base">100% Free</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                <span className="font-medium text-sm sm:text-base">No Signup Required</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                <span className="font-medium text-sm sm:text-base">Instant Results</span>
              </div>
            </div>

            <button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3 px-8 sm:py-4 sm:px-12 rounded-full text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-green-500/25 group"
            >
              <span className="flex items-center space-x-2 sm:space-x-3">
                <span>Start Your Assessment</span>
                <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-3 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why Choose SkillBridge AI?
            </h3>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Unlike traditional assessments, our AI understands your unique background and provides personalized career guidance.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-16">
            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Brain className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Intelligent Conversations</h4>
              <p className="text-sm sm:text-base text-gray-600 px-2">Our AI engages in meaningful dialogue to understand your experiences, aspirations, and unique situation.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Target className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Precise Assessment</h4>
              <p className="text-sm sm:text-base text-gray-600 px-2">Get accurate analysis of your skills, identify gaps, and discover your strengths in your field of study.</p>
            </div>

            <div className="text-center group sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <TrendingUp className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Actionable Insights</h4>
              <p className="text-sm sm:text-base text-gray-600 px-2">Receive a comprehensive development plan with specific goals, resources, and project recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-3 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              How It Works
            </h3>
            <p className="text-base sm:text-xl text-gray-600">
              Simple, fast, and incredibly insightful
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="relative">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg border-4 border-green-200">
                  <span className="text-xl sm:text-2xl font-bold text-green-600">1</span>
                </div>
                <div className="hidden lg:block absolute top-6 sm:top-8 left-full w-full h-0.5 bg-green-200"></div>
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Choose Your Course</h4>
              <p className="text-xs sm:text-sm text-gray-600 px-2">Tell us what you studied in university</p>
            </div>

            <div className="text-center">
              <div className="relative">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg border-4 border-blue-200">
                  <span className="text-xl sm:text-2xl font-bold text-blue-600">2</span>
                </div>
                <div className="hidden lg:block absolute top-6 sm:top-8 left-full w-full h-0.5 bg-blue-200"></div>
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Chat with AI</h4>
              <p className="text-xs sm:text-sm text-gray-600 px-2">Have a 15-20 minute conversation about your background</p>
            </div>

            <div className="text-center">
              <div className="relative">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg border-4 border-purple-200">
                  <span className="text-xl sm:text-2xl font-bold text-purple-600">3</span>
                </div>
                <div className="hidden lg:block absolute top-6 sm:top-8 left-full w-full h-0.5 bg-purple-200"></div>
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">AI Analysis</h4>
              <p className="text-xs sm:text-sm text-gray-600 px-2">Our AI analyzes your skills and career readiness</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg border-4 border-green-200">
                <Award className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Get Your Plan</h4>
              <p className="text-xs sm:text-sm text-gray-600 px-2">Receive personalized development recommendations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-3 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 text-center lg:text-left">
                What You'll Discover
              </h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">Your Current Skill Level</h4>
                    <p className="text-gray-600 text-sm sm:text-base">Understand exactly where you stand in your field and what employers expect.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">Skill Gaps & Opportunities</h4>
                    <p className="text-gray-600 text-sm sm:text-base">Identify missing skills and discover hidden strengths you can leverage.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">Personalized Learning Path</h4>
                    <p className="text-gray-600 text-sm sm:text-base">Get a step-by-step plan tailored specifically for Nigerian job market.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">Career Growth Strategy</h4>
                    <p className="text-gray-600 text-sm sm:text-base">Practical projects and resources to boost your employability score.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 sm:p-8 order-1 lg:order-2">
              <div className="text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Brain className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">AI-Powered Intelligence</h4>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                  Our advanced AI understands the Nigerian job market and provides insights that traditional assessments simply can't match.
                </p>
                <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                  <p className="text-xs sm:text-sm text-gray-500 italic">
                    "Unlike generic career tests, this AI actually listens to my unique situation and gives advice that makes sense for Nigeria."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-3 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Bridge Your Skill Gap?
          </h3>
          <p className="text-base sm:text-xl text-green-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            Join thousands of Nigerian graduates who have discovered their true career potential. 
            Your personalized assessment is just one conversation away.
          </p>
          
          <button
            onClick={onGetStarted}
            className="bg-white text-green-600 hover:bg-gray-50 font-bold py-3 px-8 sm:py-4 sm:px-12 rounded-full text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl group"
          >
            <span className="flex items-center space-x-2 sm:space-x-3">
              <span>Start Free Assessment</span>
              <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <p className="text-green-100 text-xs sm:text-sm mt-3 sm:mt-4 px-2">
            ⚡ Takes 15-20 minutes • 🎯 Personalized results • 🇳🇬 Made for Nigerian graduates
          </p>
        </div>
      </section>
    </div>
  );
};

export default Homepage;