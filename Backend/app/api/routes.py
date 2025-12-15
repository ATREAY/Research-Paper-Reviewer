from fastapi import APIRouter, UploadFile, BackgroundTasks
from app.services import storage
from app.jobs.pipeline import run_pipeline

router = APIRouter()

@router.post("/upload")
async def upload_paper(file: UploadFile, bg: BackgroundTasks):
    content = await file.read()
    paper_id, path = storage.save_pdf(content, file.filename)

    bg.add_task(run_pipeline, paper_id, path)
    return {"job_id": paper_id, "status": "processing"}

@router.get("/review/{paper_id}")
def get_review(paper_id: str):
    result = storage.load_result(paper_id)
    if not result:
        return {"status": "processing"}
    return result
