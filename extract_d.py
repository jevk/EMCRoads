import json
import os
import sys

#os.system('wget https://earthmc.net/map/tiles/_markers_/marker_earth.json')

    
with open('marker_earth.json') as f:
    d = json.load(f)["sets"]["towny.markerset"]["areas"]



with open('data_obj.json', 'r') as f:
    prev_json = json.load(f)

ft = '{'
for t in d.keys():
    c = d[t]
    ft += ('"' + t + '":' + json.dumps({"x": c["x"][0], "y": c["z"][0], "name": c["label"].replace("_", " ")})+ ",")

new_json = json.loads(ft[:-1] + "}")

new_json = {**prev_json, **new_json}

with open('data_obj.json', 'w') as f:
    json.dump(new_json, f)
        
with open('data_arr.json', 'w') as f:
    json.dump(list(new_json.values()), f)