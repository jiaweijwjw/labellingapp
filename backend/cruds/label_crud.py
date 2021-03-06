from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from .. import db_models, schemas
from ..cruds import user_crud
from sqlalchemy import and_


def create_label(label: schemas.LabelCreate, db: Session, user: schemas.User):
    db_label = db_models.Label(name=label.name, shortcutkey=label.shortcutkey,
                               color=label.color, proj_id=user.current_proj_id)
    db.add(db_label)
    db.commit()
    db.refresh(db_label)
    return db_label


def get_all_labels(db: Session, user: schemas.User):
    return db.query(db_models.Label).filter(db_models.Label.proj_id == user.current_proj_id).all()


def delete_labels(db: Session, user: schemas.User, labels_to_del_id: List[int]):
    for label_to_del_id in labels_to_del_id:
        label_to_del = db.query(db_models.Label).filter(
            db_models.Label.proj_id == user.current_proj_id).filter(db_models.Label.id == label_to_del_id).first()
        db.delete(label_to_del)
        annotations_to_del = db.query(db_models.Annotation).filter(
            db_models.Annotation.label_id == label_to_del_id).delete()
    db.commit()
    return labels_to_del_id


# def delete_labels(db: Session, user: schemas.User, labels_to_del_id: List[int]):
#     for label_to_del_id in labels_to_del_id:
#         label_to_del = db.query(db_models.Label).filter(
#             db_models.Label.proj_id == user.current_proj_id).filter(db_models.Label.id == label_to_del_id).first()
#         db.delete(label_to_del)
#     db.commit()
#     return labels_to_del_id
