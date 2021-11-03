from api import db

contact_tags_table = db.Table('contact_tags',
                               db.Column('contact_id', db.ForeignKey('contacts.id'), primary_key=True),
                               db.Column('tag_id', db.ForeignKey('tags.id'), primary_key=True)
                            )