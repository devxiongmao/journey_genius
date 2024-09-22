from pydantic import BaseModel

class VacationLocation(BaseModel):
    location: str