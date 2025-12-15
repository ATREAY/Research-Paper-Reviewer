"use client"

import { useState } from "react"

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile)
      }
    }
  }

  async function handleUpload() {
    if (!file) return
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      window.location.href = `/review/${data.job_id}`
    } catch (error) {
      console.error("Upload failed:", error)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-8 animate-fade-in">
        <h2 className="text-4xl font-bold mb-4 bg-linear-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          Upload Your Research Paper
        </h2>
        <p className="text-lg text-slate-400">
          Get instant, comprehensive AI-powered academic review
        </p>
      </div>

      {/* Upload Card */}
      <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl animate-fade-in">
        {/* Drag and Drop Area */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
            dragActive
              ? "border-purple-500 bg-purple-500/10"
              : "border-slate-700 hover:border-slate-600"
          }`}
        >
          {/* Upload Icon */}
          <div className="mb-4 flex justify-center">
            <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              {/* UPDATED: Added width="32" and height="32" */}
              <svg width="32" height="32" className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg> 
            </div>
          </div>

          {file ? (
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2 text-green-400">
                {/* UPDATED: Added width="20" height="20" to the tick icon */}
                <svg width="20" height="20" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">{file.name}</span>
              </div>
              <p className="text-sm text-slate-400">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <>
              <p className="text-lg text-slate-300 mb-2">
                Drag and drop your PDF here
              </p>
              <p className="text-sm text-slate-500 mb-4">or</p>
            </>
          )}

          {/* File Input */}
          <label className="inline-block">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
            />
            <span className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium cursor-pointer transition-all duration-300 inline-block shadow-lg hover:shadow-purple-500/50">
              {file ? "Choose Different File" : "Browse Files"}
            </span>
          </label>

          <p className="text-xs text-slate-500 mt-4">
            Supported format: PDF (Max 50MB)
          </p>
        </div>

        {/* Upload Button */}
        {file && (
          <div className="mt-6 animate-fade-in">
            <button
              onClick={handleUpload}
              disabled={loading}
              className="w-full px-6 py-4 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-700 disabled:to-slate-700 text-white rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-purple-500/50 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Analyzing Paper...</span>
                </>
              ) : (
                <>
                  <svg width="20" height="20" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Generate Review</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[
          { icon: "⚡", title: "Fast Analysis", desc: "Results in seconds" },
          { icon: "🎯", title: "Accurate Scoring", desc: "10-point scale evaluation" },
          { icon: "📊", title: "Detailed Feedback", desc: "Section-by-section review" }
        ].map((feature, idx) => (
          <div key={idx} className="bg-slate-900/30 border border-slate-800 rounded-xl p-4 text-center hover:border-purple-500/50 transition-all duration-300">
            <div className="text-3xl mb-2">{feature.icon}</div>
            <h3 className="font-semibold text-slate-200 mb-1">{feature.title}</h3>
            <p className="text-sm text-slate-500">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}