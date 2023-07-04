const validator = {
    title: {
        rules: [
            {
                test: /^[a-zA-Z0-9 ]+$/,
                message: 'Title is required',
            },
            {
                test: (value) => {
                    return value.length > 3;
                },
                message: 'Title must be longer than 3 characters',
            },
        ],
        touched: false,
        errors: [],
        valid: false,
        state: '',
    },
    type: {
        rules: [
            {
                test:  /^[a-zA-Z0-9 ]+$/,
                message: 'Please enter only alphabetic and number',
            },
            {
                test: (value) => {
                    return value.length > 3;
                },
                message: 'Type must be longer than 3 characters',
            },
        ],
        errors: [],
        valid: false,
        state: '',
    },
    date: {
        rules: [
            {
                test: (value) => {
                    return value.length > 0;
                },
                message: 'Please enter date',
            },
        ],
        errors: [],
        valid: false,
        state: '',
    },
    price: {
        rules: [
            {
                test:  /^[0-9]*$/,
                message: 'Please enter number',
            },
            {
                test: (value) => {
                    return value.length > 0;
                },
                message: 'Please enter price',
            },
        ],
        errors: [],
        valid: false,
        state: '',
    },
    description: {
        rules: [
            {
                test:  /^[a-zA-Z0-9 ]+$/,
                message: 'Description is required',
            },
            {
                test: (value) => {
                    return value.length > 10;
                },
                message: 'Description must be longer than 10 characters',
            },
        ],
        errors: [],
        valid: false,
        state: '',
    }
};

export default validator;