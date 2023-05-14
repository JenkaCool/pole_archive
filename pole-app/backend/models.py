from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.mysql import TINYINT
from datetime import datetime

db = SQLAlchemy()

class Attachment(db.Model):
  __tablename__ = 'tblattachment'
  atc_id = db.Column(db.Integer, primary_key=True)
  elx_id = db.Column(db.Integer, nullable=False)
  atc_type = db.Column(db.String(255), nullable=False)
  atc_url = db.Column(db.Text, nullable=False)
  atc_serial_num = db.Column(db.Integer, nullable=True)
  atc_add_info = db.Column(db.Text, nullable=True)
  atc_creator_id = db.Column(db.Integer, nullable=False, default=0)
  atc_creating_date = db.Column(db.DateTime, default=datetime.utcnow)
  atc_is_removed = db.Column(TINYINT(1, unsigned=True), nullable=False, default=0)
  atc_visible_mode = db.Column(db.Integer, nullable=False, default=0)

  def __repr__(self):
      return '<Attachment %r>' % self.atc_id


class Document(db.Model):
  __tablename__ = 'tbldocument'
  doc_id = db.Column(db.Integer, primary_key = True)
  doc_fund = db.Column(db.String(100), nullable=True)
  doc_inventory = db.Column(db.String(100), nullable=True)
  doc_storage_unit = db.Column(db.String(100), nullable=True)
  doc_total_lists_num = db.Column(db.Integer, nullable=True)
  doc_year = db.Column(db.Integer, nullable=False, unique=True)
  doc_additional_info = db.Column(db.Text, nullable=True)
  doc_url = db.Column(db.Text, nullable=True)
  doc_creator_id = db.Column(db.Integer, nullable=False, default=0)
  doc_creating_date = db.Column(db.DateTime, default=datetime.utcnow)
  doc_is_removed = db.Column(TINYINT(1, unsigned=True), nullable=False, default=0)
  doc_visible_mode = db.Column(db.Integer, nullable=False, default=0)

  def __repr__(self):
      return '<Document %r>' % self.doc_id

  def get_document_id(self):
      return self.doc_id


class Exile(db.Model):
  __tablename__ = 'tblexile'
  exl_id = db.Column(db.Integer, primary_key=True)
  exl_full_name = db.Column(db.String(255), nullable=False)
  exl_gender = db.Column(db.String(8), nullable=False)
  exl_rank = db.Column(db.String(150), nullable=True)
  exl_province = db.Column(db.String(100), nullable=True)
  exl_order_num = db.Column(db.String(1000), nullable=True)
  exl_order_date = db.Column(db.String(1000), nullable=True)
  exl_order_info = db.Column(db.Text, nullable=True)
  exl_steward = db.Column(db.Text, nullable=True)
  exl_order_reason = db.Column(db.Text, nullable=False)
  exl_supervision_start_date = db.Column(db.String(50), nullable=True)
  exl_supervision_place = db.Column(db.String(70), nullable=True)
  exl_departure_place = db.Column(db.String(70), nullable=True)
  exl_income_flag = db.Column(TINYINT(1, unsigned=True), nullable=False, default=0)
  exl_mar_status = db.Column(db.String(100), nullable=True)
  exl_family_info = db.Column(db.Text, nullable=True)
  exl_cur_state = db.Column(db.Text, nullable=True)
  exl_add_info = db.Column(db.Text, nullable=True)
  exl_creator_id = db.Column(db.Integer, nullable=False, default=0)
  exl_creating_date = db.Column(db.DateTime, default=datetime.utcnow)
  exl_is_removed = db.Column(TINYINT(1, unsigned=True), nullable=False, default=0)
  exl_visible_mode = db.Column(db.Integer, nullable=False, default=0)

  def __repr__(self):
      return '<Exile %r>' % self.exl_id

  def get_exile_id(self):
      return self.exl_id


class History(db.Model):
  __tablename__ = 'tblhistory'
  log_id = db.Column(db.Integer, primary_key=True)
  log_editor_id = db.Column(db.Integer, nullable=False)
  log_changed_table = db.Column(db.Text, nullable=True)
  log_changed_field_name = db.Column(db.Text, nullable=True)
  log_changed_field_id = db.Column(db.Integer, nullable=True)
  log_date = db.Column(db.DateTime, default=datetime.utcnow)
  log_status = db.Column(db.Integer, nullable=False)
  log_description = db.Column(db.Text, nullable=True)

  def __repr__(self):
      return '<History %r>' % self.log_id


class Income(db.Model):
  __tablename__ = 'tblincome'
  inc_id = db.Column(db.Integer, primary_key=True)
  exl_id = db.Column(db.Integer, nullable=False)
  inc_amount = db.Column(db.Float(20,2), nullable=True)
  inc_currency = db.Column(db.String(50), nullable=True)
  inc_source = db.Column(db.String(500), nullable=True)
  inc_reason = db.Column(db.Text, nullable=False)
  inc_period = db.Column(db.String(100), nullable=True)

  def __repr__(self):
      return '<Income %r>' % self.exl_id


class Record(db.Model):
  __tablename__ = 'tblrecord'
  rec_id = db.Column(db.Integer, primary_key=True)
  doc_id = db.Column(db.Integer, nullable=False)
  exl_id = db.Column(db.Integer, nullable=False)
  rec_list_num = db.Column(db.Integer, nullable=True)
  rec_creator_id = db.Column(db.Integer, nullable=False, default=0)
  rec_creating_date = db.Column(db.DateTime, default=datetime.utcnow)
  rec_is_removed = db.Column(TINYINT(1, unsigned=True), nullable=False, default=0)
  rec_visible_mode = db.Column(db.Integer, nullable=False, default=0)

  def __repr__(self):
      return '<Record %r>' % self.rec_id

  def get_exile_id(self):
      return self.exl_id

  def get_document_id(self):
      return self.exl_id


class User(db.Model):
  __tablename__ = 'tbluser'
  usr_id = db.Column(db.Integer, primary_key=True)
  usr_role = db.Column(db.String(100), nullable=False, default="user")
  usr_username = db.Column(db.String(255), nullable=False)
  usr_hashed_password = db.Column(db.String(255), nullable=False)
  usr_salt = db.Column(db.String(1024), nullable=False)
  usr_email = db.Column(db.String(255), nullable=True)
  usr_registration_date = db.Column(db.DateTime, default=datetime.utcnow)
  usr_is_removed = db.Column(TINYINT(1, unsigned=True), nullable=False, default=0)

  def __repr__(self):
      return '<User %r>' % self.usr_id
