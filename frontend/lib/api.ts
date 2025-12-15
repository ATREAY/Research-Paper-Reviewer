const BASE_URL = "http://127.0.0.1:8000";

export async function uploadPaper(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  return res.json(); // { job_id, status }
}

export async function fetchReview(paperId: string) {
  const res = await fetch(`${BASE_URL}/review/${paperId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch review");
  }

  return res.json();
}
