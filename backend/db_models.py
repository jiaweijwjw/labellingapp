from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, LargeBinary, Numeric
from sqlalchemy.orm import relationship
from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    current_proj_id = Column(Integer)
    refresh_token = Column(String)

    # email = Column(String, unique=True, index=True)
    # fullname = Column(String, index=True)

    projects = relationship("Project", back_populates="user",
                            cascade="all, delete, delete-orphan")


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    proj_type = Column(String)  # make it a tuple?
    description = Column(String)
    current_doc_id = Column(Integer)

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User",  back_populates="projects")

    labels = relationship("Label", back_populates="project",
                          cascade="all, delete, delete-orphan")
    documents = relationship(
        "Document", back_populates="project", cascade="all, delete, delete-orphan")

    active_documents = relationship(
        "ActiveDocument", back_populates="project", cascade="all, delete, delete-orphan")


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    is_marked = Column(Boolean)
    sentiment = Column(String)
    content = Column(LargeBinary)
    content_size = Column(Numeric)

    proj_id = Column(Integer, ForeignKey("projects.id"))
    project = relationship("Project", back_populates="documents")

    annotations = relationship(
        "Annotation", back_populates="document", cascade="all, delete, delete-orphan", lazy='joined')


class Annotation(Base):
    __tablename__ = "annotations"

    id = Column(Integer, primary_key=True, index=True)
    start_offset = Column(Integer)
    end_offset = Column(Integer)
    # label = Column(Integer)
    label_id = Column(Integer, ForeignKey("labels.id"))

    document_id = Column(Integer, ForeignKey("documents.id"))
    document = relationship("Document", back_populates="annotations")


class Label(Base):
    __tablename__ = "labels"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    shortcutkey = Column(String)
    color = Column(String)

    proj_id = Column(Integer, ForeignKey("projects.id"))
    project = relationship("Project", back_populates="labels")


# Reference table to store currently selected working documents of a project
class ActiveDocument(Base):
    __tablename__ = "activedocuments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    document_id = Column(Integer)

    proj_id = Column(Integer, ForeignKey("projects.id"))
    project = relationship("Project", back_populates="active_documents")
