
import React from 'react';
import { AssessmentResult } from '../types';
import ThreatBadge from './ThreatBadge';

interface Props {
  result: AssessmentResult;
  onReset: () => void;
}

const ResultDisplay: React.FC<Props> = ({ result, onReset }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 sm:p-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Analysis Result</h2>
            <p className="text-slate-500 mt-1">TrustLens assessment of your provided content.</p>
          </div>
          <ThreatBadge level={result.threatLevel} />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800 border-l-4 border-blue-500 pl-3">Why This Assessment</h3>
          <p className="text-slate-600 leading-relaxed text-lg italic">
            "{result.reasoning}"
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800">Red Flags Identified</h3>
            {result.redFlags.length > 0 ? (
              <ul className="space-y-3">
                {result.redFlags.map((flag, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 bg-rose-50 rounded-xl text-rose-800 border border-rose-100">
                    <i className="fas fa-flag mt-1 text-sm"></i>
                    <span className="font-medium">{flag}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 bg-emerald-50 rounded-xl text-emerald-800 border border-emerald-100 font-medium">
                No specific red flags were found in this content.
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800">Recommended Next Steps</h3>
            <ul className="space-y-3">
              {result.nextSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl text-blue-800 border border-blue-100">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </div>
                  <span className="font-medium">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex justify-center">
          <button
            onClick={onReset}
            className="px-8 py-3 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition-all shadow-md active:scale-95"
          >
            Check Another Content
          </button>
        </div>
      </div>
      
      <div className="bg-slate-50 p-4 text-xs text-slate-400 text-center border-t border-slate-200">
        Note: TrustLens is an advisory tool. Always verify communications through official channels before sharing sensitive information or making payments.
      </div>
    </div>
  );
};

export default ResultDisplay;
