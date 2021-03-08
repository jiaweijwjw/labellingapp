from fastapi import APIRouter, Depends, HTTPException, status, Cookie, UploadFile, File, Form
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from datetime import datetime, timedelta
from .. import schemas, db_models, auth
from ..database import get_db
from sqlalchemy.orm import Session
from typing import List, Optional
from ..cruds import project_crud, user_crud, document_crud
from ..exceptions import credentials_exception, project_create_exception

from ..dependencies import check_token, check_token_n_username
router = APIRouter(prefix="/documents")


# @router.post("/upload/")
# def create_file(file: bytes = File(...), db: Session = Depends(get_db), user: schemas.User = Depends(check_token_n_username)):
#     return {"file_size": len(file), "file": file, "user": user}


@router.post("/upload/")
def create_upload_file(file: UploadFile = File(...)):
    contents = file.file.read()
    file_name = file.filename
    file_size = len(contents)
    return {"content": contents, "file_name": file_name, "file_size": file_size, "original": file}
    # file1_name = file1.filename
    # if file2 and not file3:
    #     file2_name = file2.filename
    #     return {"file1_name": file1_name, "file2_name": file2_name}
    # if file3 and not file2:
    #     file3_name = file3.filename
    #     return {"file1_name": file1_name, "file3_name": file3_name}
    # if file2 and file3:
    #     return {"file1_name": file1_name, "file2_name": file2_name, "file3_name": file3_name}
    # return {"file1_name": file1_name}


# def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db), user: schemas.User = Depends(check_token_n_username)):
#     if project.user_id is not user.id:
#         raise credentials_exception
#     db_project = project_crud.create_project(db=db, project=project)
#     if db_project is None:
#         raise project_create_exception
#     return db_project

# # response_model=List[schemas.Project]


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


# @router.put("/")
# def delete_projects(projs_to_del_id: List[int], user: schemas.User = Depends(check_token_n_username), db: Session = Depends(get_db)):
#     db_deleted_projects = project_crud.delete_projects(
#         db=db, user=user, projs_to_del_id=projs_to_del_id)
#     return db_deleted_projects
