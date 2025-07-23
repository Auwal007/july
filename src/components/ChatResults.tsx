import React, { useState } from 'react';

interface ChatAssessmentData {
  course: string;
  conversation: any[];
  assessmentType?: string;
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

interface ChatResultsProps {
  assessmentData: ChatAssessmentData;
  onStartOver: () => void;
  onBackToHome?: () => void;
  onNewAssessment?: () => void;
}

const ChatResults: React.FC<ChatResultsProps> = ({ assessmentData, onStartOver, onBackToHome, onNewAssessment }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'plan' | 'resources'>('overview');
  
  const { course, skillsAnalysis, personalizedPlan, employabilityScore, confidence } = assessmentData;

  // Simplified download function
  const handleDownloadReport = () => {
    const content = `SkillBridge AI - ${course} Assessment Report\nScore: ${employabilityScore}%`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SkillBridge_Assessment_${course}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Simple tab content
  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div>
            <h3 style={{ marginBottom: '10px' }}>Employability Score: {employabilityScore}%</h3>
            <h3>AI Confidence: {confidence}%</h3>
          </div>
        );
      case 'skills':
        return (
          <div>
            <h3 style={{ marginBottom: '10px' }}>Current Skills</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '20px' }}>
              {skillsAnalysis.currentSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
            <h3 style={{ marginBottom: '10px' }}>Skills to Develop</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              {skillsAnalysis.missingSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        );
      case 'plan':
        return (
          <div>
            <h3 style={{ marginBottom: '10px' }}>Short-term Goals</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '20px' }}>
              {personalizedPlan.shortTerm.map((goal, index) => (
                <li key={index}>{goal}</li>
              ))}
            </ul>
            <h3 style={{ marginBottom: '10px' }}>Medium-term Goals</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '20px' }}>
              {personalizedPlan.mediumTerm.map((goal, index) => (
                <li key={index}>{goal}</li>
              ))}
            </ul>
            <h3 style={{ marginBottom: '10px' }}>Long-term Goals</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              {personalizedPlan.longTerm.map((goal, index) => (
                <li key={index}>{goal}</li>
              ))}
            </ul>
          </div>
        );
      case 'resources':
        return (
          <div>
            <h3 style={{ marginBottom: '10px' }}>Recommended Resources</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              {personalizedPlan.resources.map((resource: any, index: number) => (
                <li key={index}>
                  <strong>{resource.title}</strong> - {resource.provider}
                  {resource.url && (
                    <div style={{ marginTop: '5px' }}>
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ color: '#4a90e2', textDecoration: 'underline' }}
                      >
                        Visit Resource
                      </a>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Assessment Complete!</h1>
        <p style={{ fontSize: '16px' }}>Comprehensive analysis for {course} graduates</p>
        
        {/* Simple nav buttons */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
          {onBackToHome && (
            <button 
              onClick={onBackToHome}
              style={{ 
                padding: '8px 16px', 
                backgroundColor: '#e0e0e0', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Back to Home
            </button>
          )}
          {onNewAssessment && (
            <button 
              onClick={onNewAssessment}
              style={{ 
                padding: '8px 16px', 
                backgroundColor: '#e0e0e0', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              New Assessment
            </button>
          )}
          {!onNewAssessment && (
            <button 
              onClick={onStartOver}
              style={{ 
                padding: '8px 16px', 
                backgroundColor: '#e0e0e0', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Start Over
            </button>
          )}
        </div>
      </div>

      {/* Simple tabs */}
      <div style={{ borderBottom: '1px solid #e0e0e0', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '5px' }}>
          <button 
            onClick={() => setActiveTab('overview')} 
            style={{ 
              padding: '10px 15px',
              backgroundColor: activeTab === 'overview' ? '#f0f0f0' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'overview' ? '2px solid #4a90e2' : 'none',
              fontWeight: activeTab === 'overview' ? 'bold' : 'normal',
              cursor: 'pointer'
            }}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('skills')}
            style={{ 
              padding: '10px 15px',
              backgroundColor: activeTab === 'skills' ? '#f0f0f0' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'skills' ? '2px solid #4a90e2' : 'none',
              fontWeight: activeTab === 'skills' ? 'bold' : 'normal',
              cursor: 'pointer'
            }}
          >
            Skills Analysis
          </button>
          <button 
            onClick={() => setActiveTab('plan')}
            style={{ 
              padding: '10px 15px',
              backgroundColor: activeTab === 'plan' ? '#f0f0f0' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'plan' ? '2px solid #4a90e2' : 'none',
              fontWeight: activeTab === 'plan' ? 'bold' : 'normal',
              cursor: 'pointer'
            }}
          >
            Development Plan
          </button>
          <button 
            onClick={() => setActiveTab('resources')}
            style={{ 
              padding: '10px 15px',
              backgroundColor: activeTab === 'resources' ? '#f0f0f0' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'resources' ? '2px solid #4a90e2' : 'none',
              fontWeight: activeTab === 'resources' ? 'bold' : 'normal',
              cursor: 'pointer'
            }}
          >
            Resources
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div style={{ margin: '20px 0', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        {renderTabContent()}
      </div>

      {/* Footer */}
      <div style={{ marginTop: '30px', textAlign: 'center', padding: '20px', backgroundColor: '#f0f7ff', borderRadius: '8px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Ready to Start Your Journey?</h3>
        <p style={{ margin: '10px 0' }}>Use your personalized plan to build the skills that will make you highly employable in the Nigerian job market.</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '15px' }}>
          <button 
            onClick={handleDownloadReport}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#4a90e2', 
              color: 'white',
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Download Report
          </button>
          <button 
            onClick={onStartOver}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#4caf50', 
              color: 'white',
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Start New Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatResults;