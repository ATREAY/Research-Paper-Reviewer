from pathlib import Path
import fitz  # PyMuPDF
from typing import Dict, List
import re

# Canonical section names
SECTION_ALIASES = {
    "abstract": ["abstract"],
    "introduction": ["introduction"],
    "method": ["method", "methods", "model", "model architecture", "approach"],
    "experiments": ["experiment", "experiments", "evaluation", "results"],
    "related work": ["related work", "related works"],
    "conclusion": ["conclusion", "conclusions", "discussion"]
}

def normalize(text: str) -> str:
    return re.sub(r"[^a-z ]", "", text.lower()).strip()

def match_section_header(line: str) -> str | None:
    """
    Try to match a line to a known section header.
    Handles:
    - '1 Introduction'
    - '1. Introduction'
    - 'INTRODUCTION'
    """
    cleaned = normalize(line)

    for canonical, aliases in SECTION_ALIASES.items():
        for alias in aliases:
            if cleaned == alias or cleaned.endswith(alias):
                return canonical

    return None

def parse_pdf_sections(pdf_path: Path) -> Dict[str, str]:
    doc = fitz.open(str(pdf_path))

    pages_text: List[str] = []
    for page in doc:
        text = page.get_text("text")
        pages_text.append(text if isinstance(text, str) else str(text))

    full_text = "\n".join(pages_text)

    sections: Dict[str, List[str]] = {}
    current_section = "other"
    sections[current_section] = []

    for line in full_text.splitlines():
        stripped = line.strip()

        # Skip junk lines
        if len(stripped) < 3:
            continue

        matched_section = match_section_header(stripped)

        if matched_section:
            current_section = matched_section
            if current_section not in sections:
                sections[current_section] = []
        else:
            sections[current_section].append(stripped)

    # Convert lists to strings and remove empty sections
    return {
        section: "\n".join(content).strip()
        for section, content in sections.items()
        if len("\n".join(content).strip()) > 50
    }
