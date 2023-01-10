const newAccount = document.getElementById('already-account');
const signUp = document.getElementById('signup');
const firstName = document.getElementById('firstname');
const surname = document.getElementById('surname');
const email = document.getElementById('useremail');
const username = document.getElementById('username');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('cpassword');

newAccount.addEventListener('click', (event)=>{
    event.preventDefault();
    window.location.href = `/login`;
});

signUp.addEventListener('click', async (event)=>{
    event.preventDefault();
    const newAccountInfo = document.getElementById('new-account-info');
    if(firstName.value && surname.value && email.value && username.value && password.value && confirmPassword.value){
        if(password.value != confirmPassword.value){
            newAccountInfo.textContent = `Passwords does not match.`
            setTimeout(()=>{newAccountInfo.textContent = ``}, 3000);
            return null;
        }
        const data = {
            first_name: firstName.value,
            surname: surname.value,
            email: email.value,
            username: username.value,
            password: password.value
        }
        try{
            const response = await fetch('https://srflaskapi.onrender.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            });
            if(response.status === 201){
                firstName.value = '';
                surname.value = '';
                email.value = '';
                username.value = '';
                password.value = '';
                newAccountInfo.textContent = `Account created successfully.Redirecting to login page...`;
                setTimeout(()=>{
                    newAccountInfo.textContent = ``;
                    window.location.href = `/login`;
                }, 1000);
            }else if(response.status === 422){
                newAccountInfo.textContent = `Enter a valid email address.`;
                setTimeout(()=>{newAccountInfo.textContent = ``}, 3000);
            }else if (response.status === 409){
                const data = await response.json();
                if(data.message === `A user with that username already exists.`){
                    newAccountInfo.textContent = data.message
                    setTimeout(()=>{newAccountInfo.textContent = ``}, 3000);
                }else if(data.message === 'A user with that email id already exists.'){
                    newAccountInfo.textContent = data.message
                    setTimeout(()=>{newAccountInfo.textContent = ``}, 3000);
                }
            }else if(response.status === 401){
                alert(`Something went wrong. Try reloading the page.`);
            };
        }catch{
            alert(`Something went wrong. Try reloading the page.`);
        }
    }else{
        newAccountInfo.textContent = `Enter required values for all the above fields.`
        setTimeout(()=>{newAccountInfo.textContent = ``}, 3000);
    };
});