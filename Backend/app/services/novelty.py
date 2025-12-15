from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer("all-MiniLM-L6-v2")

def detect_novelty(sections: dict) -> list:
    intro = sections.get("introduction", "")
    sentences = intro.split(".")
    embeddings = model.encode(sentences)

    flags = []
    for sent, emb in zip(sentences, embeddings):
        if len(sent.strip()) > 30:
            flags.append(f"Potential contribution: {sent.strip()}")
    return flags[:5]
