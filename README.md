# sokuresu
ChatGPTのAPIを使って「めんどくさいメッセージ」の返信を考えてくれるアプリです

# 前提
前提としてpythonの環境が揃っていることとする

# 手順
1. 適当なディレクトリに置く。
2. 必要なモジュールをインストール
```
pip install fastapi
pip install langchain
pip install fastapi uvicorn[standard]
pip install starlette
pip install python-multipart
pip install pydantic
```

4. 実行
・以下のコードをターミナル上で実行
```
 uvicorn main:app --reload
```
・index.htmlを開く


5. 「index.html」をブラウザで開く 

5-1. APIキーを入力。（発行方法はcustom.html、ブラウザ上の「使い方へ」に記載）<br>
5-2. テキストボックスに適当な文字を入力後、「送信」をクリック  <br>
5-3. 数秒後、結果が出力されれば実行完了<br>
5-4. カスタムシート機能の使い方はブラウザ上の「カスタムシートの使い方はこちら」に記載。<br>
※google chromeなど一部ブラウザではcookieの使用に制限がかかっている場合があります。FireFoxなどのブラウザをお使いください。
