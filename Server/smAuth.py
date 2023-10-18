from main import app
from fastapi import Response
from starlette.requests import Request
from starlette.responses import Response
from pydantic import BaseModel
from fastapi.responses import JSONResponse
import requests, os, json

from square.client import Client


client = Client(access_token=os.environ["SQUARE_ACCESS_TOKEN"],   environment="sandbox")


@app.get("/api/v1/locations")
async def getLocations(req: Request):    
    res =  client.locations.list_locations()
    
    if res.is_success():
        res = dict(res.body)["locations"][0]
        
        print(res)
        
        return JSONResponse(res)
    elif res.is_error():
        print(res.errors)
    