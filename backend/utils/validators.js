module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {};
    if (username.trim() === '') {
        errors.username = 'Username must not be empty';
    } else if (username.length < 3 || username.length > 15) {
        errors.username = 'Username must be between 3 and 15 characters';
    } else {
        //make sure username only contains letters, numbers, dashes, underscores, and periods
        const usernameRegex = /^[a-zA-Z0-9-_.]+$/;
        if (!usernameRegex.test(username)) {
            errors.username = 'Username must only contain letters, numbers, dashes, and underscores';
        }
    }
    if (email.trim() === '') {
        errors.email = 'Email must not be empty';
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
            errors.email = 'Email must be a valid email address';
        }
    }
    if (password.length < 8 || !password.match(/[A-Z]/) || !password.match(/[0-9]/) || !password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
        errors.password = 'Password must contain at least 8 characters, one capital letter, one number and one special character';
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords must match';
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}

module.exports.validateLoginInput = (username, password) => {
    const errors = {};
    if (username.trim() === '') {
        errors.username = 'Username must not be empty';
    }
    if (password === '') {
        errors.password = 'Password must not be empty';
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}