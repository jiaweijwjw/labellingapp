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
def create_upload_file(file: UploadFile = File(...), doc_name: str = Form(...), db: Session = Depends(get_db), user: schemas.User = Depends(check_token_n_username)):
    content = file.file.read()
    # file_name = file.filename
    # file_size = len(contents)
    document = document_crud.create_upload_file(
        doc_name=doc_name, db=db, user=user, content=content)
    return document
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
