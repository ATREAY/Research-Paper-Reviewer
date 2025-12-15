import uuid
from pathlib import Path
from typing import Tuple
from app.core.config import UPLOAD_DIR, RESULT_DIR

def save_pdf(file_bytes: bytes, filename: str) -> Tuple[str, Path]:
    paper_id = str(uuid.uuid4())
    file_path = UPLOAD_DIR / f"{paper_id}_{filename}"

    with open(file_path, "wb") as f:
        f.write(file_bytes)

    return paper_id, file_path

def save_result(paper_id: str, data: dict):
    path = RESULT_DIR / f"{paper_id}.json"
    with open(path, "w") as f:
        import json
        json.dump(data, f, indent=2)

def load_result(paper_id: str):
    path = RESULT_DIR / f"{paper_id}.json"
    if not path.exists():
        return None
    import json
    with open(path) as f:
        return json.load(f)
