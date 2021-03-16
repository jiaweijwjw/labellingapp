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
                                   user_id=project.user_id)
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
