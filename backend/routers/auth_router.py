from fastapi import APIRouter, Depends, HTTPException, status, Response, Cookie
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from .. import schemas, db_models, auth
from ..database import get_db
from ..exceptions import invalid_login_exception, refresh_token_not_found_exception
from ..cruds import user_crud
from typing import Optional

router = APIRouter()


@router.post("/token", response_model=schemas.Token)
# response: Response (have to be the first argument)
async def login_for_token(response: Response, form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = auth.authenticate_user(
        db, form_data.username, form_data.password)
    if not user:
        raise invalid_login_exception
    both_tokens = auth.generate_both_tokens(user.username)
    auth.set_refresh_token(
        response=response, refresh_token=both_tokens.refresh_token, db=db, user=user)
    return {"access_token": both_tokens.access_token, "token_type": "bearer"}


@router.get("/users/{user_id}/refresh/")
async def get_another_token(user_id: int, response: Response, refresh_token: Optional[str] = Cookie(None), db: Session = Depends(get_db)):
    if not refresh_token:
        raise refresh_token_not_found_exception
    user = auth.authenticate_refresh_token(refresh_token, user_id, db)
    both_tokens = auth.generate_both_tokens(user.username)
    auth.set_refresh_token(
        response=response, refresh_token=both_tokens.refresh_token, db=db, user=user)
    return {"access_token": both_tokens.access_token, "token_type": "bearer"}


# @router.post("/token")
# async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
#     user_dict = crud.get_user_by_username(db=db, username=form_data.username)
#     if not user_dict:
#         raise HTTPException(
#             status_code=400, detail="Incorrect username or password")
#     user = schemas.UserInDB(**user_dict)  # pydantic -> pydantic model
#     hashed_password = crud.get_hashed_password(form_data.password)
#     if not hashed_password == user.hashed_password:
#         raise HTTPException(
#             status_code=400, detail="Incorrect username or password")

#     return {"access_token": user.username, "token_type": "bearer"}
