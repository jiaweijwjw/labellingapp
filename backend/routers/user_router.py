from fastapi import APIRouter, Depends, HTTPException, status, Cookie
from jose import JWTError, jwt
from .. import schemas, auth
from ..cruds import user_crud
from ..database import get_db
from sqlalchemy.orm import Session
# from typing import List, Optional
from ..exceptions import credentials_exception, registration_exception

from ..dependencies import check_token
router = APIRouter(prefix="/users")
# dependencies=[Depends(check_token)]


@router.post("/register/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = user_crud.get_user_by_username(db=db, username=user.username)
    if db_user:
        raise registration_exception
    return user_crud.create_user(db=db, user=user)


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

# It will go and look in the request for that Authorization header, check if the value is Bearer plus some token, and will return the token as a str.

# def get_current_user(token: str = Depends(auth.oauth2_scheme), db: Session = Depends(get_db)):
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
#     user = user_crud.get_user_by_username(
#         db=db, username=token_data.username)
#     if user is None or user.id is not id:
#         raise credentials_exception
#     return user

# @router.get("/users/all/", response_model=List[schemas.User])
# def read_users(db: Session = Depends(get_db)):
#     users = user_crud.get_all_users(db)
#     return users
