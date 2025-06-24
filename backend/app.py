from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

symptom_db = {
    "dog": {
        "vomiting": "Your dog might have eaten something bad. Keep it hydrated. Visit vet if it continues.",
        "shaking": "Your dog might be cold, anxious, or in pain. Observe and consult a vet if it persists."
    },
    "cat": {
        "coughing": "Your cat could have a hairball or an infection. If coughing persists, see a vet.",
        "not eating": "Appetite loss could be stress or illness. Try offering favorite food and monitor."
    }
}

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    pet_type = data.get('pet_type', '').lower()
    symptom = data.get('symptom', '').lower()

    matched_advice = "Sorry, we couldn't find advice for that symptom."

    for key in symptom_db.get(pet_type, {}):
        if key in symptom:
            matched_advice = symptom_db[pet_type][key]
            break

    return jsonify({"advice": matched_advice})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
