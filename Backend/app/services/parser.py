from pathlib import Path
import fitz # PyMuPDF
from typing import Dict, List

SECTION_HEADERS = [
    "abstract", "introduction", "method", "methods",
    "experiment", "experiments", "results",
    "related work", "conclusion"
]

def parse_pdf_sections(pdf_path: Path) -> Dict[str, str]:
    doc = fitz.open(str(pdf_path))

    pages_text: List[str] = []

    for page in doc:
        text = page.get_text("text")

        # ✅ Type narrowing for Pylance
        if isinstance(text, str):
            pages_text.append(text)
        else:
            # Extremely rare, but keeps typing safe
            pages_text.append(str(text))

    full_text: str = "\n".join(pages_text)

    sections: Dict[str, List[str]] = {}
    current_section = "other"
    sections[current_section] = []

    for line in full_text.splitlines():
        lower = line.lower().strip()

        if lower in SECTION_HEADERS:
            current_section = lower
            sections[current_section] = []
        else:
            sections[current_section].append(line)

    return {k: "\n".join(v) for k, v in sections.items()}
