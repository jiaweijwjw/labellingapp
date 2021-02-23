from fastapi import APIRouter, Depends, HTTPException, status, Cookie
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from datetime import datetime, timedelta
from .. import crud, schemas, db_models, auth
from ..database import get_db
from sqlalchemy.orm import Session
from typing import List, Optional
from .. import crud, schemas, db_models, auth
from ..database import get_db

router = APIRouter()


@router.post("/users/register/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db=db, username=user.username)
    if db_user:
        raise HTTPException(
            status_code=400, detail="Username already registered")
    return crud.create_user(db=db, user=user)


# @router.get("/user/me/")  # , response_model=List[schemas.User]
# def read_user(db: Session = Depends(get_db)):
#     users = crud.get_all_users(db)
#     return users

# It will go and look in the request for that Authorization header, check if the value is Bearer plus some token, and will return the token as a str.
async def get_current_user(token: str = Depends(auth.oauth2_scheme), db: Session = Depends(get_db)):
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
    user = crud.get_user_by_username(
        db=db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


@router.get("/users/me/")
# response_model = schemas.User
# , ads_id: Optional[str] = Cookie(None)
def read_user(current_user: schemas.User = Depends(get_current_user)):
    return {"myusername": current_user.username}


@router.get("/users/test/")
def read_users(token: str = Depends(auth.oauth2_scheme)):
    return token

# @router.get("/users/all/", response_model=List[schemas.User])
# def read_users(db: Session = Depends(get_db)):
#     users = crud.get_all_users(db)
#     return users
