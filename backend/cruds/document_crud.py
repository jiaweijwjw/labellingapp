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
        name=doc_name, is_marked=False, sentiment='', content=content, content_size=len(content), proj_id=proj_id)
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    return db_document


def get_all_documents(db: Session, user: schemas.User):
    return db.query(db_models.Document).filter(db_models.Document.proj_id == user.current_proj_id).all()


def delete_documents(db: Session, user: schemas.User, docs_to_del_id: List[int]):
    for doc_to_del_id in docs_to_del_id:
        doc_to_del = db.query(db_models.Document).filter(
            db_models.Document.proj_id == user.current_proj_id).filter(db_models.Document.id == doc_to_del_id).first()
        db.delete(doc_to_del)
    db.commit()
    return docs_to_del_id


def update_doc_status(db: Session, user: schemas.User, document_id: int, status: bool):
    db_document = db.query(db_models.Document).filter(db_models.Document.id == document_id).filter(
        db_models.Document.proj_id == user.current_proj_id).first()
    db_document.is_marked = status
    db.commit()
    db.refresh(db_document)
    return db_document


def update_pos_sentiment(db: Session, user: schemas.User, document_id: int, project_id: int, user_id: int, sentiment: str):
    db_document = db.query(db_models.Document).filter(db_models.Document.id == document_id).filter(
        db_models.Document.proj_id == project_id).first()
    db_document.sentiment = sentiment
    db.commit()
    db.refresh(db_document)
    return db_document
