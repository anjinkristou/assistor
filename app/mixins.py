from app import db

class CRUDMixin(object):
    __table_args__ = {'extend_existing': True}
    
    def update(self, **kwargs):
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)
        db.session.commit()
    
    @classmethod
    def create(cls, **kwargs):
        item = cls(**kwargs)
        db.session.add(item)
        db.session.commit()
        return item
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def save(self, commit=True):
        db.session.add(self)
        db.session.commit()