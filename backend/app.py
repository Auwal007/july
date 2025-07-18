from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import requests
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configuration
KIMI_API_KEY = os.getenv('KIMI_API_KEY', 'your-kimi-api-key-here')
KIMI_API_BASE = 'https://api.moonshot.cn/v1'

# Predefined course data
COURSE_DATA = {
    'computer_science': {
        'skills': [
            'Programming', 'Database Management', 'Version Control', 'API Development',
            'Algorithms', 'Testing', 'Cloud Computing', 'Project Management'
        ],
        'questions': [
            {
                'id': '1',
                'question': 'Can you write clean, well-structured code in at least two programming languages?',
                'skill': 'Programming'
            },
            {
                'id': '2',
                'question': 'Do you understand database design and can work with SQL?',
                'skill': 'Database Management'
            },
            {
                'id': '3',
                'question': 'Are you familiar with version control systems like Git?',
                'skill': 'Version Control'
            },
            {
                'id': '4',
                'question': 'Can you design and consume RESTful APIs?',
                'skill': 'API Development'
            },
            {
                'id': '5',
                'question': 'Do you understand basic algorithms and data structures?',
                'skill': 'Algorithms'
            },
            {
                'id': '6',
                'question': 'Are you comfortable with debugging and testing code?',
                'skill': 'Testing'
            },
            {
                'id': '7',
                'question': 'Can you work with cloud platforms like AWS, Azure, or GCP?',
                'skill': 'Cloud Computing'
            },
            {
                'id': '8',
                'question': 'Do you understand software development methodologies like Agile?',
                'skill': 'Project Management'
            }
        ]
    },
    'mass_communication': {
        'skills': [
            'Content Writing', 'Digital Marketing', 'Graphic Design', 'Research',
            'Public Speaking', 'Media Ethics', 'Analytics', 'Video Production'
        ],
        'questions': [
            {
                'id': '1',
                'question': 'Can you create compelling written content for different audiences?',
                'skill': 'Content Writing'
            },
            {
                'id': '2',
                'question': 'Are you skilled in digital marketing and social media management?',
                'skill': 'Digital Marketing'
            },
            {
                'id': '3',
                'question': 'Do you have experience with graphic design tools like Photoshop or Canva?',
                'skill': 'Graphic Design'
            },
            {
                'id': '4',
                'question': 'Can you conduct research and fact-check information effectively?',
                'skill': 'Research'
            },
            {
                'id': '5',
                'question': 'Are you comfortable with public speaking and presentations?',
                'skill': 'Public Speaking'
            },
            {
                'id': '6',
                'question': 'Do you understand media law and ethics?',
                'skill': 'Media Ethics'
            },
            {
                'id': '7',
                'question': 'Can you use analytics tools to measure content performance?',
                'skill': 'Analytics'
            },
            {
                'id': '8',
                'question': 'Are you familiar with video editing and multimedia production?',
                'skill': 'Video Production'
            }
        ]
    },
    'mechanical_engineering': {
        'skills': [
            'CAD Design', 'Thermodynamics', 'Material Science', 'Manufacturing',
            'Project Management', 'Technical Drawing', 'Maintenance', 'Safety & Compliance'
        ],
        'questions': [
            {
                'id': '1',
                'question': 'Are you proficient in CAD software like AutoCAD or SolidWorks?',
                'skill': 'CAD Design'
            },
            {
                'id': '2',
                'question': 'Do you understand thermodynamics and heat transfer principles?',
                'skill': 'Thermodynamics'
            },
            {
                'id': '3',
                'question': 'Can you perform stress analysis and material selection?',
                'skill': 'Material Science'
            },
            {
                'id': '4',
                'question': 'Are you familiar with manufacturing processes and quality control?',
                'skill': 'Manufacturing'
            },
            {
                'id': '5',
                'question': 'Do you have experience with project management tools and methodologies?',
                'skill': 'Project Management'
            },
            {
                'id': '6',
                'question': 'Can you read and create technical drawings and specifications?',
                'skill': 'Technical Drawing'
            },
            {
                'id': '7',
                'question': 'Are you familiar with maintenance and troubleshooting of mechanical systems?',
                'skill': 'Maintenance'
            },
            {
                'id': '8',
                'question': 'Do you understand safety regulations and environmental compliance?',
                'skill': 'Safety & Compliance'
            }
        ]
    }
}

