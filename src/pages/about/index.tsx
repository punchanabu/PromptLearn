import React from 'react';
import Layout from '@/components/Layout';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-4">About CourseGen</h1>
        
        {/* Introduction */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Revolutionizing E-Learning</h2>
          <p className="text-lg text-gray-700">
            Our platform is at the forefront of personalized online education, harnessing the power of AI to create a unique learning experience for every user. By integrating the ChatGPT API, we offer tailored courses that adapt to individual learning styles and goals.
          </p>
        </section>

        {/* Features */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
          <ul className="list-disc pl-6 text-lg text-gray-700">
            <li><strong>Customized Learning Paths:</strong> Users set their learning objectives, and our system generates a comprehensive course outline that evolves with their progress.</li>
            <li><strong>Interactive Assignments & Projects:</strong> From essays to coding tasks, our assignments challenge and engage learners at every step.</li>
            <li><strong>Dynamic Quizzes:</strong> Test your knowledge with quizzes crafted by AI, providing instant feedback and reinforcement.</li>
            <li><strong>Progress Tracking:</strong> Visualize your learning journey with our intuitive progress tracking system.</li>
            <li><strong>Adaptive Learning:</strong> The platform adjusts the content and difficulty based on your performance, ensuring an optimal learning pace.</li>
          </ul>
        </section>

        {/* Vision and Mission */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Our Mission and Vision</h2>
          <p className="text-lg text-gray-700">
            We aim to democratize education by making high-quality, personalized learning accessible to everyone. Our vision is to create an e-learning ecosystem that not only educates but also inspires and empowers learners to achieve their full potential.
          </p>
        </section>

        {/* Compliance and Security */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">Commitment to Quality and Security</h2>
          <p className="text-lg text-gray-700">
            We are committed to upholding the highest standards of content quality and data security. Our platform complies with educational standards and prioritizes the privacy of user data.
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default About;
