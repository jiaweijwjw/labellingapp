from typing import List, Optional
from pydantic import BaseModel

# Pydantic models
# Order of declaration matters!!

# reading from database, will know id and need orm
# Pydantic's orm_mode will tell the Pydantic model to read the data (from database) even if it is not a dict, but an ORM model (or any other arbitrary object with attributes).
# able to return a database model and it will read the data from it.


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    # username: Optional[str] = None
    username: str


class AnnotationBase(BaseModel):
    label_id: int
    start_offset: int
    end_offset: int


class AnnotationCreate(AnnotationBase):
    pass


class Annotation(AnnotationBase):
    id: int
    document_id: int

    class Config:
        orm_mode = True


class Id(BaseModel):
    id: int


class Ids(BaseModel):
    ids: List[int]


class Bool(BaseModel):
    status: bool


class DocumentBase(BaseModel):
    name: str


class Document(DocumentBase):
    id: int
    is_marked: bool
    content: bytes
    content_size: int
    proj_id: int
    annotations: List[Annotation] = []

    class Config:
        orm_mode = True


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


class ProjectBase(BaseModel):
    name: str
    proj_type: str
    description: str


class ProjectCreate(ProjectBase):
    user_id: int


class Project(ProjectBase):
    id: int
    user_id: int
    current_doc_id: Optional[int] = None

    class Config:
        orm_mode = True


class UserActiveDocument(BaseModel):
    document_id: int

    class Config:
        orm_mode = True


class ProjectFull(Project):
    documents: List[Document] = []
    labels: List[Label] = []
    active_documents: List[UserActiveDocument] = []


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

    class Config:
        orm_mode = True


class UserFull(User):
    projects: List[ProjectFull] = []
    # is Config necessary?
    # class Config:
    #     orm_mode = True


class UserActiveDocument2(UserActiveDocument):
    id: int
    user_id: int
    proj_id: int
