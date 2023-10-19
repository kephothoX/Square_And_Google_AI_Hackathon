from main import app
from fastapi import Response
from starlette.requests import Request
from starlette.responses import Response
from fastapi.responses import JSONResponse
import requests, os, json, base64

from typing import Sequence

import vertexai
from vertexai.language_models import ChatModel, InputOutputTextPair, TextGenerationModel, TextEmbeddingModel
from vertexai.vision_models import ImageTextModel, Image

from google.cloud import vision

vertexai.init(project=os.environ["GCLOUD_PROJECT_ID"], location="us-central1")

from square.client import Client
client = Client(access_token=os.environ["SQUARE_ACCESS_TOKEN"],   environment="sandbox")

model = TextGenerationModel.from_pretrained("text-bison@001")

def encode_image(image):
    with open(image, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())
    return encoded_string


def analyze_image_from_uri(
    image_uri: str,
    feature_types: Sequence,
) -> vision.AnnotateImageResponse:
    client = vision.ImageAnnotatorClient()

    image = vision.Image()
    image.source.image_uri = image_uri
    features = [vision.Feature(type_=feature_type) for feature_type in feature_types]
    request = vision.AnnotateImageRequest(image=image, features=features)

    response = client.annotate_image(request=request)

    return response


def print_labels(response: vision.AnnotateImageResponse):
    print("=" * 80)
    for label in response.label_annotations:
        print(
            f"{label.score:4.0%}",
            f"{label.description:5}",
            sep=" | ",
        )
        
        
        
        
        
        

@app.post("/api/v1/gen-catalogue-item-description")
async def generateProductDescription(req: Request):
    body = await req.body()    
    data = json.loads(body.decode("utf-8"))     

    chat_model = TextGenerationModel.from_pretrained("text-bison@001")
    
    data = "given a product {} generate a SEO Optimized description of the product".format(data["attrs"])

    parameters = {
        "temperature": 0.8,  
        "max_output_tokens": 256,
        "top_p": 0.95, 
        "top_k": 40,
    }


    chat =  chat_model.predict(data,**parameters)
    
    if chat.text:
        print(chat.text)
        return JSONResponse(chat.text)
    else:
        return JSONResponse("We Need More Data.")
    

  
     


async def Imagen(req: Request):
    model = ImageTextModel.from_pretrained("imagetext@001")

    source_image = Image.load_from_file(location='/home/kephotho/Pictures/vlcsnap-2021-11-20-12h40m43s370.png')

    captions = model.get_captions(
        image=source_image,
        # Optional:
        number_of_results=2,
        language="en",
    ).tolist()
    
    print(captions)
    
    
    

    

#gs://safumarket.appspot.com/pexels-karolina-grabowska-5632402.jpg

@app.post("/api/v1/catalogue/image/search")
async def describeImage(req: Request):    
    body = await req.body()    
    data = json.loads(body.decode("utf-8")) 
    """Provides a quick start example for Cloud Vision."""

    vision_client = vision.ImageAnnotatorClient()

    file_uri = data["filePath"]

    image = vision.Image()
    image.source.image_uri = file_uri

    response = vision_client.label_detection(image=image)
    labels = response.label_annotations

    keywords = []
    print("Labels:")
    for label in labels:
        keywords.append(label.description)
        print(label)
        print(label.description)
        
    print(keywords[0:3])

    result = client.catalog.search_catalog_objects(
      body = {
        "query": {
          "text_query": {
            "keywords": keywords[0:3]
          }
        }
      }
    )

    if result.is_success():
        print(result.body)
    elif result.is_error():
        print(result.errors)

