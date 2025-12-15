// components/ReviewResult.tsx

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
  return (
    <div className="space-y-6">
      {/* Overall Decision */}
      <div className="rounded-lg border p-4 bg-gray-50">
        <h2 className="text-lg font-semibold">Overall Review</h2>
        <p className="mt-2">
          <strong>Technical Score:</strong> {data.technical_score}/10
        </p>
        <p className="mt-2">
          <strong>Score:</strong> {data.impact_score}/10
        </p>
        <p>
          <strong>Recommendation:</strong>{" "}
          <span className="font-medium">{data.recommendation}</span>
        </p>
      </div>

      {/* Section Summaries */}
      <div className="rounded-lg border p-4">
        <h2 className="text-lg font-semibold mb-2">Section Summaries</h2>

        {Object.entries(data.summaries).map(([section, text]) => (
        <div
          key={section}
          className="mb-6 rounded-md border border-gray-200 bg-white p-4"
        >
          {/* Section Heading */}
          <h3 className="mb-2 text-base font-semibold capitalize text-gray-900">
            {section.replace(/_/g, " ")}
          </h3>

          {/* Section Content */}
          <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">
            {String(text)}
          </p>
        </div>
      ))}

      </div>

      {/* Novelty Flags */}
      <div className="rounded-lg border p-4">
        <h2 className="text-lg font-semibold mb-2">Potential Contributions</h2>

        {data.novelty_flags.length === 0 ? (
          <p className="text-sm text-gray-600">No strong novelty signals detected.</p>
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {data.novelty_flags.map((item, idx) => (
              <li key={idx} className="text-sm text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Weaknesses */}
      <div className="rounded-lg border p-4 bg-red-50">
        <h2 className="text-lg font-semibold mb-2">Weaknesses</h2>

        {data.weaknesses.length === 0 ? (
          <p className="text-sm text-gray-600">No major weaknesses detected.</p>
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {data.weaknesses.map((w, idx) => (
              <li key={idx} className="text-sm text-gray-700">
                {w}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
