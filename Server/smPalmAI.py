from main import app
from fastapi import Response
from starlette.requests import Request
from starlette.responses import Response
from fastapi.responses import JSONResponse
import requests, os, json
import google.generativeai as palm

palm.configure(api_key = os.environ["PALM_API_KEY"])



@app.post("/api/v1/prompt")
async def Prompt(req: Request):
    body = await req.body()    
    data = json.loads(body)
    
    print(data)
    
    models = [m for m in palm.list_models() if 'generateText' in m.supported_generation_methods]
    model = models[0].name
    res = palm.generate_text(
        model = model,
        prompt= data["text"],
        temperature=0,
        max_output_tokens=800,
    )
    
    return JSONResponse(res.result)


@app.post("/api/v1/summarize")
async def Summarize(req: Request):
    body = await req.body()    
    data = json.loads(body)
    
    defaults = {
      'model': 'models/text-bison-001',
      'temperature': 0.6,
      'candidate_count': 1,
      'top_k': 40,
      'top_p': 0.95,
      'max_output_tokens': 1024,
      'stop_sequences': [],
      'safety_settings': [{"category":"HARM_CATEGORY_DEROGATORY","threshold":1},{"category":"HARM_CATEGORY_TOXICITY","threshold":1},{"category":"HARM_CATEGORY_VIOLENCE","threshold":2},{"category":"HARM_CATEGORY_SEXUAL","threshold":2},{"category":"HARM_CATEGORY_MEDICAL","threshold":2},{"category":"HARM_CATEGORY_DANGEROUS","threshold":2}],
    }
        
    prompt = "Summarize ths paragraph and detail some relevant context. Text: {} Summary: ".format(data["text"]) 

    res = palm.generate_text(
        **defaults,
        prompt=prompt
    )
    
    return JSONResponse(res.result)




@app.post("/api/v1/chat")
async def Chat(req: Request):
    body = await req.body()    
    data = json.loads(body)
    
    
    defaults = {
      'model': 'models/chat-bison-001',
      'temperature': 0.25,
      'candidate_count': 1,
      'top_k': 40,
      'top_p': 0.95,
    }
    
    context = chat_data.context
    examples = []
    messages = [ chat_data.text  ]
    messages.append("NEXT REQUEST")
    response = palm.chat(
        **defaults,
        context=context,
        examples=examples,
        messages=messages
    )
    
    return JSONResponse(response.last)




