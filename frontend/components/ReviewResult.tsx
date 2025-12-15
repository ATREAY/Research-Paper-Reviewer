"use client"

import React from "react";

export interface ReviewData {
  paper_id: string;
  summaries: Record<string, string>;
  novelty_flags: string[];
  weaknesses: string[];
  technical_score: number;
  impact_score: number;
  recommendation: string;
}

interface Props {
  data: ReviewData;
}

export default function ReviewResult({ data }: Props) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return "from-green-500 to-emerald-500";
    if (score >= 6) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  const getRecommendationStyle = (recommendation: string) => {
    const lower = recommendation.toLowerCase();
    if (lower.includes("accept") || lower.includes("strong accept")) {
      return "bg-green-500/10 text-green-400 border-green-500/20";
    }
    if (lower.includes("reject")) {
      return "bg-red-500/10 text-red-400 border-red-500/20";
    }
    return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-12">
      
      {/* 1. Header Card */}
      <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-8 border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Review Summary
            </h2>
            <p className="text-slate-400 mt-1">AI-generated analysis of your research paper</p>
          </div>
          <div className={`px-5 py-2 rounded-full border ${getRecommendationStyle(data.recommendation)} font-semibold text-center whitespace-nowrap`}>
            {data.recommendation}
          </div>
        </div>

        {/* Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Technical Score */}
          <div className="bg-slate-950/50 rounded-xl p-6 border border-slate-800/50 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="shrink-0 w-12 h-12 bg-linear-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                <svg width="24" height="24" className="text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Technical Quality</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">{data.technical_score}</span>
                  <span className="text-slate-500">/10</span>
                </div>
              </div>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full bg-linear-to-r ${getScoreColor(data.technical_score)} transition-all duration-1000`}
                style={{ width: `${(data.technical_score / 10) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Impact Score */}
          <div className="bg-slate-950/50 rounded-xl p-6 border border-slate-800/50 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="shrink-0 w-12 h-12 bg-linear-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                <svg width="24" height="24" className="text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Impact Score</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">{data.impact_score}</span>
                  <span className="text-slate-500">/10</span>
                </div>
              </div>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full bg-linear-to-r ${getScoreColor(data.impact_score)} transition-all duration-1000`}
                style={{ width: `${(data.impact_score / 10) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Detailed Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Section Analysis (Spans 2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Section Analysis</h3>
            </div>

            <div className="space-y-4">
              {Object.entries(data.summaries).map(([section, text], idx) => (
                <div
                  key={section}
                  className="bg-slate-950/30 rounded-xl p-5 border border-slate-800/50 hover:border-slate-700 transition-all"
                >
                  <h4 className="text-md font-semibold text-indigo-300 mb-2 capitalize flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    {section.replace(/_/g, " ")}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">
                    {String(text)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Key Contributions & Weaknesses */}
        <div className="space-y-6">
          
          {/* Contributions */}
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Highlights</h3>
            </div>
            
            <div className="space-y-3">
              {data.novelty_flags.length > 0 ? (
                data.novelty_flags.map((item, idx) => (
                  <div key={idx} className="flex gap-3 text-sm text-slate-300">
                    <svg className="shrink-0 w-5 h-5 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-sm">No specific highlights detected.</p>
              )}
            </div>
          </div>

          {/* Weaknesses */}
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6">
             <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center text-red-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Improvements</h3>
            </div>

            <div className="space-y-3">
              {data.weaknesses.length > 0 ? (
                data.weaknesses.map((item, idx) => (
                  <div key={idx} className="flex gap-3 text-sm text-slate-300">
                     <svg className="shrink-0 w-5 h-5 text-red-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-sm">No major weaknesses detected.</p>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* 3. Action Buttons */}
      <div className="flex justify-center gap-4 pt-6">
        <button
          onClick={() => window.print()}
          className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-all flex items-center gap-2"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Export Report
        </button>
        <button
          onClick={() => window.location.href = '/'}
          className="px-6 py-3 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium shadow-lg hover:shadow-purple-500/25 transition-all flex items-center gap-2"
        >
           <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Review Another Paper
        </button>
      </div>
    </div>
  );
}