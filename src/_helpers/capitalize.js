export const capitalize = (str) => {
    if(str){
        return titleCase(str)
    }else{
        return str
    }
}
export const capsProvince = (str) => {
    if(str?.length == 2){
        return str.toUpperCase()
    }if(str?.length > 2){
        return titleCase(str)
    }else{
        return str
    }
}
const titleCase = (str) => {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
 }
