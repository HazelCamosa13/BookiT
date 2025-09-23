export const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
export const validatePassword = (password) => password.length >= 6;
export const validateNotEmpty = (text) => text && text.trim().length > 0;
