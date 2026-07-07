

const ContactPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div  className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-3xl font-bold mb-4">Contact Me</h1>
          <p className="mb-2">Email: <a href="mailto:jonathan.okana@example.com" className="text-blue-500 hover:underline">
              jonathan.okana@example.com
          </a></p>
          <p className="mb-2">Phone: <a href="tel:+15551234567" className="text-blue-500 hover:underline">
              +1 (555) 123-4567
          </a></p>
        </div>
        <div  className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mt-6">
          <form  >
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
              <input type="text" id="name" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
              <input type="email" id="email" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea id="message" rows="4" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Send Message
            </button>
          </form>
        </div>
    </div>
  );
}

export default ContactPage;

