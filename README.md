# 🎓 SkillBridge AI – 3MTT Knowledge Showcase (July 2025 - Edition)

## **Project Creator**

**Name**: Muhammad Adam Isma'il

**3MTT ID**: FE/23/74562980

**3MTT Learning Track**: Data Science

**Cohort**: 3

**Location**: Jos, Plateau State.

## Project Live Demo

👉 **[Click here to try the deployed AI platform](https://skillbridgeai.netlify.app/)**

---

This repository presents an AI-powered solution developed for the **3MTT Knowledge Showcase – July Edition**, under the **AI-Powered Solutions** category. It uses advanced conversational AI to **assess career readiness** of Nigerian graduates, showcasing how AI can bridge the gap between **education and employment** through personalized skill analysis, gap identification, and career development planning.

👉 **[Click here to try the deployed AI platform](https://skillbridgeai.netlify.app/)**

---

## 🎓 Project Description

This project implements an intelligent conversational AI system that conducts personalized career assessments for Nigerian graduates. It includes a trained AI model and a web application built with React and Flask to provide an intuitive interface for career evaluation and development planning.

The goal is to demonstrate the application of AI in career development for better graduate employability, skill optimization, and job market alignment in Nigeria.

---

## AI in Career Development and Nigerian Graduate Employability

Graduate unemployment is a significant challenge in Nigeria. Factors such as skill-job misalignment, lack of practical experience, inadequate career guidance, and disconnect between academic curriculum and industry needs contribute to high unemployment rates among Nigerian graduates.

Artificial Intelligence, particularly through conversational career assessment tools, offers a powerful approach to address these issues. By providing personalized analysis of graduate skills and career potential, AI enables:

- **Personalized Skill Assessment**: Deep understanding of individual graduate capabilities through intelligent conversations
- **Gap Identification**: Precise identification of missing skills required for employment in specific fields
- **Tailored Development Plans**: Custom learning paths and project recommendations based on individual needs
- **Market Alignment**: Insights into Nigerian job market demands and opportunities
- **Career Clarity**: Helping graduates understand their potential and optimal career paths

👉 **[Click here to try the deployed AI platform](https://skillbridgeai.netlify.app/)**

> ⚠️ **Note**: This is a comprehensive demo project. A real-world robust career assessment system would benefit from integration with:
> - Live job market data APIs
> - University partnership systems
> - Employer feedback mechanisms
> - Continuous learning algorithms
> - Regional economic indicators
> - Industry-specific skill databases

This demo serves as a **proof-of-concept** for the valuable role AI can play in building a more employable workforce for Nigeria.

---

## 🎯 3MTT Knowledge Showcase (July Edition) Context

- **Category**: AI-Powered Solutions  
- **Objective**: Build and showcase a project utilizing AI to solve a real-world problem  
- **Submission**: Hosted on GitHub with live demo showcasing conversational AI in action for career assessment

---

## 📁 Files in this Repository

### **Backend (Flask API)**
- **`backend/app.py`**: Flask-based API server with AI integration and career assessment logic
- **`backend/requirements.txt`**: Python dependencies for the backend server

### **Frontend (React Application)**
- **`src/`**: React application directory containing:
  - `src/App.tsx`: Main application component and routing logic
  - `src/components/`: React components for different application features
    - `Homepage.tsx`: Landing page with compelling call-to-action
    - `CourseInput.tsx`: Course selection interface
    - `AIChat.tsx`: Conversational AI assessment interface
    - `ChatResults.tsx`: Comprehensive results and recommendations display
  - `src/index.css`: Global styling with Tailwind CSS

### **Configuration Files**
- **`package.json`**: Node.js dependencies and scripts
- **`vite.config.ts`**: Vite build configuration
- **`tailwind.config.js`**: Tailwind CSS configuration
- **`tsconfig.json`**: TypeScript configuration

---

## 🤖 AI System Architecture

### **Conversational AI Pipeline**:
1. **Natural Language Processing**: Understanding graduate responses and extracting meaningful information
2. **Contextual Analysis**: Analyzing conversation patterns, confidence levels, and skill indicators
3. **Skill Mapping**: Mapping mentioned experiences to industry-required competencies
4. **Gap Analysis**: Identifying missing skills and improvement areas
5. **Recommendation Engine**: Generating personalized development plans and resources

### **Assessment Phases**:
1. **Introduction**: Understanding background and motivation
2. **Exploration**: Deep dive into skills and experiences
3. **Deep Analysis**: Identifying strengths and weaknesses
4. **Synthesis**: Comprehensive assessment and planning

---

## 🚀 How to Run the Application

### **Backend Setup**:
```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Set environment variables
export KIMI_API_KEY=your_openrouter_api_key

# Run the Flask server
python run.py
```

### **Frontend Setup**:
```bash
# Install Node.js dependencies
npm install

# Start the development server
npm run dev
```

- Once both servers start, open your web browser and navigate to `http://localhost:5173` for the React frontend
- The Flask API runs on `http://localhost:5000`

---

## 🔢 Data Required for Assessment

The AI assessment system processes:

1. **Course of Study**: Graduate's field of study (selected from comprehensive list)
2. **Academic Background**: Educational experiences and achievements
3. **Practical Experience**: Projects, internships, and work experience
4. **Skills Inventory**: Technical and soft skills possessed
5. **Career Aspirations**: Goals and preferred career paths
6. **Challenges**: Identified obstacles and concerns

### **Assessment Output**:
- **Skill Analysis**: Current skills, missing skills, strength areas
- **Employability Score**: Quantified career readiness (0-100)
- **Personalized Plan**: Short-term, medium-term, and long-term goals
- **Resources**: Curated learning materials and project ideas
- **Market Insights**: Nigerian job market alignment and opportunities


---

## 🙏 Acknowledgements

**3MTT Initiative** - For providing the platform to showcase AI innovation for social good

**OpenRouter & DeepSeek** - For advanced AI capabilities that power the conversational assessment

**Nigerian Graduates** - The inspiration and target audience for this transformative solution

---

Made with ❤️ to showcase how AI can bridge the education-employment gap and empower Nigerian graduates for career success.
