def compare_weather_conditions(fetched_condition, possible_conditions):
    fetched_condition_lower = fetched_condition.lower()
    
    for condition in possible_conditions:
        if fetched_condition_lower in condition.lower():
            return condition
    return 'Other'
