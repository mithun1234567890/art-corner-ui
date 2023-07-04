const validator = {
    username: {
        rules: [
            {
                test: /^[a-z0-9_]+$/,
                message: 'Username must contain only alphabets-numeric lowercase characters ',
            },
            {
                test: (value) => {
                    return value.length > 3;
                },
                message: 'Username must be longer than 3 characters',
            },
        ],
        touched: false,
        errors: [],
        valid: false,
        state: '',
    },
    fullname: {
        rules: [
            {
                test: /^[A-Za-z\s]{1,}[.]{0,1}[A-Za-z\s]{0,}$/,
                message: 'Full name is required',
            },
            {
                test: (value) => {
                    return value.length > 3;
                },
                message: 'Full name must be longer than 3 characters',
            },
        ],
        errors: [],
        valid: false,
        state: '',
    },
    email: {
        rules: [
            {
                test: /[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'Provide valid Email ID',
            }
        ],
        errors: [],
        valid: false,
        state: '',
    },
    phone: {
        rules: [
            {
                test: /^\+?[1-9][0-9]{7,14}$/,
                message: 'Provide valid address number',
            }
        ],
        errors: [],
        valid: false,
        state: '',
    },
    address: {
        rules: [
            {
                test: (value) => {
                    return value.length > 0;
                },
                message: 'Provide valid address',
            }
        ],
        errors: [],
        valid: false,
        state: '',
    },
    city: {
        rules: [
            {
                test: /^[A-Za-z\s]{1,}[.]{0,1}[A-Za-z\s]{0,}$/,
                message: 'Provide valid city',
            }
        ],
        errors: [],
        valid: false,
        state: '',
    },
    password: {
        rules: [
            {
                test: (value) => {
                    return value.length >= 4;
                },
                message: 'Password must be longer than 3 characters',
            },
        ],
        errors: [],
        valid: false,
        state: ''
    }
};

export default validator;