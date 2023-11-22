import Image from 'next/image';
import { Inter } from 'next/font/google';
import Layout from '@/components/Layout';
const inter = Inter({ subsets: ['latin'] });

export default function HomePage() {
  return (
    <Layout>
      <div className={`flex flex-col min-h-screen justify-between p-16 bg-white text-gray-800 ${inter.className}`}>


        {/* Main Content Section */}
        <main className="flex flex-col items-center justify-center mt-16">
          {/* Welcome Message */}
          <h1 className="text-4xl font-mono font-semibold mb-6 ">Welcome to the CourseGen</h1>
          <p className="max-w-prose text-lg text-center mb-8 font-mono">Create custom courses and lessons with the power of ChatGPT.</p>

          {/* Call to Action Button */}
          <a href="/courses/create" className="bg-blue-500  hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-xl transition duration-300 ease-in-out transform hover:scale-105">
            Get Started
          </a>
        </main>

        {/* Feature Section */}
        <section className="mt-16 grid grid-cols-1 space-x-2 gap-4 text-center lg:max-w-5xl lg:w-full lg:grid-cols-3 lg:text-left font-mono">
          {/* Feature Cards */}
          <div className="feature-card space-y-2">
            <h2 className='text-xl font-bold'>User Input for Learning Goals</h2>
            <p>
              Users can start by typing in what they want to learn. The system could ask follow-up questions to understand their current knowledge level and specific interests within the topic.
            </p>
          </div>
          <div className="feature-card space-y-2">
            <h2 className='text-xl font-bold'>Generating a Customized Course Outline</h2>
            <p>
              Based on the input, ChatGPT can generate a course outline, including key topics, recommended reading materials, and a timeline.
            </p>
          </div>
          <div className="feature-card space-y-2">
            <h2 className='text-xl font-bold'>Creating Assignments and Projects</h2>
            <p>
              For each topic, the system can create assignments or projects. These could range from writing essays to practical coding tasks, depending on the subject.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16">
          <p>&copy; {new Date().getFullYear()} CourseGen. All rights reserved.</p>
        </footer>
      </div>
    </Layout>
  );
}
