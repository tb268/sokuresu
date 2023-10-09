#uvicorn main:app --reload

from starlette.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Form,Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from chatgpt_module import send_question_chatgpt
from pydantic import BaseModel, model_validator #追加


app = FastAPI()
templates = Jinja2Templates(directory="")
#origins例
#origins=["http://example.com"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 本番環境ではセキュリティ上制限が必要。
    #allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
   return {"Hello": "World"}





#入れるモデルーーーーーーーーーーーーーーーーー
class Data(BaseModel):
    text: str
    talk_type: str
    cookies : list
    api_key: str    


@app.post("/gpt")#./chatgptのurlへ送信されたもの
async def send_question(data:Data):
    question_text=data.text.replace("\n"," ")
    
    api=data.api_key
    cookie=[]

    for i in range(len(data.cookies)):
        cookie.append([])
        for j in range(len(data.cookies[i])):
            cookie[i].append(data.cookies[i][j].replace("\n"," "))

    print(cookie)
    res = send_question_chatgpt(question_text,data.talk_type,cookie,api)
    print(question_text)
    print(res)
    ans1=res.splitlines()[0][2:]
    ans2=res.splitlines()[1][2:]
    ans3=res.splitlines()[2][2:]

    #return res
    return ans1,ans2,ans3
