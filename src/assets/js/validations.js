validateDate = () => {
    "use strict";
    let date = document.querySelectorAll('.dateValid');
    let count = date.length;
    let pattern = /^\d{4}-\d{1,2}-\d{1,2}$/;

    for (let i = 0; i < count; i++) {
        let dateValue = date[i].value;
        console.log(date[i].value);
        if (dateValue === null || dateValue === '') {
            return false;
        } else if (!pattern.test(dateValue)) {
            return false;
        } else {
            return true;
        }
    }
}