def detect_weaknesses(sections: dict) -> list:
    weaknesses = []

    if "experiment" not in sections and "results" not in sections:
        weaknesses.append("No experimental evaluation found.")

    if len(sections.get("related work", "")) < 500:
        weaknesses.append("Related work section is weak or too short.")

    return weaknesses
