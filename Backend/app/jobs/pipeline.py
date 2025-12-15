from app.services import parser, summarizer, novelty, weaknesses, reviewer, storage

def run_pipeline(paper_id: str, pdf_path):
    sections = parser.parse_pdf_sections(pdf_path)
    summaries = summarizer.summarize_sections(sections)

    novelty_flags = novelty.detect_novelty(sections)
    weak = weaknesses.detect_weaknesses(sections)

    result = reviewer.generate_dual_scores(
        summaries=summaries,
        novelty_flags=novelty_flags,
        weaknesses=weak,
        sections=sections
    )

    result["paper_id"] = paper_id
    result["summaries"] = summaries

    storage.save_result(paper_id, result)
