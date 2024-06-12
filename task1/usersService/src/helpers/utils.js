// взял из regextester.com
const emailRegex = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/

// принимает на вход два объекта, список ключей, и возвращает 
// те пропы, у которых разнится значение
function getChangedProps(obj1, obj2, propsToCheck){
    return propsToCheck.filter(key => {
        if(obj1[key] === obj2[key]) return true;
        return false;
    })
}

module.exports = {
    emailRegex,
    getChangedProps
}