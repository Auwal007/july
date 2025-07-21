import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 text-center py-8 px-5">
      <div className="mb-4">
        <a 
          href="https://github.com/auwal007" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="GitHub Profile"
          className="text-gray-300 mx-3 text-2xl hover:text-white hover:-translate-y-0.5 transition-all duration-200 inline-block"
        >
          <i className="fab fa-github"></i>
        </a>
        <a 
          href="https://linkedin.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="LinkedIn Profile"
          className="text-gray-300 mx-3 text-2xl hover:text-white hover:-translate-y-0.5 transition-all duration-200 inline-block"
        >
          <i className="fab fa-linkedin"></i>
        </a>
        <a 
          href="https://twitter.com/m0hammadai" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Twitter Profile"
          className="text-gray-300 mx-3 text-2xl hover:text-white hover:-translate-y-0.5 transition-all duration-200 inline-block"
        >
          <i className="fab fa-twitter"></i>
        </a>
        <a 
          href="https://medium.com/@muhammad_adam" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Medium Profile"
          className="text-gray-300 mx-3 text-2xl hover:text-white hover:-translate-y-0.5 transition-all duration-200 inline-block"
        >
          <i className="fab fa-medium"></i>
        </a>
      </div>
      <p className="mt-4 text-sm text-gray-400 mb-0">
        &copy; 2025 Muhammad Adam. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
