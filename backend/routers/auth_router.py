from fastapi import APIRouter, Depends, HTTPException, status, Response
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from .. import schemas, db_models, auth
from ..database import get_db
from ..exceptions import invalid_login_exception
from ..cruds import user_crud

router = APIRouter()


@router.post("/token", response_model=schemas.Token)
# response: Response (have to be the first argument)
async def login_for_token(response: Response, form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = auth.authenticate_user(
        db, form_data.username, form_data.password)
    if not user:
        raise invalid_login_exception
    access_token_expires_in = timedelta(
        minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token_expire_time = datetime.utcnow() + access_token_expires_in
    refresh_token_expire_in = timedelta(days=auth.REFRESH_TOKEN_EXPIRE_DAYS)
    refresh_token_expire_time = datetime.utcnow() + refresh_token_expire_in
    access_token = auth.create_access_token(
        data={"sub": user.username}, expire_time=access_token_expire_time
    )
    refresh_token = auth.create_refresh_token(
        data={"sub": user.username}, expire_time=refresh_token_expire_time
    )
    response.set_cookie(key="refresh_token",
                        value=refresh_token, httponly=True)
    test = user_crud.update_refresh_token(
        db=db, user=user, refresh_token=refresh_token)
    return {"access_token": access_token, "token_type": "bearer", "access_token_expiry": access_token_expire_time, "test": test.refresh_token}


@router.get("/refresh/", response_model=schemas.Token)
async def get_another_token(response: Response):
    return {"nth": "nothing"}
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
