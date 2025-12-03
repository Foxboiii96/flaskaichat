from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
import os

app = Flask(__name__)

# Configure the Gemini API key
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Create a Gemini Pro model
model = genai.GenerativeModel('gemini-pro')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json['message']
    response = model.generate_content(user_message)
    return jsonify({'response': response.text})

if __name__ == '__main__':
    app.run(debug=True)
