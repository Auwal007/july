import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader, MessageSquare, BookOpen, Target, ArrowLeft, RotateCcw, Download } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface AIChatProps {
  course: string;
  onAssessmentComplete: (assessment: ChatAssessmentData) => void;
  onBackToHome?: () => void;
  onStartNewAssessment?: () => void;
}

interface ChatAssessmentData {
  course: string;
  conversation: Message[];
  assessmentType?: string;
  aiConfidence?: number;
  skillsAnalysis: {
    currentSkills: string[];
    missingSkills: string[];
    strengthAreas: string[];
    improvementAreas: string[];
    recommendedPath: string[];
  };
  personalizedPlan: {
    shortTerm: string[];
    mediumTerm: string[];
    longTerm: string[];
    resources: any[];
    projects: any[];
  };
  employabilityScore: number;
  confidence: number;
}

const AIChat: React.FC<AIChatProps> = ({ course, onAssessmentComplete, onBackToHome, onStartNewAssessment }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [assessmentPhase, setAssessmentPhase] = useState<'introduction' | 'exploration' | 'deep-dive' | 'analysis' | 'complete'>('introduction');
  const [userProfile, setUserProfile] = useState<any>({});
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<'home' | 'new' | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simple markdown parser for basic formatting
  const parseMarkdown = (text: string) => {
    // Escape HTML first to prevent XSS
    let parsed = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    
    // Convert **bold** to <strong>
    parsed = parsed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert *italic* to <em>
    parsed = parsed.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Convert line breaks to <br>
    parsed = parsed.replace(/\n\n/g, '</p><p>'); // Double line breaks = paragraphs
    parsed = parsed.replace(/\n/g, '<br>'); // Single line breaks = <br>
    
    // Convert bullet points (• or - or *) to proper list items
    parsed = parsed.replace(/^[•\-\*]\s+(.*)$/gm, '<li>$1</li>');
    
    // Wrap consecutive list items in <ul>
    parsed = parsed.replace(/(<li>.*?<\/li>)(\s*<li>.*?<\/li>)*/gs, '<ul>$&</ul>');
    
    // Wrap in paragraphs if not already wrapped
    if (!parsed.includes('<p>') && !parsed.includes('<ul>')) {
      parsed = '<p>' + parsed + '</p>';
    }
    
    return parsed;
  };

  const scrollToBottom = () => {
    // Scroll within the chat container instead of the entire page
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    initializeChat();
  }, [course]);

  const initializeChat = async () => {
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: `🎓 Hello! I'm **SkillBridge AI**, your dedicated **${course}** career assessment assistant.

I'm designed specifically to help assess your skills and career readiness in **${course}**. I'll have a focused conversation with you to understand your current abilities, experiences, and career goals in this field.

**Important**: I can only discuss topics related to your **${course}** career development and skills assessment. 

Let's start: What motivated you to study **${course}**, and what aspects of this field interest you most?`,
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
  };

  const sendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    // Add typing indicator
    const typingMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: '',
      timestamp: new Date(),
      isTyping: true
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      const response = await fetch(API_ENDPOINTS.chatAssess, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          course,
          userMessage: currentMessage,
          conversationHistory: messages,
          assessmentPhase,
          userProfile
        }),
      });

      const data = await response.json();

      // Remove typing indicator
      setMessages(prev => prev.filter(msg => !msg.isTyping));

      const aiResponse: Message = {
        id: (Date.now() + 2).toString(),
        type: 'ai',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);

      // Update assessment state
      if (data.phase) setAssessmentPhase(data.phase);
      if (data.userProfile) setUserProfile(data.userProfile);

      // Check if assessment is complete
      if (data.assessmentComplete && data.assessment) {
        setTimeout(() => {
          onAssessmentComplete(data.assessment);
        }, 2000);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      // Remove typing indicator
      setMessages(prev => prev.filter(msg => !msg.isTyping));
      
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: 'ai',
        content: 'I apologize, but I\'m having trouble connecting right now. Could you please try again?',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleNavigation = (type: 'home' | 'new') => {
    if (messages.length > 1 && assessmentPhase !== 'complete') {
      // Show confirmation if assessment is in progress
      setPendingNavigation(type);
      setShowLeaveConfirm(true);
    } else {
      // Navigate immediately if no assessment in progress
      executeNavigation(type);
    }
  };

  const executeNavigation = (type: 'home' | 'new') => {
    if (type === 'home' && onBackToHome) {
      onBackToHome();
    } else if (type === 'new' && onStartNewAssessment) {
      onStartNewAssessment();
    }
  };

  const confirmLeave = () => {
    if (pendingNavigation) {
      executeNavigation(pendingNavigation);
    }
    setShowLeaveConfirm(false);
    setPendingNavigation(null);
  };

  const cancelLeave = () => {
    setShowLeaveConfirm(false);
    setPendingNavigation(null);
  };

  const downloadChatHistory = () => {
    const chatHistory = messages
      .filter(msg => !msg.isTyping)
      .map(msg => {
        const timestamp = msg.timestamp ? new Date(msg.timestamp).toLocaleString() : new Date().toLocaleString();
        const cleanContent = msg.content.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
        return `[${timestamp}] ${msg.type.toUpperCase()}: ${cleanContent}`;
      })
      .join('\n\n');

    const content = `SkillBridge AI - Chat Conversation
Course: ${course}
Date: ${new Date().toLocaleDateString()}

=== CONVERSATION HISTORY ===

${chatHistory}

Generated by SkillBridge AI - Your Intelligent Career Companion`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SkillBridge_Chat_${course.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getPhaseIndicator = () => {
    const phases = [
      { key: 'introduction', label: 'Getting to know you', icon: User },
      { key: 'exploration', label: 'Exploring your skills', icon: MessageSquare },
      { key: 'deep-dive', label: 'Deep skill analysis', icon: BookOpen },
      { key: 'analysis', label: 'Creating your plan', icon: Target },
      { key: 'complete', label: 'Assessment complete', icon: Target }
    ];

    const currentIndex = phases.findIndex(p => p.key === assessmentPhase);
    
    return (
      <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-blue-50 rounded-lg">
        <div className="flex items-center justify-between mb-1 sm:mb-2">
          <span className="text-xs sm:text-sm font-medium text-blue-800">Assessment Progress</span>
          <span className="text-xs text-blue-600">{currentIndex + 1}/5</span>
        </div>
        <div className="flex space-x-1">
          {phases.map((phase, index) => {
            const isActive = index === currentIndex;
            const isCompleted = index < currentIndex;
            
            return (
              <div
                key={phase.key}
                className={`flex-1 h-1.5 sm:h-2 rounded-full ${
                  isCompleted ? 'bg-blue-600' : 
                  isActive ? 'bg-blue-400' : 'bg-blue-200'
                }`}
                title={phase.label}
              />
            );
          })}
        </div>
        <p className="text-xs text-blue-700 mt-1">
          {phases[currentIndex]?.label}
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-32 h-32 border-4 border-indigo-200 rounded-3xl transform -rotate-45 animate-pulse opacity-30"></div>
        <div className="absolute bottom-32 left-20 w-24 h-24 bg-emerald-200 rounded-full animate-bounce opacity-40" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-rose-200 transform rotate-45 animate-pulse opacity-30" style={{animationDelay: '2.5s'}}></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Compact Navigation Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 shadow-lg p-3 sm:p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => handleNavigation('home')}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-300 font-bold group"
              >
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm">Back</span>
              </button>
              
              <div className="w-px h-6 bg-slate-300"></div>
              
              <button
                onClick={() => handleNavigation('new')}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-300 font-bold group"
              >
                <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-180 transition-transform duration-500" />
                <span className="text-sm">New</span>
              </button>
              
              {messages.length > 1 && (
                <>
                  <div className="w-px h-6 bg-slate-300"></div>
                  <button
                    onClick={downloadChatHistory}
                    className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-2 text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-300 font-bold group"
                  >
                    <Download className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-y-1 transition-transform" />
                    <span className="text-sm">Save</span>
                  </button>
                </>
              )}
            </div>
            
            <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-emerald-800">AI Assessment</span>
            </div>
          </div>
        </div>

        {/* Compact Header */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300 opacity-20"></div>
          <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-xl p-4 sm:p-5 mb-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-500">
                  <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <div className="flex-1">
                <h1 className="text-lg sm:text-xl font-black text-slate-800 mb-1">AI Career Assessment</h1>
                <p className="text-sm text-slate-600 font-medium">Evaluation for <span className="text-emerald-600 font-bold">{course}</span> graduates</p>
              </div>
            </div>
            
            {getPhaseIndicator()}
          </div>
        </div>

        {/* Expanded Chat Messages */}
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 rounded-3xl"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="h-[75vh] sm:h-[80vh] overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6" id="chat-container">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-start space-x-3 sm:space-x-4 max-w-[85%] sm:max-w-4xl">
                    {message.type === 'ai' && (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                    )}
                    
                    <div
                      className={`px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-lg ${
                        message.type === 'user'
                          ? 'bg-slate-900 text-white ml-auto'
                          : 'bg-white border border-slate-200 text-slate-800'
                      }`}
                    >
                      {message.isTyping ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <span className="text-sm text-slate-600 ml-2">AI is thinking...</span>
                        </div>
                      ) : (
                        <div 
                          className={`${
                            message.type === 'ai' 
                              ? 'prose prose-slate max-w-none text-slate-800' 
                              : 'text-white'
                          } text-sm sm:text-base leading-relaxed`}
                          dangerouslySetInnerHTML={{ __html: parseMarkdown(message.content) }}
                        />
                      )}
                    </div>
                    
                    {message.type === 'user' && (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-900 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced Message Input */}
            <div className="border-t border-slate-200 bg-slate-50 p-4 sm:p-6">
              <div className="flex space-x-3 sm:space-x-4">
                <div className="flex-1 relative">
                  <textarea
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Share your thoughts, experiences, or ask questions..."
                    className="w-full p-3 sm:p-4 border-2 border-slate-200 rounded-2xl resize-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm sm:text-base font-medium text-slate-800 placeholder-slate-500 bg-white shadow-sm"
                    rows={2}
                    disabled={isLoading}
                  />
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!currentMessage.trim() || isLoading}
                  className="px-4 sm:px-6 py-3 sm:py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 flex-shrink-0 shadow-lg transition-all duration-300 transform hover:scale-105 group"
                >
                  {isLoading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      <span className="hidden sm:inline font-bold">Send</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Tips Section */}
        <div className="relative group mb-4">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-300 opacity-20"></div>
          <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-xl p-4 sm:p-5">
            <h3 className="text-md font-black text-slate-800 mb-3 flex items-center space-x-2">
              <span>💡</span>
              <span>Tips for Better Assessment</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700">
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Be honest about your skills</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Share specific examples</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Mention challenges faced</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Ask questions freely</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Leave Confirmation Modal */}
        {showLeaveConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="relative bg-white rounded-3xl p-8 max-w-md mx-4 shadow-2xl border border-slate-200">
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-rose-400 rounded-full animate-pulse"></div>
              <h3 className="text-xl font-black text-slate-800 mb-4">Leave Assessment?</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Your assessment progress will be lost if you leave now. Are you sure you want to continue?
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={confirmLeave}
                  className="flex-1 px-4 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-bold transition-all duration-300 transform hover:scale-105"
                >
                  Yes, Leave
                </button>
                <button
                  onClick={cancelLeave}
                  className="flex-1 px-4 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105"
                >
                  Stay
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIChat;
