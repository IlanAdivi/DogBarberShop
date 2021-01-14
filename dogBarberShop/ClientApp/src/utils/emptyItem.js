export const existEmptyProperty = object => {
    let countOfNullProperties = 0;
    Object.keys(object).map(property => {
        if (object[property] === null) {
            countOfNullProperties++;
        }
        console.log(countOfNullProperties);

        return countOfNullProperties;
    });
    console.log(countOfNullProperties);
    return countOfNullProperties > 0 ? true : false;
};

export const existEmptyPropertyAuth = object => {
    let countOfNullProperties = 0;
    Object.keys(object).map(property => {
        if (object[property] === '') {
            countOfNullProperties++;
        }
        console.log(countOfNullProperties);

        return countOfNullProperties;
    });
    console.log(countOfNullProperties);
    return countOfNullProperties > 0 ? true : false;
};