def normalize_course_name(course_name):
    """Normalize course name to match predefined data keys"""
    return course_name.lower().replace(' ', '_').replace('-', '_')

def call_kimi_api(prompt):
    """Call Kimi AI API"""
    try:
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {KIMI_API_KEY}'
        }
        
        data = {
            'model': 'moonshot-v1-8k',
            'messages': [
                {'role': 'user', 'content': prompt}
            ],
            'temperature': 0.7
        }
        
        response = requests.post(
            f'{KIMI_API_BASE}/chat/completions',
            headers=headers,
            json=data,
            timeout=30
        )
        
        if response.status_code == 200:
            return response.json()['choices'][0]['message']['content']
        else:
            print(f"API Error: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        print(f"Error calling Kimi API: {str(e)}")
        return None

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

@app.route('/api/courses', methods=['GET'])
def get_courses():
    """Get list of supported courses"""
    courses = [
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
    ]
    return jsonify({'courses': courses})

@app.route('/api/questions', methods=['POST'])
def get_questions():
    """Get assessment questions for a course"""
    try:
        data = request.json
        course = data.get('course', '').strip()
        
        if not course:
            return jsonify({'error': 'Course is required'}), 400
        
        # Check if we have predefined questions
        course_key = normalize_course_name(course)
        if course_key in COURSE_DATA:
            questions = COURSE_DATA[course_key]['questions']
            return jsonify({'questions': questions, 'source': 'predefined'})
        
        # Generate questions using AI
        prompt = f"""
        Generate 8 yes/no skill assessment questions for a {course} graduate to evaluate their employability in the Nigerian job market.
        
        Each question should:
        1. Be specific to skills needed in {course}
        2. Be answerable with yes/no/maybe
        3. Focus on practical, job-relevant skills
        4. Be clear and concise
        
        Return the response as a JSON array with this format:
        [
            {{
                "id": "1",
                "question": "Question text here?",
                "skill": "Skill name"
            }},
            ...
        ]
        
        Focus on technical skills, soft skills, and industry-specific knowledge that employers in Nigeria would look for.
        """
        
        ai_response = call_kimi_api(prompt)
        if ai_response:
            try:
                # Try to parse the AI response as JSON
                questions = json.loads(ai_response)
                return jsonify({'questions': questions, 'source': 'ai'})
            except json.JSONDecodeError:
                # If parsing fails, return generic questions
                pass
        
        # Fallback to generic questions
        generic_questions = [
            {
                'id': '1',
                'question': 'Do you have strong written and verbal communication skills?',
                'skill': 'Communication'
            },
            {
                'id': '2',
                'question': 'Are you proficient in using computers and common software applications?',
                'skill': 'Digital Literacy'
            },
            {
                'id': '3',
                'question': 'Can you work effectively in teams and collaborate with others?',
                'skill': 'Teamwork'
            },
            {
                'id': '4',
                'question': 'Do you have experience with project management and meeting deadlines?',
                'skill': 'Project Management'
            },
            {
                'id': '5',
                'question': 'Are you comfortable with problem-solving and critical thinking?',
                'skill': 'Problem Solving'
            },
            {
                'id': '6',
                'question': 'Do you have leadership experience or skills?',
                'skill': 'Leadership'
            },
            {
                'id': '7',
                'question': 'Are you adaptable and open to learning new technologies?',
                'skill': 'Adaptability'
            },
            {
                'id': '8',
                'question': 'Do you understand basic business and industry practices?',
                'skill': 'Business Acumen'
            }
        ]
        
        return jsonify({'questions': generic_questions, 'source': 'generic'})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/assess', methods=['POST'])
def assess_skills():
    """Assess skills and generate recommendations"""
    try:
        data = request.json
        course = data.get('course', '').strip()
        answers = data.get('answers', [])
        questions = data.get('questions', [])
        
        if not all([course, answers, questions]):
            return jsonify({'error': 'Course, answers, and questions are required'}), 400
        
        # Calculate score
        yes_count = sum(1 for answer in answers if answer.get('answer') == 'yes')
        maybe_count = sum(1 for answer in answers if answer.get('answer') == 'maybe')
        total_questions = len(questions)
        
        score = round(((yes_count * 1 + maybe_count * 0.5) / total_questions) * 100)
        
        # Get missing skills
        missing_skills = []
        for question in questions:
            question_id = question.get('id')
            answer = next((a for a in answers if a.get('questionId') == question_id), None)
            if answer and answer.get('answer') != 'yes':
                missing_skills.append(question.get('skill'))
        
        # Generate recommendations using AI
        recommendations = generate_recommendations(course, missing_skills)
        projects = generate_projects(course, missing_skills)
        
        result = {
            'score': score,
            'missing_skills': missing_skills,
            'recommendations': recommendations,
            'projects': projects,
            'summary': get_score_summary(score)
        }
        
        return jsonify(result)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def generate_recommendations(course, missing_skills):
    """Generate learning recommendations"""
    # Use AI to generate personalized recommendations
    prompt = f"""
    Generate 5 free online learning recommendations for a {course} graduate who needs to improve these skills: {', '.join(missing_skills)}.
    
    Focus on:
    1. Free or low-cost resources
    2. Reputable platforms and providers
    3. Practical, hands-on learning
    4. Resources available to Nigerian students
    
    Return as JSON array with format:
    [
        {{
            "title": "Course/Resource Title",
            "description": "Brief description of what they'll learn",
            "url": "https://example.com",
            "provider": "Platform name"
        }},
        ...
    ]
    """
    
    ai_response = call_kimi_api(prompt)
    if ai_response:
        try:
            return json.loads(ai_response)
        except json.JSONDecodeError:
            pass
    
    # Fallback recommendations
    return [
        {
            'title': 'Coursera - Professional Certificate',
            'description': 'Industry-recognized courses from top universities',
            'url': 'https://www.coursera.org',
            'provider': 'Coursera'
        },
        {
            'title': 'freeCodeCamp',
            'description': 'Free coding bootcamp with hands-on projects',
            'url': 'https://www.freecodecamp.org',
            'provider': 'freeCodeCamp'
        },
        {
            'title': 'Khan Academy',
            'description': 'Free courses on various subjects',
            'url': 'https://www.khanacademy.org',
            'provider': 'Khan Academy'
        },
        {
            'title': 'YouTube Learning',
            'description': 'Free video tutorials and courses',
            'url': 'https://www.youtube.com',
            'provider': 'YouTube'
        },
        {
            'title': 'LinkedIn Learning',
            'description': 'Professional development courses',
            'url': 'https://www.linkedin.com/learning',
            'provider': 'LinkedIn'
        }
    ]

def generate_projects(course, missing_skills):
    """Generate project recommendations"""
    # Use AI to generate project ideas
    prompt = f"""
    Generate 2 mini project ideas for a {course} graduate to practice these skills: {', '.join(missing_skills)}.
    
    Projects should be:
    1. Practical and achievable
    2. Relevant to the Nigerian job market
    3. Portfolio-worthy
    4. Skill-building focused
    
    Return as JSON array with format:
    [
        {{
            "title": "Project Title",
            "description": "What the project involves and what they'll learn",
            "skills": ["Skill1", "Skill2", "Skill3"],
            "difficulty": "beginner" | "intermediate" | "advanced"
        }},
        ...
    ]
    """
    
    ai_response = call_kimi_api(prompt)
    if ai_response:
        try:
            return json.loads(ai_response)
        except json.JSONDecodeError:
            pass
    
    # Fallback projects
    return [
        {
            'title': 'Personal Portfolio Website',
            'description': 'Build a professional website showcasing your skills and projects',
            'skills': ['Web Development', 'Design', 'Content Creation'],
            'difficulty': 'beginner'
        },
        {
            'title': 'Industry Analysis Report',
            'description': 'Research and analyze trends in your field of study',
            'skills': ['Research', 'Analysis', 'Communication'],
            'difficulty': 'intermediate'
        }
    ]

def get_score_summary(score):
    """Get score summary message"""
    if score >= 80:
        return "Excellent! You're well-prepared for the job market."
    elif score >= 60:
        return "Good foundation! A few improvements will make you more competitive."
    else:
        return "There's room for growth. Focus on developing key skills to improve your employability."

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)