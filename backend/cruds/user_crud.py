from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
from .. import db_models, schemas, auth


def get_user_by_username(db: Session, username: str):
    return db.query(db_models.User).filter(db_models.User.username == username).first()
# def get_user_by_username(db: Session, username: str):
#     return db.query(db_models.User).options(joinedload(db_models.User.projects).joinedload(db_models.Project.documents)).filter(db_models.User.username == username).first()


def get_user_by_id(db: Session, user_id: int):
    return db.query(db_models.User).filter(db_models.User.id == user_id).first()


def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = auth.get_hashed_password(user.password)
    db_user = db_models.User(username=user.username,
                             hashed_password=hashed_password,
                             current_proj_id=None)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_all_users(db: Session):
    return db.query(db_models.User).all()


def update_current_proj(db: Session, user: schemas.User, new_id: int):
    db_user = db.query(db_models.User).filter(
        db_models.User.id == user.id).first()
    db_user.current_proj_id = new_id
    db.commit()
    db.refresh(db_user)
    return db_user


# def get_labels(db: Session):
#     return db.query(db_models.Label).all()


# def create_label(db: Session, label: schemas.LabelCreate):
#     # get a Pydantic model from the data in another Pydantic model.
#     db_label = db_models.Label(**label.dict())
#     db.add(db_label)
#     db.commit()
#     db.refresh(db_label)
#     return db_label

# HERH EHEHEEHEHEHEHEEHEHEH

# def get_user(db: Session, user_id: int):
#     return db.query(db_models.User).filter(db_models.User.id == user_id).first()


# def get_user(db, username: str):
#     if username in db:
#         user_dict = db[username]
#         return UserInDB(**user_dict)


# def get_user(db, username: str):
#     if username in db:  # return username already in use please c hoose another username
#         user_dict = db[username]
#         return schemas.UserInDB(**user_dict)

# def get_items(db: Session, skip: int = 0, limit: int = 100):
#     return db.query(db_models.Item).offset(skip).limit(limit).all()


# def create_user_item(db: Session, item: schemas.ItemCreate, user_id: int):
#     db_item = db_models.Item(**item.dict(), owner_id=user_id)
#     db.add(db_item)
#     db.commit()
#     db.refresh(db_item)
#     return db_item
