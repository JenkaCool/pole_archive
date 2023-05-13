from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from models import *

ma = Marshmallow()

class AttachmentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Attachment
        load_instance = True

class DocumentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Document
        load_instance = True

class ExileSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Exile
        load_instance = True

class HistorySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = History
        load_instance = True

class IncomeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Income
        load_instance = True

class RecordSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Record
        load_instance = True

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True