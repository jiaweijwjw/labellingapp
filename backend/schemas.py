from typing import List, Optional
from pydantic import BaseModel

# Pydantic models

# TOKEN


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    # username: Optional[str] = None
    username: str

# USERS


class UserBase(BaseModel):
    username: str


class UserCreate(UserBase):  # UserIn
    password: str


class UserInDB(UserBase):
    hashed_password: str


class User(UserBase):  # UserOut
    id: int
    current_proj_id: int
    current_doc_id: int
    # labels: List[Label] = []
    # documents: List[Document] = []
    #items: List[Item] = []

    class Config:
        orm_mode = True


class UserDetails(BaseModel):
    id: int


class ProjectBase(BaseModel):
    name: str
    proj_type: str
    description: str


class ProjectCreate(ProjectBase):
    user_id: int


class Project(ProjectBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True
# reading from database, will know id and need orm
# Pydantic's orm_mode will tell the Pydantic model to read the data (from database) even if it is not a dict, but an ORM model (or any other arbitrary object with attributes).
# able to return a database model and it will read the data from it.


# LABELS


class LabelBase(BaseModel):
    name: str
    shortcutkey: str
    color: str


class LabelCreate(LabelBase):
    pass


class Label(LabelBase):
    id: int
    # user_id: UUID

    class Config:
        orm_mode = True

# DOCUMENTS


class DocumentBase(BaseModel):
    name: str
    # annotations: List[Annotation]


class Document(DocumentBase):
    id: int
    is_marked: bool
    content: bytes
    content_size: int
    proj_id: int

    class Config:
        orm_mode = True

# ANNOTATIONS


class AnnotationBase(BaseModel):
    label: str
    start_offset: int
    end_offset: int


class Annotation(AnnotationBase):
    id: int

    class Config:
        orm_mode = True


# class ItemBase(BaseModel):
#     title: str
#     description: Optional[str] = None


# class ItemCreate(ItemBase):
#     pass


# class Item(ItemBase):
#     id: int
#     owner_id: int

#     class Config:
#         orm_mode = True
