import ReviewResult, { ReviewData } from "@/components/ReviewResult";

interface ReviewPageProps {
  params: {
    id: string;
  };
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { id } = await params;

  const res = await fetch(`http://127.0.0.1:8000/review/${id}`, {
    cache: "no-store",
  });

  const data: ReviewData | { status: string } = await res.json();

  // Processing state UI
  if ("status" in data && data.status === "processing") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-12 text-center max-w-md shadow-2xl">
          {/* Animated Icon */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              {/* Spinning ring */}
              <div className="absolute inset-0 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-slate-100 mb-3">
            Analyzing Your Paper
          </h1>
          <p className="text-slate-400 mb-6">
            Our AI is thoroughly reviewing your research paper. This typically takes 10-30 seconds.
          </p>

          {/* Progress dots */}
          <div className="flex justify-center space-x-2 mb-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <p className="text-sm text-slate-400">
              💡 Tip: Refresh this page in a few moments to see your results
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Final Results Page
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-purple-500 to-pink-500 rounded-full mb-4">
          <svg width="24" height="24" className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-3 bg-linear-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          Review Complete
        </h1>
        <p className="text-lg text-slate-400">
          Comprehensive AI analysis of your research paper
        </p>
      </div>

      {/* Results */}
      <div className="max-w-5xl mx-auto">
        <ReviewResult data={data as ReviewData} />
      </div>
    </div>
  );
}