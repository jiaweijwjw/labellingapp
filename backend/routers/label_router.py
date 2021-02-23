from fastapi import APIRouter, Depends, HTTPException, status
from .. import crud, schemas, db_models, auth
from ..database import get_db
from sqlalchemy.orm import Session
from typing import List
from .. import crud, schemas, db_models, auth
from ..database import get_db

router = APIRouter()


# @router.post("/labels/create/")
# def create_label(label: schemas.LabelCreate, db: Session = Depends(get_db)):
#     return crud.create_label(db=db, label=label)


# @router.get("/labels/", response_model=List[schemas.Label])
# def get_labels(db: Session = Depends(get_db)):
#     labels = crud.get_labels(db)
#     return labels
