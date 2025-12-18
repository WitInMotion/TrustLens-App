
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <i className="fas fa-shield-halved text-white text-xl"></i>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">TrustLens</h1>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-500">
          <a href="#" className="hover:text-blue-600 transition-colors">How it works</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Support</a>
        </div>
        <div className="sm:hidden">
            <button className="text-slate-500 hover:text-blue-600 p-2">
                <i className="fas fa-bars text-lg"></i>
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
