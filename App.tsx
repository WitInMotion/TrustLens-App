
import React, { useState } from 'react';
import Header from './components/Header';
import { analyzeContent } from './services/geminiService';
import { AssessmentResult } from './types';
import ResultDisplay from './components/ResultDisplay';

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [imageFile, setImageFile] = useState<{data: string, type: string} | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError("Please upload an image file (PNG, JPG, etc.)");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = (event.target?.result as string).split(',')[1];
        setImageFile({ data: base64, type: file.type });
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!inputText.trim() && !imageFile) {
      setError("Please provide some text or an image of the content to analyze.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const analysis = await analyzeContent({
        text: inputText,
        imageData: imageFile?.data,
        mimeType: imageFile?.type
      });
      setResult(analysis);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setInputText('');
    setImageFile(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 pb-12">
      <Header />

      <main className="flex-grow max-w-5xl mx-auto px-4 py-8 w-full">
        {/* Welcome Section */}
        {!result && (
          <div className="text-center mb-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-800 sm:text-4xl">
              Is that message <span className="text-blue-600 underline decoration-blue-200 underline-offset-4">suspicious?</span>
            </h2>
            <p className="text-lg text-slate-500">
              Paste suspicious emails, SMS, or upload a screenshot. TrustLens helps small businesses spot fraud before it happens.
            </p>
          </div>
        )}

        {result ? (
          <ResultDisplay result={result} onReset={reset} />
        ) : (
          <div className="grid gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6">
              {/* Text Input Area */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Option 1: Paste Text Content
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste the email content, SMS message, or link details here..."
                  className="w-full min-h-[160px] p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none text-slate-800 placeholder:text-slate-400"
                ></textarea>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-200"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-widest text-slate-400 font-bold">
                  <span className="bg-white px-3">Or</span>
                </div>
              </div>

              {/* Image Upload Area */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Option 2: Upload Screenshot
                </label>
                <div className="flex items-center gap-4">
                  <div className={`flex-grow relative h-32 flex flex-col items-center justify-center border-2 border-dashed rounded-xl transition-all ${imageFile ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-slate-400 bg-slate-50'}`}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    {imageFile ? (
                      <div className="text-center">
                        <i className="fas fa-image text-blue-600 text-2xl mb-1"></i>
                        <p className="text-sm font-medium text-blue-700">Image selected</p>
                      </div>
                    ) : (
                      <div className="text-center text-slate-400">
                        <i className="fas fa-cloud-arrow-up text-2xl mb-1"></i>
                        <p className="text-sm">Click or drag image here</p>
                      </div>
                    )}
                  </div>
                  {imageFile && (
                    <button 
                        onClick={() => setImageFile(null)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Remove image"
                    >
                        <i className="fas fa-trash-can text-lg"></i>
                    </button>
                  )}
                </div>
              </div>

              {error && (
                <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl flex items-start gap-3 text-sm font-medium">
                  <i className="fas fa-circle-exclamation mt-0.5"></i>
                  <p>{error}</p>
                </div>
              )}

              <button
                disabled={isLoading}
                onClick={handleAnalyze}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2 ${
                  isLoading 
                    ? 'bg-slate-300 cursor-not-allowed text-slate-500' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-[0.98]'
                }`}
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-circle-notch fa-spin"></i>
                    Analyzing for Threats...
                  </>
                ) : (
                  <>
                    <i className="fas fa-magnifying-glass"></i>
                    Assess Content Safety
                  </>
                )}
              </button>
            </div>

            {/* Educational Tiles */}
            <div className="grid sm:grid-cols-3 gap-4 mt-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                    <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
                        <i className="fas fa-clock"></i>
                    </div>
                    <h4 className="font-bold text-slate-800">Spot Urgency</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">Scammers use pressure to make you act without thinking. Look for "Immediate action required!"</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                    <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
                        <i className="fas fa-money-check-dollar"></i>
                    </div>
                    <h4 className="font-bold text-slate-800">Verify Payments</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">Requests to change bank details via email are a huge red flag. Always call the vendor to confirm.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
                        <i className="fas fa-link"></i>
                    </div>
                    <h4 className="font-bold text-slate-800">Check Links</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">Hover over links to see their real destination. Be wary of shortened URLs or strange domain names.</p>
                </div>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-auto border-t border-slate-200 py-8 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-slate-500 font-medium">
            Building digital resilience for small businesses.
          </p>
          <div className="mt-4 flex justify-center gap-6 text-slate-400">
             <i className="fab fa-twitter hover:text-blue-400 cursor-pointer"></i>
             <i className="fab fa-linkedin hover:text-blue-700 cursor-pointer"></i>
             <i className="fab fa-github hover:text-slate-800 cursor-pointer"></i>
          </div>
          <p className="mt-6 text-xs text-slate-400">
            &copy; {new Date().getFullYear()} TrustLens AI. Not a substitute for cybersecurity software or expert consultation.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
