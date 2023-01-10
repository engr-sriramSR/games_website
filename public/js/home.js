/* --------------- Elements Declaration --------------- */
const inputForm = document.getElementById('credentials');
const usernameElement = document.getElementById('username');
const passwordElement = document.getElementById('password');
const loginButton = document.getElementById('login');
const forgetPassword = document.getElementById('forget');
const createAccount = document.getElementById('create');
const info = document.getElementById('info');
/* --------------- Functions Declarations --------------- */
//To fetch the user details and reload on new open 
const refresh = async() =>{
    let accessToken = localStorage.getItem('access_token');
    let refreshToken = localStorage.getItem('refresh_token');
    try{
        if(accessToken.length > 0 && refreshToken.length > 0){
            const response = await fetch('https://srflaskapi.onrender.com/refresh', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + refreshToken
                }
            });
            if(response.status === 200){
                data = await response.json();
                localStorage.setItem('access_token', data.access_token);
                window.location.href = '/games';
                return response.status;
            }else{
                return response.status;
            };
        };
    }catch{
        //alert(`Unable to conncet to the server at this time.Please try after some time.`);
    };
};
//To handle the login action
const login = async() =>{
    let username = usernameElement.value;
    let password = passwordElement.value;
    let credential = {
        username: username,
        password: password
    };
    try{
        const response = await fetch('https://srflaskapi.onrender.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(credential)
        });
        if(response.status === 200){
            let data = await response.json();
            let accessToken = data.access_token;
            let refreshToken = data.refresh_token;
            localStorage.setItem('username', username);
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);
            info.textContent = `Logging in...`;
            setTimeout(()=>{
                info.textContent = ``;
                window.location.href = '/games';
            }, 1000);
        }else if(response.status === 401){
            info.textContent = `Invalid Username and Password!`;
            setTimeout(()=>{info.textContent = ``;}, 3000);
        };
    }catch(err){
        alert(`Unable to connect to the server at this time.Please try after some time.`);
    };
};
/* --------------- Event Listeners --------------- */
loginButton.addEventListener('click', (event)=>{
    event.preventDefault();
    login();
});

createAccount.addEventListener('click', (event)=>{
    event.preventDefault();
    window.location.href = `/createaccount`;
});
/* --------------- Start of Script --------------- */
refresh();