from api import db

deal_contacts_table = db.Table('deal_contacts',
                               db.Column('deal_id', db.ForeignKey('deals.id'), primary_key=True),
                               db.Column('contact_id', db.ForeignKey('contacts.id'), primary_key=True)
                            )