const KEY = "token"; // Clave para almacenar el token en localStorage

//!LocalStorage = datos guardados en el cache del navegador
//! Parsear es convertir un string a un objeto
//!Payload = es el contenido del token


//Sin parsear = "token=121323232323rfdfsfsg,user:Sfsfsfs"
//Con parsear = {
//     token: "121323232323rfdfsfsg", 
//     user: "Sfsfsfs"
// }


//Funcion para guardar el token en localStorage
export function setToken(token: string) { //token es el dato y :string es el tipo de dato
    localStorage.setItem(KEY, token);
}

//Funcion trae el token del localStorage creada por el backend
export function getToken() {
    return localStorage.getItem(KEY);
}

//Funcion para cerrar session y eliminar el token 
export function clearToken() {
    localStorage.removeItem(KEY);
}


//Funcion para parsear el token
function parseJwt(token: string) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const json = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
        return JSON.parse(json);
    } catch (error) {
        return null;
    }
}

//Funcion para traer al usuario que inicio session por medio del token
export function getUser() {
    const token = getToken();
    if (!token) return null; // Si no hay token, retorna null
    const payload = parseJwt(token);
    if (!payload) return null; // Si no hay payload, retorna null
    const { id, firstname, lastname, email, role } = payload;
    return { id, firstname, lastname, email, role }; // Retorna el usuario
}

export function isAdmin() {
    return getUser()?.role === 'admin';
}
