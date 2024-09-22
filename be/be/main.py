from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dtos import VacationLocation
import json
import anthropic

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/query')
async def root(vacation_spot: VacationLocation):
	client = anthropic.Anthropic()

	message = client.messages.create(
	    model="claude-3-5-sonnet-20240620",
	    max_tokens=1000,
	    temperature=0,
	    system="You are a world-class travel expert. Respond only with itinerary suggestions for users based on the their inputted vacation destination. Assume a vacation length of two weeks.",
	    messages=[
	        {
	            "role": "user",
	            "content": [
	                {
	                    "type": "text",
	                    "text": f"Vacation destination: {vacation_spot.location}"
	                }
	            ]
	        }
	    ]
	)

	return {"response": message.content}
