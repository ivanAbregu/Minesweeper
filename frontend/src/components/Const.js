let BASE_URL = window.location.href;
if (window.location.href === "http://localhost:3000/")
    BASE_URL = "http://0.0.0.0:8000/"

export const URL = `${BASE_URL}api/game/`;
export const LOGIN_URL = `${BASE_URL}api/rest-auth/login/`;

export const getCookie = name => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};