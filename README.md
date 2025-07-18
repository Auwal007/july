# SkillBridge AI

An intelligent career assessment platform designed specifically for Nigerian graduates to evaluate their employability and receive personalized skill development recommendations.

## Features

- **Course-Specific Assessment**: Tailored questions based on your field of study
- **AI-Powered Analysis**: Uses Kimi K2 AI model for intelligent skill gap analysis
- **Personalized Recommendations**: Get curated learning resources and project ideas
- **Instant Results**: No signup required, get immediate feedback
- **Mobile-Responsive**: Works seamlessly on all devices
- **PDF Export**: Download your assessment results

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Vite for build tooling

### Backend
- Python Flask
- Flask-CORS for cross-origin requests
- Kimi K2 AI API integration
- RESTful API design

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8 or higher
- Kimi API key (from Moonshot AI)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd skillbridge-ai
   ```

2. **Setup Frontend**
   ```bash
   npm install
   ```

3. **Setup Backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   cp .env.example .env
   ```

4. **Configure Environment Variables**
   Edit `backend/.env` and add your Kimi API key:
   ```
   KIMI_API_KEY=your-actual-api-key-here
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   python run.py
   ```
   The backend will run on `http://localhost:5000`

2. **Start the Frontend Development Server**
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

## API Endpoints

### GET `/api/health`
Health check endpoint

### GET `/api/courses`
Get list of supported courses

### POST `/api/questions`
Get assessment questions for a specific course
```json
{
  "course": "Computer Science"
}
```

### POST `/api/assess`
Submit assessment answers and get results
```json
{
  "course": "Computer Science",
  "questions": [...],
  "answers": [...]
}
```

## Course Support

The app supports both predefined courses and AI-generated assessments for any course:

### Predefined Courses (with optimized questions):
- Computer Science
- Mass Communication
- Mechanical Engineering

### AI-Generated Assessments:
- Any other course of study
- Dynamically generated questions based on course requirements

## Features in Detail

### 1. Dynamic Question Generation
- Predefined questions for popular courses
- AI-generated questions for any course
- Context-aware and industry-specific

### 2. Intelligent Scoring
- Weighted scoring system (Yes=1, Maybe=0.5, No=0)
- Percentage-based employability score
- Skill gap identification

### 3. Personalized Recommendations
- AI-curated learning resources
- Free and accessible materials
- Nigerian job market focused

### 4. Project Suggestions
- Hands-on project ideas
- Skill-building focused
- Portfolio development

### 5. Export Functionality
- Download results as text file
- Shareable format
- Complete assessment summary

## Development

### Project Structure
```
skillbridge-ai/
├── src/
│   ├── components/
│   │   ├── Homepage.tsx
│   │   ├── CourseInput.tsx
│   │   ├── SkillAssessment.tsx
│   │   └── Results.tsx
│   ├── App.tsx
│   └── main.tsx
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── run.py
└── README.md
```

### Key Components

- **Homepage**: Landing page with app introduction
- **CourseInput**: Course selection interface
- **SkillAssessment**: Interactive questionnaire
- **Results**: Assessment results and recommendations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Moonshot AI for the Kimi K2 API
- Nigerian graduate community for inspiration
- Open source learning platforms for resource recommendations