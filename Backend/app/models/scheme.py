from pydantic import BaseModel
from typing import Dict, List

class UploadResponse(BaseModel):
    job_id: str
    status: str

class ReviewResult(BaseModel):
    paper_id: str
    summaries: Dict[str, str]
    novelty_flags: List[str]
    weaknesses: List[str]
    score: float
    recommendation: str
