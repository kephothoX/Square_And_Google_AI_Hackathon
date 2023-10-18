from main import app
from fastapi import Response
from starlette.requests import Request
from starlette.responses import Response
from fastapi.responses import JSONResponse
import requests, os, json

from square.client import Client


client = Client(access_token=os.environ["SQUARE_ACCESS_TOKEN"],   environment="sandbox")


@app.post("/api/v1/customer/email")
async def getCustomer(req: Request):
    body = await req.body()
    
    data = json.loads(body.decode("utf-8"))
    
    res = client.customers.search_customers(
        body = {
            "limit": 1,
            "query": {
                "filter": {
                    "email_address": {
                        "exact": data["email"]
                    }
                }
            }
        }
    )
    
    if res.is_success():
        
        if res.body == {}:
            return JSONResponse("NoneExists")
        
        else:
            return JSONResponse(dict(res.body)["customers"])
    elif res.is_error():
       return JSONResponse("Error")
   
   
@app.post("/api/v1/customer/new")
async def newCustomer(req: Request):
    body = await req.body()
    
    data = json.loads(body.decode("utf-8")) 
    
    print(data)
    
    res = client.customers.create_customer(data);
    
    res = dict(res.body)["customer"]
    
    if res["id"] is not None:        
        return JSONResponse("Customer {} created successfully.".format(res["email_address"]))
        
    else:
        return JSONResponse("Server Error")