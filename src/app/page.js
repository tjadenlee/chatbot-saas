import Chatbot from '../components/Chatbot';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Lead Capture Chatbot
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Convert website visitors into qualified leads 24/7 with our intelligent chatbot
          </p>
        </div>
        
        <div className="flex justify-center">
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
              <h3 className="font-semibold text-lg mb-2">Easy Integration</h3>
              <p className="text-gray-600">Works with your existing CRM and marketing tools</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}