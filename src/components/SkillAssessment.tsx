import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, AlertCircle, Brain, ArrowRight } from 'lucide-react';
import { AssessmentData, Question, Answer } from '../App';

interface SkillAssessmentProps {
  course: string;
  onComplete: (data: AssessmentData) => void;
}

const SkillAssessment: React.FC<SkillAssessmentProps> = ({ course, onComplete }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    generateQuestions();
  }, [course]);

  const generateQuestions = async () => {
    setLoading(true);
    try {
      // First try to get predefined questions
      const predefinedQuestions = getPredefinedQuestions(course);
      
      if (predefinedQuestions.length > 0) {
        setQuestions(predefinedQuestions);
        setAnswers(predefinedQuestions.map(q => ({ questionId: q.id, answer: 'maybe' as const })));
      } else {
        // Generate questions using AI
        const generatedQuestions = await generateAIQuestions(course);
        setQuestions(generatedQuestions);
        setAnswers(generatedQuestions.map(q => ({ questionId: q.id, answer: 'maybe' as const })));
      }
    } catch (error) {
      console.error('Error generating questions:', error);
      // Fallback to generic questions
      const fallbackQuestions = getGenericQuestions();
      setQuestions(fallbackQuestions);
      setAnswers(fallbackQuestions.map(q => ({ questionId: q.id, answer: 'maybe' as const })));
    } finally {
      setLoading(false);
    }
  };

  const getPredefinedQuestions = (course: string): Question[] => {
    const courseKey = course.toLowerCase();
    
    const predefinedQuestions: { [key: string]: Question[] } = {
      'computer science': [
        { id: '1', question: 'Can you write clean, well-structured code in at least two programming languages?', skill: 'Programming' },
        { id: '2', question: 'Do you understand database design and can work with SQL?', skill: 'Database Management' },
        { id: '3', question: 'Are you familiar with version control systems like Git?', skill: 'Version Control' },
        { id: '4', question: 'Can you design and consume RESTful APIs?', skill: 'API Development' },
        { id: '5', question: 'Do you understand basic algorithms and data structures?', skill: 'Algorithms' },
        { id: '6', question: 'Are you comfortable with debugging and testing code?', skill: 'Testing' },
        { id: '7', question: 'Can you work with cloud platforms like AWS, Azure, or GCP?', skill: 'Cloud Computing' },
        { id: '8', question: 'Do you understand software development methodologies like Agile?', skill: 'Project Management' }
      ],
      'mass communication': [
        { id: '1', question: 'Can you create compelling written content for different audiences?', skill: 'Content Writing' },
        { id: '2', question: 'Are you skilled in digital marketing and social media management?', skill: 'Digital Marketing' },
        { id: '3', question: 'Do you have experience with graphic design tools like Photoshop or Canva?', skill: 'Graphic Design' },
        { id: '4', question: 'Can you conduct research and fact-check information effectively?', skill: 'Research' },
        { id: '5', question: 'Are you comfortable with public speaking and presentations?', skill: 'Public Speaking' },
        { id: '6', question: 'Do you understand media law and ethics?', skill: 'Media Ethics' },
        { id: '7', question: 'Can you use analytics tools to measure content performance?', skill: 'Analytics' },
        { id: '8', question: 'Are you familiar with video editing and multimedia production?', skill: 'Video Production' }
      ],
      'mechanical engineering': [
        { id: '1', question: 'Are you proficient in CAD software like AutoCAD or SolidWorks?', skill: 'CAD Design' },
        { id: '2', question: 'Do you understand thermodynamics and heat transfer principles?', skill: 'Thermodynamics' },
        { id: '3', question: 'Can you perform stress analysis and material selection?', skill: 'Material Science' },
        { id: '4', question: 'Are you familiar with manufacturing processes and quality control?', skill: 'Manufacturing' },
        { id: '5', question: 'Do you have experience with project management tools and methodologies?', skill: 'Project Management' },
        { id: '6', question: 'Can you read and create technical drawings and specifications?', skill: 'Technical Drawing' },
        { id: '7', question: 'Are you familiar with maintenance and troubleshooting of mechanical systems?', skill: 'Maintenance' },
        { id: '8', question: 'Do you understand safety regulations and environmental compliance?', skill: 'Safety & Compliance' }
      ]
    };

    return predefinedQuestions[courseKey] || [];
  };

  const generateAIQuestions = async (course: string): Promise<Question[]> => {
    // This would integrate with the AI API
    // For now, return generic questions
    return getGenericQuestions();
  };

  const getGenericQuestions = (): Question[] => {
    return [
      { id: '1', question: 'Do you have strong written and verbal communication skills?', skill: 'Communication' },
      { id: '2', question: 'Are you proficient in using computers and common software applications?', skill: 'Digital Literacy' },
      { id: '3', question: 'Can you work effectively in teams and collaborate with others?', skill: 'Teamwork' },
      { id: '4', question: 'Do you have experience with project management and meeting deadlines?', skill: 'Project Management' },
      { id: '5', question: 'Are you comfortable with problem-solving and critical thinking?', skill: 'Problem Solving' },
      { id: '6', question: 'Do you have leadership experience or skills?', skill: 'Leadership' },
      { id: '7', question: 'Are you adaptable and open to learning new technologies?', skill: 'Adaptability' },
      { id: '8', question: 'Do you understand basic business and industry practices?', skill: 'Business Acumen' }
    ];
  };

  const handleAnswerChange = (questionId: string, answer: 'yes' | 'no' | 'maybe') => {
    setAnswers(prev => prev.map(a => 
      a.questionId === questionId ? { ...a, answer } : a
    ));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      // Calculate score
      const yesCount = answers.filter(a => a.answer === 'yes').length;
      const maybeCount = answers.filter(a => a.answer === 'maybe').length;
      const score = Math.round(((yesCount * 1 + maybeCount * 0.5) / questions.length) * 100);

      // Get missing skills
      const missingSkills = questions
        .filter(q => {
          const answer = answers.find(a => a.questionId === q.id);
          return answer && answer.answer !== 'yes';
        })
        .map(q => q.skill);

      // Generate recommendations (this would normally call the AI API)
      const recommendations = await generateRecommendations(course, missingSkills);
      const projects = await generateProjects(course, missingSkills);

      const assessmentData: AssessmentData = {
        course,
        questions,
        answers,
        score,
        missingSkills,
        recommendations,
        projects
      };

      onComplete(assessmentData);
    } catch (error) {
      console.error('Error submitting assessment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const generateRecommendations = async (course: string, missingSkills: string[]) => {
    // This would integrate with AI API
    // For now, return static recommendations
    return [
      {
        title: 'Coursera - Professional Certificate',
        description: 'Industry-recognized courses from top universities',
        url: 'https://www.coursera.org',
        provider: 'Coursera'
      },
      {
        title: 'freeCodeCamp',
        description: 'Free coding bootcamp with hands-on projects',
        url: 'https://www.freecodecamp.org',
        provider: 'freeCodeCamp'
      },
      {
        title: 'Khan Academy',
        description: 'Free courses on various subjects',
        url: 'https://www.khanacademy.org',
        provider: 'Khan Academy'
      },
      {
        title: 'YouTube Learning',
        description: 'Free video tutorials and courses',
        url: 'https://www.youtube.com',
        provider: 'YouTube'
      },
      {
        title: 'LinkedIn Learning',
        description: 'Professional development courses',
        url: 'https://www.linkedin.com/learning',
        provider: 'LinkedIn'
      }
    ];
  };

  const generateProjects = async (course: string, missingSkills: string[]) => {
    // This would integrate with AI API
    // For now, return static projects
    return [
      {
        title: 'Personal Portfolio Website',
        description: 'Build a professional website showcasing your skills and projects',
        skills: ['Web Development', 'Design', 'Content Creation'],
        difficulty: 'beginner' as const
      },
      {
        title: 'Industry Analysis Report',
        description: 'Research and analyze trends in your field of study',
        skills: ['Research', 'Analysis', 'Communication'],
        difficulty: 'intermediate' as const
      }
    ];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-16 w-16 text-green-600 mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Generating Your Assessment</h2>
          <p className="text-gray-600">Creating personalized questions for {course}...</p>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const currentAnswer = answers.find(a => a.questionId === currentQ.id)?.answer || 'maybe';
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-600 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
              {currentQ.skill}
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {currentQ.question}
            </h2>
          </div>

          {/* Answer options */}
          <div className="space-y-4">
            {[
              { value: 'yes', label: 'Yes, I have this skill', color: 'green' },
              { value: 'maybe', label: 'Somewhat, but could improve', color: 'yellow' },
              { value: 'no', label: 'No, I need to learn this', color: 'red' }
            ].map((option) => (
              <label
                key={option.value}
                className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  currentAnswer === option.value
                    ? `border-${option.color}-500 bg-${option.color}-50`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQ.id}`}
                  value={option.value}
                  checked={currentAnswer === option.value}
                  onChange={(e) => handleAnswerChange(currentQ.id, e.target.value as 'yes' | 'no' | 'maybe')}
                  className="sr-only"
                />
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  currentAnswer === option.value
                    ? `border-${option.color}-500 bg-${option.color}-500`
                    : 'border-gray-300'
                }`}>
                  {currentAnswer === option.value && (
                    <CheckCircle className="h-4 w-4 text-white" />
                  )}
                </div>
                <span className="text-lg font-medium text-gray-900">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Previous
          </button>

          {currentQuestion < questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <span>Next</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none shadow-lg hover:shadow-xl disabled:shadow-none flex items-center space-x-2"
            >
              <span>{submitting ? 'Analyzing...' : 'Get Results'}</span>
              {!submitting && <ArrowRight className="h-5 w-5" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillAssessment;