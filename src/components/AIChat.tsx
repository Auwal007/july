import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader, MessageSquare, BookOpen, Target, Home, ArrowLeft, RotateCcw, Download } from 'lucide-react';
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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Navigation Header */}
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => handleNavigation('home')}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Back</span>
              </button>
              
              <div className="h-6 w-px bg-gray-300"></div>
              
              <button
                onClick={() => handleNavigation('new')}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 text-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">New Assessment</span>
                <span className="sm:hidden">New</span>
              </button>
              
              {messages.length > 1 && (
                <>
                  <div className="h-6 w-px bg-gray-300"></div>
                  <button
                    onClick={downloadChatHistory}
                    className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Download Chat</span>
                    <span className="sm:hidden">Download</span>
                  </button>
                </>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Home className="w-4 h-4 text-gray-400" />
              <span className="text-xs sm:text-sm text-gray-600 hidden sm:inline">SkillBridge AI</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center space-x-3 mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">AI Career Assessment</h1>
              <p className="text-gray-600 text-sm sm:text-base truncate">Personalized evaluation for {course} graduates</p>
            </div>
          </div>
          
          {getPhaseIndicator()}
        </div>

        {/* Chat Messages */}
        <div className="bg-white rounded-lg shadow-sm mb-4 sm:mb-6">
          <div className="h-80 sm:h-96 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex items-start space-x-2 sm:space-x-3 max-w-[85%] sm:max-w-3xl">
                  {message.type === 'ai' && (
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white ml-auto'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {message.isTyping ? (
                      <div className="flex items-center space-x-1">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    ) : (
                      <div 
                        className={`${message.type === 'ai' ? 'prose prose-sm max-w-none text-gray-900' : 'text-white'} text-sm sm:text-base`}
                        dangerouslySetInnerHTML={{ __html: parseMarkdown(message.content) }}
                        style={{
                          lineHeight: '1.6',
                        }}
                      />
                    )}
                  </div>
                  
                  {message.type === 'user' && (
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t p-3 sm:p-4">
            <div className="flex space-x-2 sm:space-x-3">
              <div className="flex-1 relative">
                <textarea
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share your thoughts, experiences, or ask questions..."
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  rows={2}
                  disabled={isLoading}
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!currentMessage.trim() || isLoading}
                className="px-3 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1 sm:space-x-2 flex-shrink-0"
              >
                {isLoading ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span className="hidden sm:inline text-sm">Send</span>
              </button>
            </div>
            
            <div className="mt-2 text-xs text-gray-500">
              Press Enter to send, Shift+Enter for new line
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
          <h3 className="font-semibold mb-2">💡 Tips for a better assessment:</h3>
          <ul className="space-y-1 text-sm opacity-90">
            <li>• Be honest about your current skill level</li>
            <li>• Share specific examples of projects or experiences</li>
            <li>• Mention any challenges you've faced in your field</li>
            <li>• Ask questions about skills you're curious about</li>
          </ul>
        </div>

        {/* Leave Confirmation Modal */}
        {showLeaveConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Leave Assessment?</h3>
              <p className="text-gray-600 mb-4">
                Your assessment progress will be lost if you leave now. Are you sure you want to continue?
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={confirmLeave}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Yes, Leave
                </button>
                <button
                  onClick={cancelLeave}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
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
