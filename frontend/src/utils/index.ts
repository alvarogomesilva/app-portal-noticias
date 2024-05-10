
export const getToken = () => {
    const token = localStorage.getItem('@u')
    return token;
}