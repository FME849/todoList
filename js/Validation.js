const checkEmpty = (value, message) => {
    if (value.trim()) {
        return true;
    }
    alert(message);
    return false;
}
export { checkEmpty };