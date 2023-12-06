# PromptLearn

## Overview
PromptLearn is an innovative web application designed to generate and organize educational content based on user prompts. It allows users to create customized courses and lessons, offering a personalized learning experience. Built with Next.js, Prisma, and Tailwind CSS, this full-stack application integrates frontend interactivity with backend logic seamlessly.

## Features
- **Dynamic Course Generation**: Create courses and lessons dynamically based on user inputs or prompts.
- **Customizable Learning Experience**: Users can customize courses to fit their learning needs.
- **User Authentication**: Secure registration and login functionality for a personalized experience.
- **Interactive UI**: A user-friendly interface built with Next.js and styled with Tailwind CSS.
- **API Integration**: Backend API routes for managing courses, lessons, and user interactions.

## Getting Started

### Prerequisites
- Node.js
- npm or yarn
- A running instance of MongoDB (for Prisma)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/punchanabu/PromptLearn.git
   cd PromptLearn
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up your environment variables:
   - Create a `.env` file in the root directory.
   - Add database credentials and other necessary configurations.

4. Run the Prisma migrations (optional):
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage
- **Creating a Course**: Navigate to the course creation page and enter your desired prompts to generate course content.
- **Browsing Courses**: Explore available courses and lessons on the dashboard.
- **User Registration and Login**: Sign up for a personalized experience and manage your courses.

## License
This project is licensed under the [MIT License](LICENSE).

## Acknowledgements
- OpenAI for content generation APIs
- Next.js, Prisma, and Tailwind CSS for the core technologies

