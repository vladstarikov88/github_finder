function objsCopy(obj1, obj2) {
    for(let item in obj1) {
        for(let val in obj2) {
            if(item == val) {
                obj2[val] = obj1[item]
            }
        }
    }
    return obj2
}