class Contact(object):
    name = None
    occupation = None
    url = None

    def __init__(
        self,
        name=None,
        occupation=None,
        url=None
    ):

        self.name = name
        self.occupation = occupation
        self.url = url

    def __repr__(self):
        return "{name} ({occupation})".format(
            name=self.name, occupation=self.occupation
        )


class Institution(object):
    institution_name = None
    website = None
    industry = None
    type = None
    headquarters = None
    company_size = None
    founded = None

    def __init__(
        self,
        name=None,
        website=None,
        industry=None,
        type=None,
        headquarters=None,
        company_size=None,
        founded=None,
    ):
        self.name = name
        self.website = website
        self.industry = industry
        self.type = type
        self.headquarters = headquarters
        self.company_size = company_size
        self.founded = founded


class Experience(Institution):
    from_date = None
    to_date = None
    description = None
    position_title = None
    duration = None
    company_name = None
    company_url = None

    def __init__(
        self,
        from_date=None,
        to_date=None,
        description=None,
        position_title=None,
        duration=None,
        location=None,
        company_name=None,
        company_url=None,
    ):
        self.from_date = from_date
        self.to_date = to_date
        self.description = description
        self.position_title = position_title
        self.duration = duration
        self.location = location
        self.company_name = company_name
        self.company_url = company_url

    def __repr__(self):
        return "{position_title} at {company} from {from_date} to {to_date} for {duration} based at {location}".format(
            from_date=self.from_date,
            to_date=self.to_date,
            position_title=self.position_title,
            company=self.company_name,
            duration=self.duration,
            location=self.location,
        )


class Education(Institution):
    from_date = None
    to_date = None
    description = None
    degree = None

    def __init__(self, from_date=None, to_date=None, description=None, degree=None):
        self.from_date = from_date
        self.to_date = to_date
        self.description = description
        self.degree = degree

    def __repr__(self):
        return "{degree} at {company} from {from_date} to {to_date}".format(
            from_date=self.from_date,
            to_date=self.to_date,
            degree=self.degree,
            company=self.institution_name,
        )


class Interest(Institution):
    title = None

    def __init__(self, title=None):
        self.title = title

    def __repr__(self):
        return self.title


class Accomplishment(Institution):
    category = None
    title = None

    def __init__(self, category=None, title=None):
        self.category = category
        self.title = title

    def __repr__(self):
        return self.category + ": " + self.title
