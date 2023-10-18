from main import app
from fastapi import Response, File, UploadFile
from starlette.requests import Request
from starlette.responses import Response
from fastapi.responses import JSONResponse
from tempfile import TemporaryFile, NamedTemporaryFile
import os, json, io, uuid, requests


from square.client import Client


client = Client(access_token=os.environ["SQUARE_ACCESS_TOKEN"],   environment="sandbox")



@app.post("/api/v1/invoices/create")
async def createInvoice(req: Request):
    body = await req.body()    
    data = json.loads(body.decode("utf-8"))
        
    
    res = client.invoices.create_invoice(body = data )

    if res.is_success():
        res = dict(res.body)["invoice"]
        
        return JSONResponse(res)
    elif res.is_error():
        return JSONResponse(res.errors)


@app.post("/api/v1/invoices/list")
async def listInvoices(req: Request):
    body = await req.body()    
    data = json.loads(body.decode("utf-8"))
        
    
    res = client.invoices.list_invoices( location_id = data["loc_id"])
    
    if res.is_success():
        print(dict(res.body))
        res = dict(res.body)["invoices"]
        
        return JSONResponse(res)
    elif res.is_error():
        return JSONResponse(res.errors)


@app.post("/api/v1/invoices/publish")
async def publishInvoice(req: Request):
    body = await req.body()    
    data = json.loads(body.decode("utf-8"))
        
    
    res = client.invoices.publish_invoice( invoice_id = data["invoice_id"],
      body = {
        "version": data["version"]
      }
    )

    if res.is_success():
        res = dict(res.body)["invoice"]
        
        return JSONResponse(res)
    elif res.is_error():
        return JSONResponse(res.errors)


@app.post("/api/v1/invoices/cancel")
async def publishInvoice(req: Request):
    body = await req.body()    
    data = json.loads(body.decode("utf-8"))
        
    
    res = client.invoices.cancel_invoice( invoice_id = data["invoice_id"],
      body = {
        "version": data["version"]
      }
    )

    if res.is_success():
        res = dict(res.body)["invoice"]
        
        return JSONResponse(res)
    elif res.is_error():
        return JSONResponse(res.errors)
