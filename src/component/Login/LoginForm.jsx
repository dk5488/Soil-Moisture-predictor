import React from 'react';
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";

function LoginForm({ onSubmit }) {
  // State variables for username and password
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    onSubmit(username, password); // Call the provided onSubmit function with form data
  };

  return (
    <main className="flex justify-center items-center h-screen bg-gray-700">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
        
        {/* Left Side: Image Section */}
        <div className="hidden md:flex w-1/2 bg-green-200 justify-center items-center">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3fa358137b896194ae9469d21523591e7ca76cb6b65592c1c2ca2db663b7e332?placeholderIfAbsent=true&apiKey=cdd4be375e274f5caa50a54b1c2c5464"
            alt="Person with laptop"
            className="object-contain max-w-xs"
          />
        </div>

        {/* Right Side: Form Section */}
        <div className="flex flex-col justify-center w-full md:w-1/2 p-8 bg-slate-500">
          <h2 className="text-3xl font-bold text-center text-gray-200">Login</h2>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <InputField
              label="Your Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-gray-100">Remember me</span>
              </label>
              <a href="#" className="text-sm text-gray-100 hover:underline">Forgot password?</a>
            </div>

            <SubmitButton />

            

            <div className="text-center mt-4">
              <a href="#" className="text-sm text-gray-100 hover:underline">Create an account</a>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default LoginForm;
