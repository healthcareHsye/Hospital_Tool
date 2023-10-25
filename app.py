# from flask import Flask

# app = Flask(__name__)

# # Members API route
# @app.route("/members")
# def members():
#     return {"members": ["Member1", "Member2", "Member3"]}

# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask, request, jsonify, render_template, redirect, url_for
import os
from flask_cors import CORS
from flask_cors import cross_origin
# from calculations import calculate_c_chart
import json
from werkzeug.utils import secure_filename
from hospital_model import process_and_plot

# app = Flask(__name__)
app = Flask(__name__)
CORS(app)  # <-- Enable CORS globally

# CORS(app, resources={
#     r"/upload": {"origins": "http://localhost:3000"},
#     r"/compute_c_chart": {"origins": "http://localhost:5000"}
# })
# CORS(app, supports_credentials=True)

# CORS(app, resources={r"/*": {"origins": "*"}})


# Define a route for handling file uploads
@app.route("/upload", methods=["POST"])
def upload():
    try:
        # Check if a file was uploaded with the name "file"
        # if "files" in request:
        #     return jsonify({})
        if "file" not in request.files:
            return jsonify({"error": "No file part"}), 400

        uploaded_file = request.files["file"]

        # Check if the file is empty
        if uploaded_file.filename == "":
            return jsonify({"error": "No selected file"}), 400

        # You can specify the directory where you want to save the uploaded file
        # For example, to save it in a folder called "uploads" in the same directory as your server.py file:
        upload_dir = os.path.join(os.path.dirname(__file__), "uploads")

        # Create the directory if it doesn't exist
        if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)

        # Save the uploaded file to the specified directory
        file_path = os.path.join(upload_dir, uploaded_file.filename)
        uploaded_file.save(file_path)

        return jsonify({"message": "File uploaded successfully", "file_path": file_path}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route("/compute_chart", methods=["GET"])
@cross_origin() 
def compute_chart():
    try:
        data_path = os.path.join(os.path.dirname(__file__), "uploads", "file.xls")
        output_excel_file, graph_filenames = process_and_plot(data_path)

        data = {
            "output_file": output_excel_file,
            "graph_files": graph_filenames
        }
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
        
@app.route('/output')
def output():
    return render_template('output.html')


if __name__ == "__main__":
    app.run(debug=True)
