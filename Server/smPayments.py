from main import app
from fastapi import Response, File, UploadFile
from starlette.requests import Request
from starlette.responses import Response
from fastapi.responses import JSONResponse
from tempfile import TemporaryFile, NamedTemporaryFile
import os, json, io, uuid, requests


from square.client import Client


client = Client(access_token=os.environ["SQUARE_ACCESS_TOKEN"],   environment="sandbox")

@app.post("/api/v1/payments/now")
async def payNow(req: Request):
    body = await req.body()    
    data = json.loads(body.decode("utf-8"))
    
    
    
    res = client.checkout.create_payment_link(body = data )

    if res.is_success():
        result = dict(res.body)["payment_link"]["url"]
        
        return JSONResponse(result)
    elif res.is_error():
        return JSONResponse(res.errors)