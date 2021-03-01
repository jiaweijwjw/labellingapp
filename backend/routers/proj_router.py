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

from ..dependencies import check_token_n_username
router = APIRouter(prefix="/projects")
# dependencies=[Depends(check_token_n_username)]


@router.post("/")
async def create_project(project: schemas.Project, db: Session = Depends(get_db), user: schemas.User = Depends(check_token_n_username)):
    if project.user_id is not user.id:
        raise credentials_exception
    db_project = project_crud.create_project(db=db, project=project)
    if db_project is None:
        raise project_create_exception
    return db_project

# add response model
# dependencies=[Depends(check_user(schemas.Project.id))]
# @router.post("/projects/")
# def create_project(project: schemas.Project, db: Session = Depends(get_db), user: schemas.User = Depends(check_user(project.id))):
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     db_project = project_crud.create_project(db=db, project=project)
#     if project is None:
#         raise credentials_exception
#     return db_project


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


@router.get("/projects/alla/", response_model=List[schemas.User])
def read_users(db: Session = Depends(get_db)):
    users = user_crud.get_all_users(db)
    return users

# @router.post("/projects")
# def create_project(project: schemas.Project, db: Session = Depends(get_db)):
#     db_user = user_crud.get_user_by_id(db=db, user_id=project.user_id)
#     if not db_user:
#         raise HTTPException(
#             status_code=400, detail="User does not exist")
#     return project_crud.create_project(db=db, project=project)


# @router.post("/projects", response_model=schemas.Project)
# def create_project(project: schemas.Project = Depends(get_current_user)):
#     return current_user
