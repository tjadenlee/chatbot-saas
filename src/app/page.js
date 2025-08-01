import Chatbot from '../components/Chatbot';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Lead Capture Chatbot
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Convert website visitors into qualified leads 24/7 with our intelligent chatbot
          </p>
          
          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <Link 
              href="/dashboard"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              📊 Dashboard
            </Link>
            <Link 
              href="/train"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              🎓 Train Your Chatbot
            </Link>
            <Link 
              href="#demo"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              💬 Try Demo
            </Link>
          </div>
        </div>
        
        <div id="demo" className="flex justify-center">
          <Chatbot />
        </div>
        
        <div className="mt-12 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">24/7 Availability</h3>
              <p className="text-gray-600">Never miss a lead with round-the-clock customer engagement</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Smart Qualification</h3>
              <p className="text-gray-600">AI-powered lead scoring and automatic appointment booking</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Custom Training</h3>
              <p className="text-gray-600">Upload your documents to create a business-specific AI expert</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}