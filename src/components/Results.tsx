import React from 'react';
import { TrendingUp, BookOpen, Code, Download, RotateCcw, ExternalLink, Award, AlertTriangle } from 'lucide-react';
import { AssessmentData } from '../App';

interface ResultsProps {
  assessmentData: AssessmentData;
  onStartOver: () => void;
}

const Results: React.FC<ResultsProps> = ({ assessmentData, onStartOver }) => {
  const { course, score, missingSkills, recommendations, projects } = assessmentData;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'from-green-600 to-green-700';
    if (score >= 60) return 'from-yellow-600 to-yellow-700';
    return 'from-red-600 to-red-700';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return 'Excellent! You\'re well-prepared for the job market.';
    if (score >= 60) return 'Good foundation! A few improvements will make you more competitive.';
    return 'There\'s room for growth. Focus on developing key skills to improve your employability.';
  };

  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF
    const content = `
SkillBridge AI Assessment Results

Course: ${course}
Employability Score: ${score}%

${getScoreMessage(score)}

Skills to Improve:
${missingSkills.map(skill => `• ${skill}`).join('\n')}

Recommended Resources:
${recommendations.map(rec => `• ${rec.title} - ${rec.description}`).join('\n')}

Project Ideas:
${projects.map(project => `• ${project.title} - ${project.description}`).join('\n')}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `skillbridge-assessment-${course.replace(/\s+/g, '-').toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Award className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Assessment Results
          </h1>
          <p className="text-xl text-gray-600">
            Based on your {course} background
          </p>
        </div>

        {/* Score Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r ${getScoreBackground(score)} text-white mb-4`}>
              <span className="text-4xl font-bold">{score}%</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Employability Score
            </h2>
            <p className={`text-lg font-semibold ${getScoreColor(score)}`}>
              {getScoreMessage(score)}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Readiness</span>
              <span className="text-sm font-medium text-gray-700">{score}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`bg-gradient-to-r ${getScoreBackground(score)} h-3 rounded-full transition-all duration-1000`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        </div>

        {/* Skills to Improve */}
        {missingSkills.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center mb-6">
              <AlertTriangle className="h-8 w-8 text-yellow-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Skills to Improve</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {missingSkills.map((skill, index) => (
                <div key={index} className="flex items-center p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                  <span className="font-medium text-gray-900">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Recommended Learning Resources</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {recommendations.map((rec, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{rec.title}</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {rec.provider}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{rec.description}</p>
                <a
                  href={rec.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Visit Course
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Project Ideas */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <Code className="h-8 w-8 text-purple-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Mini Project Ideas</h2>
          </div>
          <div className="space-y-6">
            {projects.map((project, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    project.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                    project.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {project.difficulty}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleDownloadPDF}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <Download className="h-5 w-5" />
            <span>Download Results</span>
          </button>
          
          <button
            onClick={onStartOver}
            className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <RotateCcw className="h-5 w-5" />
            <span>Start Over</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;