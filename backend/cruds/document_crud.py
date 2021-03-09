from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID
from fastapi import Depends, FastAPI, HTTPException, status, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from .. import db_models, schemas
from ..cruds import user_crud
from sqlalchemy import and_


def create_upload_file(doc_name: str, db: Session, user: schemas.User, content: bytes):
    proj_id = user.current_proj_id
    db_document = db_models.Document(
        name=doc_name, is_marked=False, content=content, content_size=len(content), proj_id=proj_id)
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    return db_document


def get_all_projects(db: Session, user: schemas.User):
    return db.query(db_models.Project).filter(db_models.Project.user_id == user.id).all()


def delete_projects(db: Session, user: schemas.User, projs_to_del_id: List[int]):
    for proj_to_del_id in projs_to_del_id:
        proj_to_del = db.query(db_models.Project).filter(
            db_models.Project.user_id == user.id).filter(db_models.Project.id == proj_to_del_id).first()
        db.delete(proj_to_del)
    db.commit()
    return projs_to_del_id
