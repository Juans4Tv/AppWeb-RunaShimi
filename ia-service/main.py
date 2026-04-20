from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return jsonify({"message": "IA Traduktor"})

@app.route("/translate", methods=["POST"])
def translate():
    try:
        data = request.get_json()
        if not data:
            data = {}
    except:
        data = {}
    
    text = data.get("text", "") if data else ""
    to_esp = data.get("to_español", False) if data else False
    
    demo_es_kic = {
        "hola": "imanalla",
        "gracias": "yupaychani", 
        "casa": "wasi",
        "agua": "yaku",
        "tierra": "allpa",
        "sol": "inti",
        "luna": "killa"
    }
    
    demo_kic_es = {
        "imanalla": "hola",
        "yupaychani": "gracias",
        "wasi": "casa",
        "yaku": "agua",
        "allpa": "tierra",
        "inti": "sol",
        "killa": "luna"
    }
    
    text_lower = text.lower().strip() if text else ""
    diccionario = demo_kic_es if to_esp else demo_es_kic
    
    for k, v in diccionario.items():
        if k in text_lower:
            return jsonify({"input": text, "translated_text": v})
    
    return jsonify({"input": text, "translated_text": "[sin traducción]"})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001)