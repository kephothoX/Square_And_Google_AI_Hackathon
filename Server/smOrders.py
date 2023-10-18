from main import app
from fastapi import Response, File, UploadFile
from starlette.requests import Request
from starlette.responses import Response
from fastapi.responses import JSONResponse
from tempfile import TemporaryFile, NamedTemporaryFile
import os, json, io, uuid, requests


from square.client import Client


client = Client(access_token=os.environ["SQUARE_ACCESS_TOKEN"],   environment="sandbox")


@app.post("/api/v1/orders/new")
async def createOrder(req: Request):
    body = await req.body()    
    data = json.loads(body.decode("utf-8"))
    
    res = client.orders.create_order(body = data)

    if res.is_success():
        return JSONResponse(dict(res.body)["order"])
    elif res.is_error():
        return JSONResponse(res.errors)

@app.post("/api/v1/orders/get")
async def getOrders(req: Request):
    body = await req.body()    
    data = json.loads(body.decode("utf-8"))
    
    res = client.orders.search_orders(body = data )
    
    
    if res.is_success():
        return JSONResponse(dict(res.body)["orders"])
    elif res.is_error():
        return JSONResponse(res.errors)
    
    
@app.post("/api/v1/orders/calculate")
async def calculateOrder(req: Request):
    body = await req.body()    
    data = json.loads(body.decode("utf-8"))
    
    
    res = client.orders.calculate_order(body = data ) 

    if res.is_success():
        res = dict(res.body)["order"]
        print(res)
        
        return JSONResponse(res)
    elif res.is_error():
        return JSONResponse(res.errors)