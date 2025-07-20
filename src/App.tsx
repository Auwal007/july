import { useState } from 'react';
import Homepage from './components/Homepage';
import CourseInput from './components/CourseInput';
import AIChat from './components/AIChat';
import ChatResults from './components/ChatResults';

export interface ChatAssessmentData {
  course: string;
  conversation: any[];
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

type AppState = 'homepage' | 'course-input' | 'chat-assessment' | 'chat-results';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('homepage');
  const [chatAssessmentData, setChatAssessmentData] = useState<ChatAssessmentData | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string>('');

  const handleGetStarted = () => {
    setCurrentState('course-input');
  };

  const handleCourseSubmit = (course: string) => {
    setSelectedCourse(course);
    setCurrentState('chat-assessment');
  };

  const handleChatAssessmentComplete = (data: ChatAssessmentData) => {
    setChatAssessmentData(data);
    setCurrentState('chat-results');
  };

  const handleBackToHome = () => {
    setCurrentState('homepage');
    setSelectedCourse('');
    setChatAssessmentData(null);
  };

  const handleNewAssessment = () => {
    setCurrentState('course-input');
    setSelectedCourse('');
    setChatAssessmentData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {currentState === 'homepage' && <Homepage onGetStarted={handleGetStarted} />}
      {currentState === 'course-input' && <CourseInput onCourseSubmit={handleCourseSubmit} onBackToHome={handleBackToHome} />}
      {currentState === 'chat-assessment' && (
        <AIChat 
          course={selectedCourse} 
          onAssessmentComplete={handleChatAssessmentComplete}
          onBackToHome={handleBackToHome}
          onStartNewAssessment={handleNewAssessment}
        />
      )}
      {currentState === 'chat-results' && chatAssessmentData && (
        <ChatResults 
          assessmentData={chatAssessmentData} 
          onStartOver={handleBackToHome}
          onBackToHome={handleBackToHome}
          onNewAssessment={handleNewAssessment}
        />
      )}
    </div>
  );
}

export default App;