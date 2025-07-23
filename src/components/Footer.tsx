import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-slate-900 text-slate-300 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-32 h-32 border border-emerald-400 rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-24 h-24 border border-indigo-400 rounded-full"></div>
      </div>
      
      <div className="relative max-w-6xl mx-auto px-6 py-12 text-center">
        {/* Social links with enhanced design */}
        <div className="mb-8">
          <h3 className="text-xl font-black text-white mb-6">Connect with the Creator</h3>
          <div className="flex justify-center space-x-6">
            <a 
              href="https://github.com/auwal007" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub Profile"
              className="group relative"
            >
              <div className="w-12 h-12 bg-slate-800 hover:bg-slate-700 rounded-2xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-1 shadow-lg">
                <i className="fab fa-github text-xl text-slate-300 group-hover:text-white"></i>
              </div>
            </a>
            <a 
              href="https://linkedin.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn Profile"
              className="group relative"
            >
              <div className="w-12 h-12 bg-slate-800 hover:bg-blue-600 rounded-2xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-1 shadow-lg">
                <i className="fab fa-linkedin text-xl text-slate-300 group-hover:text-white"></i>
              </div>
            </a>
            <a 
              href="https://twitter.com/m0hammadai" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Twitter Profile"
              className="group relative"
            >
              <div className="w-12 h-12 bg-slate-800 hover:bg-sky-500 rounded-2xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-1 shadow-lg">
                <i className="fab fa-twitter text-xl text-slate-300 group-hover:text-white"></i>
              </div>
            </a>
            <a 
              href="https://medium.com/@muhammad_adam" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Medium Profile"
              className="group relative"
            >
              <div className="w-12 h-12 bg-slate-800 hover:bg-emerald-600 rounded-2xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-1 shadow-lg">
                <i className="fab fa-medium text-xl text-slate-300 group-hover:text-white"></i>
              </div>
            </a>
          </div>
        </div>
        
        {/* Enhanced copyright */}
        <div className="border-t border-slate-700 pt-8">
          <p className="text-slate-400 font-medium">
            &copy; 2025 <span className="text-emerald-400 font-bold">Muhammad Adam</span>. Crafted with ❤️ for Nigerian graduates.
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Empowering careers through AI-driven insights
          </p>
        </div>
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500"></div>
    </footer>
  );
};

export default Footer;
