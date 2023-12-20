from math import ceil, floor

import pandas as pd
import matplotlib.pyplot as plt
import matplotlib

from hm_inputmatrices import hm_inputmatrices

matplotlib.use('Agg')
import random
import openpyxl
import xlsxwriter
from datetime import datetime
from xlsxwriter import Workbook
from PIL import Image
# Reading data from Excel Sheets
from openpyxl.drawing.image import Image


def process_and_plot(probability_list, stay_length_list, new_patients_list, census_day0_data, inventory_perpatient_perday, inventory_given):
    graph_paths = []

    timestamp = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
    outputFile_name = f"static/Output_{timestamp}.xlsx"
    # outputFile_name = output_file_path + outputFile_namef

    img_path_total_demand = f"static/Total_Bed_Demand_{timestamp}.png"
    img_path_covid_demand = f"static/COVID_Bed_Demand_{timestamp}.png"


    # Extract from excel
    # transfers_dict = {0: {0: {1: [1, 6]}, 1: {1: [0.6, 4]}},
    #                   1: {0: {2: [0, 2]}, 1: {2: [0.4, 1]}},
    #                   2: {0: {0: [0, 12]}, 1: {0: [0, 4]}}}

    transfers_dict = {0: {0: {1: [0, 6]}, 1: {1: [0, 4]}},
                      1: {0: {2: [0, 2]}, 1: {2: [0, 1]}},
                      2: {0: {0: [0, 12]}, 1: {0: [0, 4]}}}

    # parameters
    room_type = len(probability_list)
    patient_type = len(probability_list[0])
    days = len(new_patients_list)

    # Creating an empty 3D array
    # Patient types are 2 - [0 for _ in range(p)] Output will be [0,0]
    # Room types are 3 [[0 for _ in range(p)] for _ in range(r+1)] Output will be [0,0] [0,0] [0,0]
    # Total No. of Days = 30, [[[0 for _ in range(p)] for _ in range(r+1)] for _ in range(d + 1)]

    census_output = [[[0 for _ in range(patient_type)] for _ in range(room_type)] for _ in
                     range(days + 1)]
    new_patient_admits = [[[0 for _ in range(patient_type)] for _ in range(room_type)] for _ in
                          range(days + 1)]
    patients_departure = [[[0 for _ in range(patient_type)] for _ in range(room_type)] for _ in
                          range(days + 1)]
    transfer_ins = [[[0 for _ in range(patient_type)] for _ in range(room_type)] for _ in
                    range(days + 1)]
    transfers_departure = [[[0 for _ in range(patient_type)] for _ in range(room_type)] for _ in
                           range(days + 1)]


    # census_day0_data = pd.read_excel(input_file, sheet_name="Starting Census")
    # Deleting census of day 0
    # del census_day0_data[census_day0_data.columns[0]]
    census_output[0] = census_day0_data
    # census_output[1] = census_day0_data.values.tolist()

    print(census_output)

    for d in range(days + 1):
        for r in range(room_type):
            for p in range(patient_type):

                if d == 0:
                    new_patient_admits[d][r][p] = census_output[0][r][p]
                else:
                    new_admits = ceil(new_patients_list[d - 1][p + 1] * probability_list[r][p])
                    new_patient_admits[d][r][p] += new_admits
                    los = stay_length_list[r][p]

                    if (d + los) < (days + 1):
                        patients_departure[d + los][r][p] += new_admits

                    # Uniform Distribution of Starting census
                    if 1 < d < los + 2:
                        patients_departure[d][r][p] += round(census_output[0][r][p] / (los + 2 - d))
                        census_output[0][r][p] -= round(census_output[0][r][p] / (los + 2 - d))

                    # Transfer_In Logic
                    for r_from in transfers_dict[r][p]:
                        transfer_ins[d][r][p] = round(
                            (patients_departure[d][r_from][p] + transfers_departure[d][r_from][p])
                            * transfers_dict[r][p][r_from][0])

                        if (d + transfers_dict[r][p][r_from][1]) < (days + 1):
                            transfers_departure[d + transfers_dict[r][p][r_from][1]][r][p] = \
                                transfer_ins[d][r][p]

                    # Distribution of Starting census
                    # if 0 < d < los + 1:
                    #     patients_departure[d][r][p] += round(census_output[0][r][p] / (los + 1 - d))
                    #     census_output[0][r][p] -= round(census_output[0][r][p] / (los + 1 - d))
                    census_output[d][r][p] = census_output[d - 1][r][p] + new_patient_admits[d][r][
                        p] \
                                             + transfer_ins[d][r][p] - patients_departure[d][r][p] \
                                             - transfers_departure[d][r][p]

    total_census = []

    for i in range(1, days + 1):
        census_output[i][1][0] += census_output[i][2][0]
        census_output[i][1][1] += census_output[i][2][1]
        total_census.append([census_output[i][0][0] + census_output[i][0][1]
                                , census_output[i][1][0] + census_output[i][1][1]
                                , census_output[i][2][0] + census_output[i][2][1]])

    print("Departed: ")
    print(patients_departure)
    print("New Admits: ")
    print(new_patient_admits)
    print("Total_Census: ")
    print(total_census)

    # ###### PPE kit Code ###### #
    # Extract from Excel

    supply_type = len(inventory_perpatient_perday[0])

    # List = [Given list of Med_Surge inventory usage per day, List of inventory usage for ICU]
    # inventory_perpatient_perday = [[1, 0, 1, 1, 0, 10, 10, 15, 4, 2], [4, 3, 5, 3, 2, 20, 10, 30, 8, 4]]
    # inventory_given = [7500, 5500, 3500, 1000, 250, 5000, 2500, 3000, 2250, 500]
    stock_warning = 3
    # Write code to read and get input from Excel

    # End

    # Defining output data structure
    inventory_item = len(inventory_perpatient_perday[0])
    covid_inventory_usage = [[0 for _ in range(inventory_item)] for _ in range(days)]
    total_inventory_usage = [[0 for _ in range(inventory_item)] for _ in range(days)]
    remaining_inventory = [[0 for _ in range(inventory_item)] for _ in range(days + 1)]
    remaining_inventory_total = [[0 for _ in range(inventory_item)] for _ in range(days + 1)]

    inventory_warning_day = [0 for _ in range(inventory_item)]

    # remaining_inventory[0] = inventory_given.copy()
    remaining_inventory[0] = [7500, 5500, 3500, 1000, 250, 5000, 2500, 3000, 2250, 500]
    remaining_inventory_total[0] = [7500, 5500, 3500, 1000, 250, 5000, 2500, 3000, 2250, 500]

    # Logic to fill the Output DS
    for day in range(days):
        for inventory_type in range(inventory_item):
            # Inventory Usage of COVID patients per day per type
            covid_inventory_usage[day][inventory_type] = (census_output[day + 1][0][0] *
                                                          inventory_perpatient_perday[0][
                                                              inventory_type]) + (
                                                                 census_output[day + 1][1][0] *
                                                                 inventory_perpatient_perday[1][
                                                                     inventory_type])

            # Total Inventory Usage of ALL (COVID + Non-COVID) patients per day per type
            total_inventory_usage[day][inventory_type] = (total_census[day][0] *
                                                          inventory_perpatient_perday[0][
                                                              inventory_type]) + (
                                                                 total_census[day][1] *
                                                                 inventory_perpatient_perday[1][
                                                                     inventory_type])

            # Remaining Inventory as per Excel
            # We consider only COVID Patients
            remaining_inventory[day + 1][inventory_type] = remaining_inventory[day][inventory_type] \
                                                           - covid_inventory_usage[day][
                                                               inventory_type]

            # Remaining inventory I am considering Total (COVID + Non-COVID) Patients
            remaining_inventory_total[day + 1][inventory_type] = remaining_inventory_total[day][
                                                                     inventory_type] \
                                                                 - total_inventory_usage[day][
                                                                     inventory_type]

            # For each Inventory, we compute the warning day it will exhaust (Warning is shown few days before)
            # We are considering only COVID, but we have table for total as well, so we can easily get that data as well
            if remaining_inventory[day + 1][inventory_type] >= 0 and stock_warning < day + 1:
                inventory_warning_day[inventory_type] = day + 1 - stock_warning

    # Write Code to plot graphs for PPE demand

    # PPE Kit Code End

    # Staff Demand Code Start
    # Manually Inputted Data
    # First List has Med Surg symptom rate data , Second List has ICU symptom rate data
    staff_symptom_rate = [[0.6, 0.2, 0.12, 0.1, 0.06, 0.2, 0.02, 0.09, 0., 0.],
                          [0.057, 0.07, 0.07, 0.1, 0.04, 0.02, 0.02, 0.04, 0., 0.]]

    # First List has Med Surg hcw data , Second List has ICU hcw data
    staff_hcw = [[0, 6, 10, 0, 10, 0, 6, 10, 0, 0], [2, 0, 5, 4, 0, 2, 0, 5, 0, 0]]

    # First List has "Testing" available staff  , Second List has "Isolated"
    staff_number = [[15, 2, 5, 3, 14, 23, 12, 0, 0, 0], [12, 3, 4, 2, 0, 2, 1, 4, 0, 0]]

    # Write code to read and get input from Excel

    # Reading Excel Data End

    # Defining Staff Output DS
    staff_type_count = len(staff_symptom_rate[0])
    staff_output2 = [[0 for _ in range(staff_type_count)] for _ in range(days)]
    staff_output3 = [[0 for _ in range(staff_type_count)] for _ in range(days)]
    staff_output4 = [[0 for _ in range(staff_type_count)] for _ in range(days)]
    staff_output5 = [[0 for _ in range(staff_type_count)] for _ in range(days)]
    staff_output6 = [[0 for _ in range(staff_type_count)] for _ in range(days)]
    staff_output7 = [[0 for _ in range(staff_type_count)] for _ in range(days)]

    # Logic to fill the Output DS
    for day in range(days):
        for staff in range(staff_type_count):
            # Staff Type 2 Only considers COVID bed Demand
            staff_output2[day][staff] = floor(
                (census_output[day + 1][0][0] * staff_symptom_rate[0][staff]) \
                + (census_output[day + 1][1][0] * staff_symptom_rate[1][staff]))

            if day == 0:
                staff_output3[day][staff] = staff_output2[day][staff]
            else:
                staff_output3[day][staff] = staff_output3[day - 1][staff] + staff_output2[day][
                    staff]

    # Staff Demand Code End

    # Code to plot graphs for PPE demand
    img_path_consumption = f"static/Daily_Consumption_Burn_Rate{timestamp}.png"
    img_path_additional_consumption = f"static/Daily_Consumption_Additional_{timestamp}.png"

    for n in range(supply_type - 5):
        hexadecimal = "#" + ''.join([random.choice('ABCDEF0123456789') for i in range(6)])
        if n == 0:
            label = "N95 Regular"
        elif n == 1:
            label = "N95 Small"
        elif n == 2:
            label = "Surgical Mask"
        elif n == 3:
            label = "Eye Shields"
        else:
            label = "Full face Shields"
        plt.plot([day + 1 for day in range(days)]
                 , [covid_inventory_usage[i][n] for i in range(days)]
                 , hexadecimal, label=label)

    plt.legend(loc="upper left")
    plt.ylim(0)
    plt.grid(color="#d3d3d3")
    plt.xlabel("Day Number")
    plt.ylabel("Equipment Burn")
    plt.title("Daily Consumption Burn Rate")
    plt.savefig(img_path_consumption, format="png", dpi=300)
    graph_paths.append(img_path_consumption)
    plt.close()

    for n in range(5, supply_type):
        hexadecimal = "#" + ''.join([random.choice('ABCDEF0123456789') for i in range(6)])
        if n == 5:
            label = "Gloves"
        elif n == 6:
            label = "Protective Gowns"
        elif n == 7:
            label = "Item 3"
        elif n == 8:
            label = "Item 4"
        else:
            label = "Item 5"
        plt.plot([day + 1 for day in range(days)]
                 , [covid_inventory_usage[i][n] for i in range(days)]
                 , hexadecimal, label=label)

    plt.legend(loc="upper left")
    plt.ylim(0)
    plt.grid(color="#d3d3d3")
    plt.xlabel("Day Number")
    plt.ylabel("Equipment Burn")
    plt.title("Daily Consumption Burn Rate_Additional_Equipment")
    plt.savefig(img_path_additional_consumption, format="png", dpi=300)
    graph_paths.append(img_path_additional_consumption)
    plt.close()

    # Displaying the output data
    # print("Total Bed Data: ")
    # print(pd.DataFrame(census_output))
    # print("Total Bed Data: ")
    # print(pd.DataFrame(total_census))
    print("COVID Inventory Usage: ")
    print(pd.DataFrame(covid_inventory_usage))
    print("Total Inventory Usage: ")
    print(pd.DataFrame(total_inventory_usage))
    print("Staffing Output 2: ")
    print(pd.DataFrame(staff_output2))
    print("Staffing Output 3: ")
    print(pd.DataFrame(staff_output3))

    # Code to plot graphs for Bed Demand
    for n in range(room_type):
        hexadecimal = "#" + ''.join([random.choice('ABCDEF0123456789') for i in range(6)])
        if n == 0:
            label = "Med Surg"
        elif n == 1:
            label = "ICU Total"
        else:
            label = "ICU Ventilated"
        plt.plot([day + 1 for day in range(days)]
                 , [census_output[i + 1][n][0] for i in range(days)]
                 , hexadecimal, label=label)

    plt.legend(loc="upper left")
    plt.ylim(0)
    plt.grid(color="#d3d3d3")
    plt.xlabel("Day Number")
    plt.ylabel("Number of Patients")
    plt.title("Occupied COVID Patient Bed Demand")
    plt.savefig(img_path_covid_demand, format="png", dpi=300)
    graph_paths.append(img_path_covid_demand)
    plt.close()

    for n in range(room_type):
        hexadecimal = "#" + ''.join([random.choice('ABCDEF0123456789') for i in range(6)])
        if n == 0:
            label = "Med Surg"
        elif n == 1:
            label = "ICU Total"
        else:
            label = "ICU Ventilated"
        plt.plot([day + 1 for day in range(days)]
                 , [total_census[i][n] for i in range(days)]
                 , hexadecimal, label=label)

    plt.legend(loc="upper left")
    plt.grid(color="#d3d3d3")
    plt.ylim(0)
    plt.xlabel("Day Number")
    plt.ylabel("Number of Patients")
    plt.title("Occupied COVID Patient Bed Demand")
    plt.savefig(img_path_total_demand, format="png", dpi=300)
    graph_paths.append(img_path_total_demand)
    plt.close()

    # Code to Write Our Final Output File
    with pd.ExcelWriter(outputFile_name, engine='xlsxwriter') as writer:
        output_dataframe = pd.DataFrame(census_output)
        print(census_output)
        output_dataframe.to_excel(writer, sheet_name='Output', index=False)

        # Insert the image into the worksheet
        img = Image(img_path_total_demand)
        img.width, img.height = 400, 300  # Set image size as needed

        img2 = Image(img_path_covid_demand)
        img2.width, img2.height = 400, 300  # Set image size as needed

        wb = writer.book
        worksheet = writer.sheets['Output']
        worksheet.insert_image('E20', img_path_total_demand,
                               {'x_offset': 10, 'y_offset': 10, 'x_scale': 0.7, 'y_scale': 0.7})

        worksheet.insert_image('E2', img_path_covid_demand,
                               {'x_offset': 10, 'y_offset': 10, 'x_scale': 0.7, 'y_scale': 0.7})

    return outputFile_name, graph_paths, census_output
