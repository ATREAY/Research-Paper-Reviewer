export default function ReviewStatus() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
      <h2 className="text-lg font-medium mb-2">
        Review in Progress
      </h2>
      <p className="text-sm text-gray-600">
        The paper is currently being analyzed.  
        This may take a few moments.
      </p>

      <div className="mt-4 h-2 bg-gray-100 rounded">
        <div className="h-2 bg-gray-400 rounded w-1/2"></div>
      </div>
    </div>
  )
}
