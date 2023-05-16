#def get_all():

#def get_one():

#def add_one():

#def delete_one():

#def find_by_id():

def get_all_documents():
  json_data=[]
  document_schema = DocumentSchema()
  documents = Document.query.all()
    for doc in documents:
      json_data.append(document_schema.dump(doc))
  return json_data