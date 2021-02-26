from fastapi import APIRouter, Depends, HTTPException, status, Cookie
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from datetime import datetime, timedelta
from .. import schemas, db_models, auth
from ..database import get_db
from sqlalchemy.orm import Session
from typing import List, Optional
from .. import schemas, db_models, auth
from ..cruds import project_crud, user_crud
from ..database import get_db

router = APIRouter()


@router.post("/projects")
async def create_project(project: schemas.Project, token: str = Depends(auth.oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, auth.SECRET_KEY,
                             algorithms=[auth.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = schemas.TokenData(username=username)
    except JWTError:
        raise credentials_exception
    db_project = project_crud.create_project(db=db, project=project)
    if project is None:
        raise credentials_exception
    return db_project


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
