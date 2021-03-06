from fastapi import APIRouter, Depends, HTTPException, status, Cookie
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from datetime import datetime, timedelta
from .. import schemas, db_models, auth
from ..database import get_db
from sqlalchemy.orm import Session
from typing import List, Optional
from ..cruds import project_crud, user_crud
from ..exceptions import credentials_exception, project_create_exception

from ..dependencies import check_token, check_token_n_username
router = APIRouter(prefix="/projects")
# dependencies=[Depends(check_token_n_username)]


@router.post("/", response_model=schemas.Project)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db), user: schemas.User = Depends(check_token_n_username)):
    if project.user_id is not user.id:
        raise credentials_exception
    db_project = project_crud.create_project(db=db, project=project)
    if db_project is None:
        raise project_create_exception
    return db_project

# response_model=List[schemas.Project]


@router.get("/", response_model=List[schemas.Project])
def get_all_projects(user: schemas.User = Depends(check_token_n_username), db: Session = Depends(get_db)):
    db_projects = project_crud.get_all_projects(db=db, user=user)
    return db_projects


def get_current_user(token_data: schemas.TokenData = Depends(check_token), db: Session = Depends(get_db)):
    user = user_crud.get_user_by_username(
        db=db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


@router.get("/me/", response_model=schemas.User)
# , ads_id: Optional[str] = Cookie(None)
def read_user(current_user: schemas.User = Depends(get_current_user)):
    return current_user


@router.put("/")
def delete_projects(projs_to_del_id: List[int], user: schemas.User = Depends(check_token_n_username), db: Session = Depends(get_db)):
    db_deleted_projects = project_crud.delete_projects(
        db=db, user=user, projs_to_del_id=projs_to_del_id)
    return db_deleted_projects


@router.get("/{project_id}/", response_model=schemas.ProjectFull)
def get_project(project_id: int, user: schemas.User = Depends(check_token_n_username), db: Session = Depends(get_db)):
    db_project = project_crud.get_project(
        db=db, user=user, project_id=project_id)
    return db_project


@router.put('/{project_id}/currentdoc/', response_model=schemas.Project)
def update_current_doc(project_id: int, new_id: schemas.Id, user: schemas.User = Depends(check_token_n_username), db: Session = Depends(get_db)):
    db_user = project_crud.update_current_doc(
        db=db, user=user, new_id=new_id.id, project_id=project_id)
    return db_user

# , response_model=List[schemas.UserActiveDocument]


@router.put('/{project_id}/currentselecteddocs/')
def update_current_selected_docs(project_id: int, new_ids: schemas.Ids, user: schemas.User = Depends(check_token_n_username), db: Session = Depends(get_db)):
    new_selected_docs = project_crud.update_current_selected_docs(
        db=db, user=user, new_ids=new_ids.ids, project_id=project_id)
    return new_selected_docs

# @router.get("/projects/")
# async def get_projects(token: str = Depends(auth.oauth2_scheme), db: Session = Depends(get_db)):
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, auth.SECRET_KEY,
#                              algorithms=[auth.ALGORITHM])
#         username: str = payload.get("sub")
#         if username is None:
#             raise credentials_exception
#         token_data = schemas.TokenData(username=username)
#     except JWTError:
#         raise credentials_exception
#     db_project = project_crud.create_project(db=db, project=project)
#     if project is None:
#         raise credentials_exception
#     return db_project
# def get_projects(db: Session = Depends(get_db)):
#     users = user_crud.get_all_users(db)
#     return users
