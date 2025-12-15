"use client"

import { useState } from "react"

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleUpload() {
    if (!file) return
    setLoading(true)

    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("http://127.0.0.1:8000/upload", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()
    window.location.href = `/review/${data.job_id}`
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-medium mb-2">
        Upload Research Paper
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Upload a PDF paper to generate an automated reviewer report.
      </p>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="block w-full text-sm text-gray-700 mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload & Review"}
      </button>
    </div>
  )
}
