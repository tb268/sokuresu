#実行
#uvicorn main:app --reload
import json
from langchain import LLMChain
from langchain.chat_models import ChatOpenAI
from langchain.prompts.few_shot import FewShotPromptTemplate
from langchain.prompts.prompt import PromptTemplate


def send_question_chatgpt(question_text,talk_type,cookies,api_key):
    dict_of_type={"敬語":0,"タメ語":1,"カスタム":3}
    #model_name = "gpt-4"
    #↓が出たら文字数多すぎ
    #openai.error.InvalidRequestError: The model `gpt-4-32k` does not exist or you do not have access to it. Learn more: https://help.openai.com/en/articles/7102672-how-can-i-access-gpt-4.
    model_name = "gpt-3.5-turbo-16k"
    chat = ChatOpenAI(
        model_name=model_name,
        openai_api_key=api_key,
        temperature=0.1,
    )
    talk_type_prompt=talk_type
    if dict_of_type[talk_type]==0:
        # 例文読み込み(敬語)ーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
        messages = [
            {
                "question": "おはよー！",
                "answer": f"""
                1:おはようございます。今日もよろしくお願いします。
                2:おはようございます！今日もよろしくお願いします！
                3:おはようございます！早起きですね！今日の予定はなんですか？
                """
                ,
            },
            {
            "question": "今日は楽しかった！ありがとうございます！",
            "answer": f"""
                1:ありがとうございました。今後もよろしくお願いします。
                2:ありがとうございました！私も楽しかったです！また今度もよろしくお願いします！
                3:ありがとうございました！楽しかったです！今日やった事のどれが一番良かったですか？
            """
                ,
            },
            {
            "question": "今日行った水族館、イルカショーがすごかったですね",
            "answer": f"""
                1:そうですね。近くで見れて迫力がすごかったです。
                2:そうですね！水飛沫が多くて驚きました！
                3:本当に楽しかったですね！水飛沫が多くて驚きました！イルカ好きなんですか？
            """,
            },
            {
            "question": "今度あるパーティー面白そうですね！",
            "answer": f"""
                1:いいですね。すごく楽しそうです。
                2:面白そうですね！どんな雰囲気なのかすごく興味あります！
                3:面白そうですね！興味あります！いつやるんですか？
            """,
            },
        ]
    elif dict_of_type[talk_type]==1:
        # 例文読み込み(ため語)ーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
        messages = [
            {
                "question": "おはようございます",
                "answer": f"""
                1:おはよう！元気そうで何よりだね。
                2:おはよー！元気？
                3:おはよー！朝から元気だね。今日の予定は何かある？
                """
                ,
            },
            {
            "question": "今日は楽しかったです！ありがとうございます！",
            "answer": f"""
                1:楽しめたならよかった！またよろしくね！
                2:こっちも楽しかったよ！ありがとう！
                3:本当に楽しかったね！どれが一番良かった？
            """
                ,
            },
            {
            "question": "今日行った水族館、イルカショーがすごかった！",
            "answer": f"""
                1:そうだね、イルカショー最高だった！
                2:本当に最高の時間だったね、感動的だったよ
                3:本当に楽しかったね！イルカショーが印象的だったけど、他はどこが楽しかった？
            """,
            },
            {
            "question": "今度あるパーティー面白そうですね！",
            "answer": f"""
                1:いいね！すごく楽しそう！
                2:面白そうだね！どんな雰囲気なんだろう？
                3:へー面白そう！パーティーって興味あるな〜いつやるの？
            """,
            }
        ]
    elif dict_of_type[talk_type]==3:#カスタムの場合ーーーーーーーーーー
        talk_type_prompt=""
        messages=[]
        for i in range(len(cookies)):
            

            messages.append({
                "question": str(cookies[i][0]),
                "answer": f"""
                1:{str(cookies[i][1])}
                2:{str(cookies[i][2])}
                3:{str(cookies[i][3])}
                """
                
                })
        

        
    
    example_prompt = PromptTemplate(
        input_variables=["question", "answer"],
        template="""{question}\n{answer}""",
    )

    prompt = FewShotPromptTemplate(
        examples=messages,
        example_prompt=example_prompt,
        prefix=f"""
            # 命令書:
              あなたはチャットアプリをしています。
              今からくる入力文に対し、出力してください。
            
            # 制約条件
              ・必ず3行のみ出力すること
              ・一行ごとに独立した文章にすること
              ・1行目は1:2行目は2:3行目は3:を先頭につけること
              ・無駄に行を開けない
              {talk_type_prompt}
            """,
        suffix="Question: {input}",
        input_variables=["input"],
    )
    chain = LLMChain(llm=chat, prompt=prompt)
    res = chain.run(question_text)

    return res




