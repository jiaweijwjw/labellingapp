from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    current_proj_id = Column(Integer)
    current_doc_id = Column(Integer)
    # email = Column(String, unique=True, index=True)
    # fullname = Column(String, index=True)

    projects = relationship("Project", back_populates="user",
                            cascade="all, delete, delete-orphan")


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    proj_type = Column(String)  # make it a tuple?
    description = Column(String)

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User",  back_populates="projects")

    labels = relationship("Label", back_populates="project",
                          cascade="all, delete, delete-orphan")
    documents = relationship(
        "Document", back_populates="project", cascade="all, delete, delete-orphan")


class Label(Base):
    __tablename__ = "labels"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    shortcutkey = Column(String, index=True)
    color = Column(String, index=True)

    proj_id = Column(Integer, ForeignKey("projects.id"))
    project = relationship("Project", back_populates="labels")


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    is_marked = Column(Boolean)
    text = Column(String, index=True)

    proj_id = Column(Integer, ForeignKey("projects.id"))
    project = relationship("Project", back_populates="documents")

    annotations = relationship(
        "Annotation", back_populates="document", cascade="all, delete, delete-orphan")


class Annotation(Base):
    __tablename__ = "annotations"

    id = Column(Integer, primary_key=True, index=True)
    label = Column(String, index=True)
    start_offset = Column(Integer, index=True)
    end_offset = Column(Integer, index=True)

    document_id = Column(Integer, ForeignKey("documents.id"))
    document = relationship("Document", back_populates="annotations")

# class User(Base):
#     __tablename__ = "users"

#     id = Column(Integer, primary_key=True, index=True)
#     username = Column(String, unique=True, index=True)
#     email = Column(String, unique=True, index=True)
#     fullname = Column(String, index=True)
#     hashed_password = Column(String)

#     #items = relationship("Item", back_populates="owner")


# class Item(Base):
#     __tablename__ = "items"

#     id = Column(Integer, primary_key=True, index=True)
#     title = Column(String, index=True)
#     description = Column(String, index=True)
#     owner_id = Column(Integer, ForeignKey("users.id"))

#     owner = relationship("User", back_populates="items")
