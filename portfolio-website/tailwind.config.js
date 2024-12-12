import forms from '@tailwindcss/forms'; // Import plugins in ES module syntax

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // Include your pages directory
    "./components/**/*.{js,ts,jsx,tsx}", // Include your components directory
    "./app/**/*.{js,ts,jsx,tsx}", // Include app directory if applicable
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#4A90E2', // Custom blue for gradients
        'custom-green': '#28A745', // Custom green for potential buttons or accents
        'gray-800': '#2D3748', // Adjusted gray for dark backgrounds
        'gray-700': '#4A5568', // Adjusted gray for background hover effects
        'blue-500': '#4A90E2', // Custom blue used in your CSS for loading bar and hover
      },
      spacing: {
        '128': '32rem', // Example of custom spacing for layouts if needed
      },
      animation: {
        pulse: 'pulse 2s infinite', // Your custom pulse animation
      },
      keyframes: {
        pulse: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      boxShadow: {
        default: '0 0 20px rgba(74, 144, 226, 0.5)', // Custom shadow for .bg-gray-700
      },
    },
  },
  plugins: [
    forms, // Use the imported plugin
  ],
};
