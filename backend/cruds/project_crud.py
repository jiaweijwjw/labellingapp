from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from .. import db_models, schemas
from ..cruds import user_crud
from sqlalchemy import and_


def create_project(db: Session, project: schemas.ProjectCreate):
    db_project = db_models.Project(name=project.name,
                                   proj_type=project.proj_type,
                                   description=project.description,
                                   user_id=project.user_id,
                                   current_doc_id=None)
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project


def get_all_projects(db: Session, user: schemas.User):
    return db.query(db_models.Project).filter(db_models.Project.user_id == user.id).all()


def delete_projects(db: Session, user: schemas.User, projs_to_del_id: List[int]):
    for proj_to_del_id in projs_to_del_id:
        proj_to_del = db.query(db_models.Project).filter(
            db_models.Project.user_id == user.id).filter(db_models.Project.id == proj_to_del_id).first()
        db.delete(proj_to_del)
    db.commit()
    return projs_to_del_id


def get_project(db: Session, user: schemas.User, project_id: int):
    db_proj = db.query(db_models.Project).filter(
        db_models.Project.id == project_id).filter(db_models.Project.user_id == user.id).first()
    return db_proj


def update_current_doc(db: Session, user: schemas.User, new_id: int, project_id: int):
    db_proj = db.query(db_models.Project).filter(
        db_models.Project.id == project_id).filter(db_models.Project.user_id == user.id).first()
    db_proj.current_doc_id = new_id
    db.commit()
    db.refresh(db_proj)
    return db_proj


def update_current_selected_docs(db: Session, user: schemas.User, new_ids: List[int], project_id: int):
    selected_docs: List[schemas.UserActiveDocument] = []
    old_selected = db.query(db_models.ActiveDocument).filter(db_models.ActiveDocument.user_id == user.id).filter(
        db_models.ActiveDocument.proj_id == project_id).all()
    print(old_selected)
    if old_selected:
        for item in old_selected:
            db.delete(item)
            db.commit()
    elif not old_selected:
        pass
    for new_doc_id in new_ids:
        selected_doc = db_models.ActiveDocument(
            user_id=user.id, proj_id=project_id, document_id=new_doc_id)
        db.add(selected_doc)
        db.commit()
    return new_ids
