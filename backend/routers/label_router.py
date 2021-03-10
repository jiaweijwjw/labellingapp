from fastapi import APIRouter, Depends, HTTPException, status, Cookie
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from datetime import datetime, timedelta
from .. import schemas, db_models, auth
from ..database import get_db
from sqlalchemy.orm import Session
from typing import List, Optional
from ..cruds import project_crud, user_crud, label_crud
from ..exceptions import credentials_exception, project_create_exception

from ..dependencies import check_token, check_token_n_username
router = APIRouter(prefix="/labels")


@router.post("/", response_model=schemas.Label)
def create_label(label: schemas.LabelCreate, db: Session = Depends(get_db), user: schemas.User = Depends(check_token_n_username)):
    db_label = label_crud.create_label(label=label, db=db, user=user)
    return db_label


@router.get("/", response_model=List[schemas.Label])
def get_all_labels(user: schemas.User = Depends(check_token_n_username), db: Session = Depends(get_db)):
    db_labels = label_crud.get_all_labels(db=db, user=user)
    return db_labels


@router.put("/")
def delete_labels(labels_to_del_id: List[int], user: schemas.User = Depends(check_token_n_username), db: Session = Depends(get_db)):
    db_deleted_labels = label_crud.delete_labels(
        db=db, user=user, labels_to_del_id=labels_to_del_id)
    return db_deleted_labels

# @router.get("/", response_model=List[schemas.Project])
# def get_all_projects(user: schemas.User = Depends(check_token_n_username), db: Session = Depends(get_db)):
#     db_projects = project_crud.get_all_projects(db=db, user=user)
#     return db_projects


# def get_current_user(token_data: schemas.TokenData = Depends(check_token), db: Session = Depends(get_db)):
#     user = user_crud.get_user_by_username(
#         db=db, username=token_data.username)
#     if user is None:
#         raise credentials_exception
#     return user


# @router.get("/me/", response_model=schemas.User)
# # , ads_id: Optional[str] = Cookie(None)
# def read_user(current_user: schemas.User = Depends(get_current_user)):
#     return current_user
