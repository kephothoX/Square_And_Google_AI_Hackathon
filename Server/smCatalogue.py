from main import app
from fastapi import Response, File, UploadFile
from starlette.requests import Request
from starlette.responses import Response
from fastapi.responses import JSONResponse
from tempfile import TemporaryFile, NamedTemporaryFile
import os, json, io, uuid, requests


from square.client import Client


client = Client(access_token=os.environ["SQUARE_ACCESS_TOKEN"],   environment="sandbox")


@app.get("/api/v1/catalogue/items")
async def getCatalogueItems(req: Request):
    res = client.catalog.list_catalog(
      types = "ITEM"
    )
    
    res = dict(res.body)
    
    return JSONResponse(res["objects"])

@app.post("/api/v1/catalogue/item")
async def getCatalogueItem(req: Request):
    body = await req.body()    
    data = json.loads(body.decode("utf-8"))
    
    res = client.catalog.retrieve_catalog_object(
       object_id = data["id"]
    )

    
    res = dict(res.body)["object"]
    
    return JSONResponse(res)


@app.post("/api/v1/catalogue/new")
async def newCatalogue(req: Request):
    body = await req.body()    
    data = json.loads(body.decode("utf-8"))

    
    res = client.catalog.upsert_catalog_object( body = data )

    if res.is_success():
        catalogue = dict(res.body)["catalog_object"]
         
        if catalogue["id"] is not None:
            return JSONResponse("Catalogue Item Created Successfully.")
       
        else:
            return JSONResponse("Error Creating Catalogue Item.")
    elif res.is_error():
        return JSONResponse(res.errors)
    
    
@app.post("/api/v1/catalogue/image/new")
async def newCatalogueImage(req: Request):
    async with req.form() as form_data:
        body = {
            "idempotency_key": str(uuid.uuid4().hex),
            "image": {
                "type": "IMAGE",
                "id": form_data["id"],
                "image_data": {
                    "name": form_data["name"],
                    "caption": form_data["caption"]        
                }
            }
        }
        
        temp_file = NamedTemporaryFile("w+b", suffix=".{}".format(form_data["attachment"].filename.split('.')[1]), delete=True)
                
        with temp_file as file_obj:
            binary_file = await form_data["attachment"].read()
            
            file_obj.write(binary_file)
            
            files=[
            ("file",(form_data["attachment"].filename , open(temp_file.name, "rb"), form_data["attachment"].content_type))
            ]
            
            res = client.catalog.create_catalog_image(request= body, image_file=open(temp_file.name, "rb"))
    
    
            if "image" in dict(res.body):
                print(dict(res.body)["image"]["image_data"]["url"])
                print(dict(res.body)["image"])
                
                file_obj.close()
                return JSONResponse(dict(res.body)["image"]["image_data"]["url"])
            else:
                
                file_obj.close()
                return JSONResponse("Unsuccessful")     
            
            
            
            
@app.post("/api/v1/catalogue/search")
async def newCatalogue(req: Request):
    body = await req.body()    
    data = json.loads(body.decode("utf-8"))

    
    res = client.catalog.search_catalog_objects( body = data )

    if res.is_success():
        catalogue = dict(res.body)["objects"]
         
        print(catalogue)
        if catalogue["id"] is not None:
            return JSONResponse(catalogue)
       
        else:
         
            return JSONResponse("No Catalogue Item Found.")
    elif res.is_error():
        return JSONResponse(res.errors)