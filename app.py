from _curses import flash

from flask import Flask, render_template, request, redirect, url_for, jsonify, session
import os
from flask_cors import CORS
from flask_cors import cross_origin
# from calculations import calculate_c_chart
import json
from flask_cors import CORS
from flask_cors import cross_origin
from werkzeug.utils import secure_filename

from hm_inputmatrices import hm_inputmatrices
from hospital_model import process_and_plot

# app = Flask(__name__)

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = os.urandom(24)

input_matrices = {
    'probability_list_ip': [],
    'stay_length_list_ip': [],
    'new_patients_list_ip': [],
    'census_day0_data_ip': [],
    'inventory_perpatient_perday_ip': [],
    'inventory_given_ip': []
}


@app.route('/upload', methods=['POST'])
def upload():
    global input_matrices
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

        (
            probability_list_ip,
            stay_length_list_ip,
            new_patients_list_ip,
            census_day0_data_ip,
            inventory_perpatient_perday_ip,
            inventory_given_ip
        ) = hm_inputmatrices(file_path)

        input_matrices = {
            'probability_list_ip': probability_list_ip,
            'stay_length_list_ip': stay_length_list_ip,
            'new_patients_list_ip': new_patients_list_ip,
            'census_day0_data_ip': census_day0_data_ip,
            'inventory_perpatient_perday_ip': inventory_perpatient_perday_ip,
            'inventory_given_ip': inventory_given_ip
        }

        return jsonify({"message": "File uploaded successfully", "file_path": file_path}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/compute_chart", methods=["GET"])
@cross_origin()
def compute_chart():
    try:
        data_path = os.path.join(os.path.dirname(__file__), "uploads", "file.xls")

        # input_matrices = session.get('input_matrices')

        print("Type of input_matrices:", type(input_matrices))
        print("Content of input_matrices:", input_matrices)

        if input_matrices is None:
            return "Input matrices are not set", 400

        # Now input_matrices is a list of lists, convert string inputs to the appropriate data type if necessary

        probability_list_ip = [[float(cell) for cell in row] for row in
                               input_matrices['probability_list_ip']]
        stay_length_list_ip = [[int(cell) for cell in row] for row in
                               input_matrices['stay_length_list_ip']]
        new_patients_list_ip = [[int(cell) for cell in row] for row in
                                input_matrices['new_patients_list_ip']]
        census_day0_data_ip = [[int(cell) for cell in row] for row in input_matrices[
            'census_day0_data_ip']]  # Assuming this is already in the correct format
        inventory_perpatient_perday_ip = [[int(cell) for cell in row] for row in
                                          input_matrices['inventory_perpatient_perday_ip']]
        inventory_given_ip = [[int(cell) for cell in row] for row in
                              input_matrices['inventory_given_ip']]

        output_excel_file, graph_filenames = process_and_plot(probability_list_ip,
                                                              stay_length_list_ip,
                                                              new_patients_list_ip,
                                                              census_day0_data_ip,
                                                              inventory_perpatient_perday_ip,
                                                              inventory_given_ip)
        bed_demand_images = [filename for filename in graph_filenames if 'Bed_Demand' in filename]

        equipment_demand_images = [filename for filename in graph_filenames if
                                   'Consumption' in filename]

        data = {
            "output_file": output_excel_file,
            "graph_files": graph_filenames,
            "bed": bed_demand_images,
            "equipment": equipment_demand_images
        }
        # return redirect(url_for('output', data=json.dumps(data)))
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/inputs')
def inputs():
    # global input_matrices
    # if input_matrices is None:
    #     return "Input matrices are not initialized", 400
    return render_template('inputs.html', input_matrices=input_matrices)


@app.route('/output')
def output():
    return render_template('output.html')


@app.route('/update_inputs', methods=['POST'])
def update_inputs():
    global input_matrices
    form_data = request.form.to_dict(flat=False)
    # Initialize a temporary dictionary to store the updated matrices
    updated_matrices = {key: [] for key in input_matrices.keys()}
    # Iterate over the form data
    for key, values in form_data.items():
        matrix_name, row_index, col_index = key.rsplit('_', 2)
        row_index, col_index = int(row_index), int(col_index)
        # Ensure the matrix has enough rows
        while len(updated_matrices[matrix_name]) <= row_index:
            updated_matrices[matrix_name].append([])
        # Ensure the row has enough columns
        while len(updated_matrices[matrix_name][row_index]) <= col_index:
            updated_matrices[matrix_name][row_index].append(0)
        # Update the value in the matrix
        updated_matrices[matrix_name][row_index][col_index] = float(values[0])
    # Now updated_matrices should be populated with your data
    print(updated_matrices)
    # Update the global input_matrices with the new data
    for matrix_name, matrix_data in updated_matrices.items():
        input_matrices[matrix_name] = matrix_data
    return redirect(url_for('inputs'))


if __name__ == '__main__':
    app.run(debug=True, port=5002)
