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

  // ✅ Processing state UI (keep simple & clean)
  if ("status" in data && data.status === "processing") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <h1 className="text-xl font-semibold">
            Reviewing your paper…
          </h1>
          <p className="text-gray-600 mt-2">
            This may take a few seconds. Please refresh shortly.
          </p>
        </div>
      </div>
    );
  }

  // ✅ Final Results Page Layout
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          AI Research Paper Review
        </h1>
        <p className="text-gray-600 mt-3">
          Automated academic-style review of your uploaded paper
        </p>
      </div>

      {/* Results Card */}
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <ReviewResult data={data as ReviewData} />
      </div>
    </div>
  );
}
