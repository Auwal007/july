import React, { useState } from 'react';
import { GraduationCap, Brain, Target, Download, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import Homepage from './components/Homepage';
import CourseInput from './components/CourseInput';
import SkillAssessment from './components/SkillAssessment';
import Results from './components/Results';

export interface AssessmentData {
  course: string;
  questions: Question[];
  answers: Answer[];
  score: number;
  missingSkills: string[];
  recommendations: Recommendation[];
  projects: Project[];
}

export interface Question {
  id: string;
  question: string;
  skill: string;
}

export interface Answer {
  questionId: string;
  answer: 'yes' | 'no' | 'maybe';
}

export interface Recommendation {
  title: string;
  description: string;
  url: string;
  provider: string;
}

export interface Project {
  title: string;
  description: string;
  skills: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

type AppState = 'homepage' | 'course-input' | 'assessment' | 'results';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('homepage');
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);

  const handleGetStarted = () => {
    setCurrentState('course-input');
  };

  const handleCourseSubmit = (course: string) => {
    setAssessmentData(prev => ({
      ...prev,
      course,
      questions: [],
      answers: [],
      score: 0,
      missingSkills: [],
      recommendations: [],
      projects: []
    } as AssessmentData));
    setCurrentState('assessment');
  };

  const handleAssessmentComplete = (data: AssessmentData) => {
    setAssessmentData(data);
    setCurrentState('results');
  };

  const handleStartOver = () => {
    setAssessmentData(null);
    setCurrentState('homepage');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {currentState === 'homepage' && <Homepage onGetStarted={handleGetStarted} />}
      {currentState === 'course-input' && <CourseInput onCourseSubmit={handleCourseSubmit} />}
      {currentState === 'assessment' && assessmentData && (
        <SkillAssessment 
          course={assessmentData.course} 
          onComplete={handleAssessmentComplete}
        />
      )}
      {currentState === 'results' && assessmentData && (
        <Results 
          assessmentData={assessmentData} 
          onStartOver={handleStartOver}
        />
      )}
    </div>
  );
}

export default App;