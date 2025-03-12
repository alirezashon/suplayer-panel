import json

# خواندن فایل JSON
with open("location.json", "r", encoding="utf-8") as file:
    location_tree = json.load(file)

# تابع برای تغییر ID فرزندان
def update_location_tree(locations):
    for parent in locations:
        if "children" in parent:
            for child in parent["children"]:
                child["id"] = f"{parent['id']}{child['id']}"
    return locations

# به‌روزرسانی داده‌ها
updated_locations = update_location_tree(location_tree)

# ذخیره در فایل جدید
with open("vajan.json", "w", encoding="utf-8") as file:
    json.dump(updated_locations, file, ensure_ascii=False, indent=2)

print("Updated locations saved successfully.")
