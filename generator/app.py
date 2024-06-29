from flask import Flask, request, jsonify
from model import GenerativeModel

app = Flask(__name__)

# Initialize the GenerativeModel
model = GenerativeModel('gemini-pro')

@app.route('/generate', methods=['POST'])
def generate():
    # Get data from the POST request
    data = request.get_json()

    # Extract components and project_details from the request data
    components = data.get('components', [])
    project_details = data.get('project_details', '')

    if not project_details:
        return jsonify({'error': 'Project details are required'}), 400
    if not components:
        return jsonify({'error': 'Components list cannot be empty'}), 400

    # Generate Arduino code and wiring guide using model.py
    generated_code = model.generate_arduino_code(project_details, components)
    # wiring_guide = model.generate_wiring_guide(components)

    # Return the generated code and wiring guide as JSON response
    return jsonify({
        'generated_code': generated_code,
    })

if __name__ == '__main__':
    app.run(debug=True)
