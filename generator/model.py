# model.py
import os
from dotenv import load_dotenv
import google.generativeai as ai

# Load environment variables from .env file
load_dotenv()
# Set the API key for Google Generative AI
ai.configure(api_key=os.environ['GOOGLE_API_KEY'])

class GenerativeModel:
    def __init__(self, model_name):
        self.model_name = model_name
        self.model = ai.GenerativeModel(model_name)

    def generate_arduino_code(self, project_details, components):
        # Adjust the prompt format based on your model's requirements
        prompt = f"Generate Arduino (.ino) code for: {project_details}\nComponents: {components}"
        
        # Generate content using the model
        response = self.model.generate_content(prompt)
        
        return response.text.strip()  # Return the generated code as a string