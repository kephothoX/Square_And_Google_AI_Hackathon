from fastapi import FastAPI
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "https://zuri-genesys.web.app",
    "http://localhost",
    "http://localhost:4201",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


os.environ["PALM_API_KEY"] = "*******"
os.environ["SQUARE_APPLICATION_ID"]  = "*******"
os.environ["SQUARE_APPLICATION_SECRET"] = "********"
os.environ["SQUARE_ACCESS_TOKEN"] = "*******"
os.environ["GCLOUD_PROJECT_ID"] = "********"



import smPalmAI
import smAuth
import smCustomers
import smCatalogue
import smOrders
import smInvoices
import smVertexAI
import smPayments



