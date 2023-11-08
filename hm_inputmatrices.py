import pandas as pd


def hm_inputmatrices(filename):
    print("Filename",filename)
    probability_data = pd.read_excel(filename, sheet_name="Patient and Room Types")
    del probability_data[probability_data.columns[0]]
    probability_list_ip = probability_data.values.tolist()

    stay_length_data = pd.read_excel(filename, sheet_name="Lengths of Stay")
    del stay_length_data[stay_length_data.columns[0]]
    stay_length_list_ip = stay_length_data.values.tolist()

    new_patients_data = pd.read_excel(filename, sheet_name="Admissions History")
    new_patients_list_ip = new_patients_data.values.tolist()
    print("new_patients_list", new_patients_data.values.tolist())



    census_day0_data = pd.read_excel(filename, sheet_name="Starting Census")
    del census_day0_data[census_day0_data.columns[0]]
    census_day0_data_ip = census_day0_data.values.tolist()
    # census_day0_data


    ppe_consumption_rate = pd.read_excel(filename, sheet_name="PPE Consumption Rate")
    del ppe_consumption_rate[ppe_consumption_rate.columns[0]]
    inventory_perpatient_perday_ip = ppe_consumption_rate.values.tolist()
    # print("PPE",ppe_consumption_rate_list)

    current_inventory = pd.read_excel(filename, sheet_name="Current Inventory")
    del current_inventory[current_inventory.columns[0]]
    inventory_given_ip = current_inventory.values.tolist()

    return probability_list_ip, stay_length_list_ip, new_patients_list_ip, census_day0_data_ip, inventory_perpatient_perday_ip, inventory_given_ip
