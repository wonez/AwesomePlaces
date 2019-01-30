const validate = (form, value, rules) => {
    
    let valid = true;

    for(let key in rules){
        valid = valid && checkValid(form, value, key, rules)
    }

    return valid;
}

const checkValid = (form, value, key, rules) => {
    let valid = true;
    if(key === 'email' && rules[key]){
        valid = valid && value.match(/^[A-Za-z0-9]+@[A-Za-z0-9]+(\.[A-Za-z0-9]+)+$/)
    } else if(key === 'minLength'){
        valid = valid && ( value.length >= rules[key] )
    } else if(key === 'equalTo'){
        valid = valid && ( value === form[rules[key]].value )
    } else if(key === 'location'){
        valid = valid && ( value && value.latitude != null && value.longitude != null)
    } else if(key === 'image'){
        valid = valid && (value && value.uri)
    }
    return valid;
}

export default validate;