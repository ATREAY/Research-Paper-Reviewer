def summarize_sections(sections: dict) -> dict:
    summaries = {}
    for section, text in sections.items():
        summaries[section] = text[:500] + "..." if len(text) > 500 else text
    return summaries
