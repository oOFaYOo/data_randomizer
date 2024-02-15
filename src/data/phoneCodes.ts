type phone = {
    code: number,
    middleCode: number[],
    length: number
}

const usa: phone = {code:1, middleCode:[], length: 10};
const russia: phone = {code:7,
    middleCode:[920, 921, 922, 923, 924, 926, 927, 929,902, 904, 908,903, 905, 906, 909, 901, 902, 904, 908],
    length: 7};
const japan: phone = {code:81, middleCode:[80, 90, 70, 50], length: 8};

const phoneCodes = {
    usa: usa,
    russia: russia,
    japan: japan
}

export default phoneCodes;
