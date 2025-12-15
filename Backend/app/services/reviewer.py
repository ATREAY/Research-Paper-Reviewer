def generate_dual_scores(
    summaries: dict,
    novelty_flags: list,
    weaknesses: list,
    sections: dict
):
    # -------------------------
    # A. Technical Rigor Score
    # -------------------------
    technical_score = 8.0
    technical_score -= 0.5 * len(weaknesses)

    technical_score = max(1.0, min(technical_score, 10.0))

    # -------------------------
    # B. Historical Impact Score
    # -------------------------
    impact_score = 6.0

    intro = sections.get("introduction", "").lower()

    paradigm_keywords = [
        "first",
        "we introduce",
        "novel",
        "new paradigm",
        "breakthrough",
        "significantly outperforms",
        "outperforms previous methods"
    ]

    if any(k in intro for k in paradigm_keywords):
        impact_score += 2.0

    if len(novelty_flags) >= 3:
        impact_score += 1.5

    if "deep" in intro and "network" in intro:
        impact_score += 0.5

    impact_score = max(1.0, min(impact_score, 10.0))

    # -------------------------
    # Recommendation Logic
    # -------------------------
    if impact_score >= 8.5:
        recommendation = "Accept (High Impact)"
    elif technical_score >= 7:
        recommendation = "Weak Accept"
    else:
        recommendation = "Reject"

    return {
        "technical_score": round(technical_score, 2),
        "impact_score": round(impact_score, 2),
        "weaknesses": weaknesses,
        "novelty_flags": novelty_flags,
        "recommendation": recommendation
    }
