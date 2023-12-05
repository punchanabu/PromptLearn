  import Image from 'next/image';
  import { Inter } from 'next/font/google';
  import Layout from '@/components/Layout';
  const inter = Inter({ subsets: ['latin'] });

  export default function HomePage() {
    return (
      <Layout>
        <div className={`flex flex-col justify-between text-white ${inter.className} bg-gray-800`}>


          {/* Main Content Section */}
          <main className="flex flex-col items-center justify-center mt-16">
            {/* Welcome Message */}
            <h1 className="text-4xl  font-semibold mb-6 text-white">Welcome to the CourseGen</h1>
            <p className="max-w-prose text-lg text-center mb-8 text-white">Create custom courses and lessons with the power of ChatGPT.</p>

            {/* Call to Action Button */}
            <a href="/courses/create" className="bg-blue-500 text-xl hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-xl transition duration-300 ease-in-out transform hover:scale-105">
              Get Started
            </a>
          </main>

          {/* Feature Section */}
          <section className="mt-16 grid grid-cols-1 gap-6 text-center lg:max-w-5xl lg:w-full lg:grid-cols-3 lg:text-left">
            <div className="feature-card space-y-4 shadow-md p-8 rounded-xl bg-gray-700 hover:bg-gray-600 transition-colors duration-300">
              <div className="flex items-center space-x-1 justify-center lg:justify-start">
                <i className="fa-solid fa-graduation-cap text-xl text-blue-500 mr-2"></i>
                <h2 className='text-xl font-bold'>User Input for Learning Goals</h2>
              </div>
              <p>
                Users can start by typing in what they want to learn. The system could ask follow-up questions to understand their current knowledge level and specific interests within the topic.
              </p>
            </div>

            <div className="feature-card space-y-4 shadow-md p-8 rounded-xl bg-gray-700 hover:bg-gray-600 transition-colors duration-300">
              <div className="flex items-center space-x-1 justify-center lg:justify-start">
                <i className="fa-solid fa-chart-line text-xl text-green-500 mr-2 "></i>
                <h2 className='text-xl font-bold'>Generating a Customized Course Outline</h2>
              </div>
              <p>
                Based on the input, ChatGPT can generate a course outline, including key topics, recommended reading materials, and a timeline.
              </p>
            </div>

            <div className="feature-card space-y-4 shadow-md p-8 rounded-xl bg-gray-700 hover:bg-gray-600 transition-colors duration-300">
              <div className="flex items-center space-x-1 justify-center lg:justify-start">
                <i className="fa-solid fa-tasks text-xl text-purple-500 mr-2"></i>
                <h2 className='text-xl font-bold'>Creating Assignments and Projects</h2>
              </div>
              <p>
                For each topic, the system can create assignments or projects. These could range from writing essays to practical coding tasks, depending on the subject.
              </p>
            </div>
          </section>
  
        </div>
      </Layout>
    );
  }
