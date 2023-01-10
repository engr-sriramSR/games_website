/* --------------- Start of Elements Declaration --------------- */
const globalUsername = localStorage.getItem('username');
/* --------------- Icons --------------- */
const likeIconDark = `<i class="fa-solid fa-thumbs-up"></i>`;
const likeIconLight = `<i class="fa-regular fa-thumbs-up"></i>`;
const favIconDark = `<i class="fa-solid fa-heart"></i>`;
const favIconLight = `<i class="fa-regular fa-heart"></i>`;
const trashIcon = `<i class="fa-solid fa-trash"></i>`;
/* --------------- Page Element --------------- */
const page = document.getElementById('page');
/* --------------- Header Elements --------------- */
const sidemenuElement = document.getElementById('menu');
const searchInput = document.getElementById('search');
const favGamesElement = document.getElementById('fav-btn');
const myInfoElement = document.getElementById('my-info');
/* --------------- Game Container Elements --------------- */
const gameContainer = document.getElementById('game-container');
/* --------------- Sidemenu Navigator Elements --------------- */
const navBar = document.getElementById('nav-bar');
const homeElement = document.getElementById('home');
const newElement = document.getElementById('new');
const singlePlayerElement = document.getElementById('single-player');
const twoPlayerElement = document.getElementById('two-player');
/* --------------- Favorite Games Navigator Elements --------------- */
const myGamesNavBar = document.getElementById('my-games-nav-bar');
const myGamesClose = document.getElementById('my-games-close');
const myFavGames = document.getElementById('my-games-fav');
const myLikeGames = document.getElementById('my-games-like');
const myFavContent = document.getElementById('fav-content');
const myLikesContent = document.getElementById('likes-content');
/* --------------- Guest My Info Navigator Elements --------------- */
const myInfoNavBarGuest = document.getElementById('my-info-nav-bar-guest');
/* --------------- User My Info Navigator Elements --------------- */
const myInfoNavBarUser = document.getElementById('my-info-nav-bar-user');
const profileTitle = document.getElementById('my-info-title');
const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('profile-email');
const myProfile = document.getElementById('my-profile');
const editProfile = document.getElementById('edit-profile');
const accountSettings = document.getElementById('account-settings');
const logout= document.getElementById('logout');
/* --------------- My Profile Navigator Elements --------------- */
const myProfileNavBar = document.getElementById('my-info-nav-bar-my-profile');
const profileUsername = document.getElementById('my-profile-username');
const profileFirstname = document.getElementById('my-profile-firstname');
const profileSurname = document.getElementById('my-profile-surname');
const profileInsideEmail = document.getElementById('my-profile-email');
/* --------------- My Profile Edit Navigator Elements --------------- */
const editProfileNavBar = document.getElementById('my-info-nav-bar-edit');
const editForm = document.getElementById('edit-form');
const editEmail = document.getElementById('edit-email');
const editFirstName = document.getElementById('edit-firstname');
const editSurname = document.getElementById('edit-surname');
const editSubmit = document.getElementById('edit-submit');
const editCancel = document.getElementById('edit-cancel');
/* --------------- Account Settings Navigator Elements --------------- */
const accountSettingsNavBar = document.getElementById('my-info-nav-bar-settings');
const changePassword = document.getElementById('change-password');
const deleteAccount = document.getElementById('delete-account');
/* --------------- Password Change Navigator Elements --------------- */
const changePasswordNavBar = document.getElementById('my-info-nav-bar-password-change');
const oldPassword = document.getElementById('old-password');
const newPassword = document.getElementById('new-password');
const confirmPassword = document.getElementById('confirm-password');
const confirm = document.getElementById('confirm');
/* --------------- Delete Account Navigator Elements --------------- */
const deleteAccountNavBar = document.getElementById('my-info-nav-bar-delete-account');
const deleteButton = document.getElementById('delete');
const deleteCancelButton = document.getElementById('delete-cancel');
/* --------------- Delete Account varification Navigator Elements --------------- */
const verificationElement = document.getElementById('my-info-nav-bar-delete-account-re');
const reUserName = document.getElementById('re-username');
const rePassword = document.getElementById('re-password');
const reConfirm = document.getElementById('re-confirm');
/* --------------- Logout Navigator Elements --------------- */
const logoutNavBar = document.getElementById('my-info-nav-bar-logout');
const logoutYes = document.getElementById('logout-yes');
const logoutNo = document.getElementById('logout-no');
/* --------------- End of Elements Declaration --------------- */
/* const refresh = async() =>{
    let accessToken = localStorage.getItem('access_token');
    let refreshToken = localStorage.getItem('refresh_token');
    if(accessToken.length > 0 && refreshToken.length > 0){
        const response = await fetch('http://127.0.0.1:5000/refresh', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + refreshToken
            }
        });
        const data = await response.json();
        localStorage.setItem('access_token', data.access_token);
        return response.status;
    }else{
        window.location.href = './home.html';
    }
} */
/* --------------- Start of Functions --------------- */
//Handles most of the fetch from api
const fetchFunction = async(url, content) =>{
    try{
        const response = await fetch(url, content);
        if(response.status === 401){
            window.location.href = '/';
        };
        return response; 
    }catch{
        alert(`Something went wrong. Try reloading the page.`);
    };

};

const urlBuilder = (sublink) =>{
    const baseURL = 'https://srflaskapi.onrender.com'
    return baseURL + sublink;
};

const contentBuilder = (method, contentType=null, body=null) =>{
    const accessToken = localStorage.getItem('access_token');
    const content = {
        method: method,
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    };
    if(contentType){
        content.headers['Content-Type'] = contentType;
    };
    if(body){
        content.body = JSON.stringify(body);
    };
    return content;
};
//To get information of the logged in user 
const getUserInfo = async() =>{
    try{
        const response = await fetchFunction(urlBuilder('/my-info'), contentBuilder('GET'));
        if(response.status === 200){
            const data = await response.json();
            user = data;
            user.username = globalUsername;
        }
    }catch{
        alert(`Something went wrong. Try reloading the page.`);
    };
};
//To get the games content of the website from api
const getGameData = async() =>{
    try{
        const response = await fetchFunction(urlBuilder('/games'), contentBuilder('GET'));
        if(response.status === 200){
            const data = await response.json();
            for(let i=0; i<data['length']; i++){
                let details = {};
                details['username'] = globalUsername;
                details['link'] = data[i]['link'];
                details['image_name'] = data[i]['image_name'];
                details['likes'] = data[i]['likes'];
                details['favorites'] = data[i]['favorites'];
                details['if_liked'] = data[i]['if_liked'];
                details['if_fav'] = data[i]['if_fav'];
                details['count_comments'] = data[i]['count_comments'];
                details['comments'] = data[i]['comments'];
                details['image'] = data[i]['image'];

                games[data[i]['name']] = details;

                let like;
                let fav;
                if(data[i]['if_liked'] === true){
                    likes.push(data[i]['name']);
                    like = likeIconDark;
                }else{
                    like = likeIconLight;
                };
                if(data[i]['if_fav'] === true){
                    favorites.push(data[i]['name']);
                    fav = favIconDark;
                }else{
                    fav = favIconLight;
                }
                const tagGames = data[i]['tag'];
                for(const tag in tagGames){
                    if(tagGames[tag]){
                        tags[tag].push(data[i]['name']);
                    };
                };
                let image = data[i]['image'];
                let likeId = data[i]['name'] + '-like';
                let likesCountId = data[i]['name'] + '-like-counts';
                let commentListId = data[i]['name'] + '-comment-list';
                let commentCountId = data[i]['name'] + '-comment-counts';
                let commentId = data[i]['name'] + '-comment';
                let postId = data[i]['name'] + '-post';
                let commentTextId = data[i]['name'] + '-comment-text';
                let favId = data[i]['name'] + '-fav';
                let favCountId = data[i]['name'] + '-fav-counts';
                let gameItem = document.createElement('div');
                gameItem.classList.add('template');
                gameItem.setAttribute('id', data[i]['name']);
                gameItem.innerHTML = `
                        <a href="${data[i]["link"]}" class="title"><h2 class="title" id=${data[i]["name"]}>${data[i]["name"]}</h2></a>
                        <a href="${data[i]["link"]}"><img src="data:image/png;base64,${image}" alt="${data[i]['image_name']}" width="700" height="375" class="thumbnail"></a>
                        <div class="options">
                            <button class="like" id= ${likeId} onclick="likeHandler(this.id)">${like}</button>
                            <button class="comment" id= ${commentId} onclick="commentHandler(this.id)"><i class="fa-regular fa-comment-dots"></i></button>
                            <button class="fav" id= ${favId} onclick="favHandler(this.id)">${fav}</button>
                        </div>
                        <div class="options">
                            <div class="" id=${likesCountId}>${data[i]['likes']}</div>
                            <div class="" id=${commentCountId}>${data[i]['count_comments']}</div>
                            <div class="" id=${favCountId}>${data[i]['favorites']}</div>
                        </div>
                        <ul class="comments-list" id="${commentListId}">
                                <li class="comment-input">
                                    <input type="text" placeholder="Type your comment here..." id="${commentTextId}", class="comment-text">
                                    <div class="actions">
                                        <button id=${postId} onclick="postHandler(this.id)">Post</button>
                                        <button id="cancel" onclick="cancelHandler(this)">Cancel</button>
                                    </div>
                                    <div class="line"></div>
                                </li> 
                        </ul>
                `;
                gameContainer.appendChild(gameItem);
            };
        }else if(response.status === 401){
            window.location.href = "/login";
        }
    }catch{
        alert(`Something went wrong. Try reloading the page.`);
    };
};
//To Handle the like action of a game
const likeHandler = async(id) =>{
    const likeElement = document.getElementById(id);
    const gameName = likeElement.parentNode.parentNode.children[0].firstChild.textContent;
    const data = {
        game_name: gameName
    }
    try{
        const response = await fetchFunction(urlBuilder('/likes'), contentBuilder('PUT', 'application/json', data));
        if(response.status === 200){
            const game_response = await response.json();
            if(game_response['if_liked'] === true){
                if(likes.includes(gameName)){
                    
                }else{
                    likes.push(gameName);
                }
                likeElement.textContent = "";
                likeElement.innerHTML = `${likeIconDark}`;
                games[gameName]['likes'] = games[gameName]['likes'] + 1;
                const likesCountIdElement = document.getElementById(gameName + '-like-counts');
                likesCountIdElement.textContent = games[gameName]['likes'];
            }else{
                if(likes.includes(gameName)){
                    let index = likes.indexOf(gameName);
                    likes.splice(index, 1);
                }
                likeElement.textContent = "";
                likeElement.innerHTML = `${likeIconLight}`;
                games[gameName]['likes'] = games[gameName]['likes'] - 1;
                const likesCountIdElement = document.getElementById(gameName + '-like-counts');
                likesCountIdElement.textContent = games[gameName]['likes'];
            };
        }else{
            return response.status;
        };
    }catch{
        alert(`Something went wrong. Try reloading the page.`);
    };   
};
//To handle the favorite action of a game
const favHandler = async(id) =>{
    const favElement = document.getElementById(id);
    const gameName = favElement.parentNode.parentNode.children[0].firstChild.textContent;
    const data = {
        game_name: gameName
    }
    try{
        const response = await fetchFunction(urlBuilder('/favorites'), contentBuilder('PUT', 'application/json', data));
        if(response.status === 200){
            const game_response = await response.json();
            if(game_response['if_fav'] === true){
                if(favorites.includes(gameName)){

                }else{
                    favorites.push(gameName);
                }
                favElement.textContent = "";
                favElement.innerHTML = `${favIconDark}`;
                games[gameName]['favorites'] = games[gameName]['favorites'] + 1;
                const favCountIdElement = document.getElementById(gameName + '-fav-counts');
                favCountIdElement.textContent = games[gameName]['favorites'];
            }else{
                if(favorites.includes(gameName)){
                    let index = favorites.indexOf(gameName);
                    favorites.splice(index, 1);
                }
                favElement.textContent = "";
                favElement.innerHTML = `${favIconLight}`;
                games[gameName]['favorites'] = games[gameName]['favorites'] - 1;
                const favCountIdElement = document.getElementById(gameName + '-fav-counts');
                favCountIdElement.textContent = games[gameName]['favorites'];
            };
        }else{
            return response.status;
        };
    }catch{
        alert(`Something went wrong. Try reloading the page.`);
    };
    
};
//To add templates to the comment section of a game
const commentSection = (game_name) => {
    const commentListElement = document.getElementById(game_name+'-comment-list');
    let comments = games[game_name]['comments'];
    let firstChild = commentListElement.children[0];
    while(commentListElement.firstChild){
        commentListElement.removeChild(commentListElement.firstChild);
    };
    commentListElement.appendChild(firstChild);
    for(let i=0; i<comments.length; i++){
        let listItem = document.createElement('li');
        listItem.innerHTML = `
            <h3 class="name">${comments[i]['username']}</h3>
            <p class="message">${comments[i]['comment']}</p>
            <p class="datetime">${comments[i]['datetime']}</p>
        `;
        if(comments[i]['if_comment'] === true){
            let button = document.createElement('button');
            button.classList.add('trash');
            button.setAttribute("onclick", "commentDeleteHandler(this)");
            button.innerHTML = `${trashIcon}`
            listItem.appendChild(button);
        }
        commentListElement.appendChild(listItem);
    };
};
//To Handle the comment section open and close action
const commentHandler = (id) =>{
    const commentElement = document.getElementById(id);
    const commentList = commentElement.parentNode.nextElementSibling.nextElementSibling;
    commentList.classList.toggle('show');
    const game_name = commentElement.parentElement.parentElement.children[0].firstChild.textContent;
    commentSection(game_name);
};
//To Handle the post button of the comment section
const postHandler = async(id) =>{
    let postElement = document.getElementById(id);
    let game_name = postElement.parentElement.parentElement.parentElement.parentElement.children[0].firstChild.textContent;
    let commentTextId = game_name + '-comment-text';
    let comment = document.getElementById(commentTextId).value;
    if(comment.length <= 0){
        return null;
    }
    const data = {
        game_name: game_name,
        username: globalUsername,
        comment: comment
    };
    try{
        const response = await fetchFunction(urlBuilder('/comments'), contentBuilder('PUT', 'application/json', data));
        if(response.status === 200){
            const game_response = await response.json();
            games[game_name]['comments'].push(game_response);
            commentSection(game_name);
            document.getElementById(commentTextId).value = '';
            games[game_name]['count_comments'] = games[game_name]['count_comments'] + 1;
            const commentCountIdElement = document.getElementById(game_name + '-comment-counts');
            commentCountIdElement.textContent = games[game_name]['count_comments'];
    
        }else{
            return response.status;
        };
    }catch{
        alert(`Something went wrong. Try reloading the page.`);
    };
};
//To handle the cancel button of the comment section
const cancelHandler = (element) =>{
    element.parentElement.previousElementSibling.value = ''; 
}
//TO handle the delete action of a comment
const commentDeleteHandler = async(element) =>{
    const datetime = element.previousElementSibling.textContent;
    const game_name = element.parentElement.parentElement.parentElement.children[0].firstChild.textContent;
    const data = {
        game_name: game_name,
        date_time: datetime
    };
    try{
        const response = await fetchFunction(urlBuilder('/comment/delete'), contentBuilder('DELETE', 'application/json', data));
        if(response.status == 200){
            let comments = games[game_name]['comments'];
            for(let i=0; i<comments.length; i++){
                if(comments[i]['datetime'] === datetime && comments[i]['username'] === globalUsername){
                    comments.splice(i, 1);
                    break;
                };
            };
            commentSection(game_name);
            games[game_name]['count_comments'] = games[game_name]['count_comments'] - 1;
            const commentCountIdElement = document.getElementById(game_name + '-comment-counts');
            commentCountIdElement.textContent = games[game_name]['count_comments']; 
        }else{
            return response.status;
        };
    }catch{
        alert(`Something went wrong. Try reloading the page.`);
    };
};
//To handle the search games
const searchHandler = (event) =>{
    event.preventDefault();
    const searchValue = searchInput.value.toLowerCase().replaceAll(' ', '');
    let count = 0;
    for(const gameName in games){
        if(gameName.toLowerCase().indexOf(searchValue) === -1){
            document.getElementById(gameName).style.display = 'none';
        }else{
            document.getElementById(gameName).style.display = 'flex';
            count += 1;
        }    
    }
    if(count === 0){
        document.getElementById('no-match').style.display = 'block';
    }else{
        document.getElementById('no-match').style.display = 'none';
    }
};
//To close the nanvigator of the user info
const closeHandler = (element) =>{
    element.parentElement.style.right = "-600px";
    if(myInfoNavBarUser.style.right === "-600px"){
        page.style.opacity = '1';
        page.style.pointerEvents = 'auto';
        navBar.style.opacity = '1';
        navBar.style.pointerEvents = 'auto';
    };
};
/* --------------- End of Functions --------------- */

/* --------------- Start of Event Listeners --------------- */
sidemenuElement.addEventListener('click', (event) =>{
    event.preventDefault();
    if(navBar.style.left === '0px'){
        navBar.style.left = '-400px';
    }else{
        navBar.style.left = '0px';
    };
});

myGamesClose.addEventListener('click', (event) =>{
    event.preventDefault();
    myGamesNavBar.style.right = '-600px';
    page.style.opacity = '1';
    page.style.pointerEvents = 'auto';
    navBar.style.opacity = '1';
    navBar.style.pointerEvents = 'auto';
});

favGamesElement.addEventListener('click', (event) =>{
    event.preventDefault();
    const favContent = document.getElementById('fav-content');
    const likesContent = document.getElementById('likes-content');
    if(favorites.length > 0){
        favContent.innerHTML = ``;
        for(let i=0; i<favorites.length; i++){
            let image = games[favorites[i]].image;
            let image_name = games[favorites[i].image_name];
            let gameThumbnail = document.createElement('div');
            gameThumbnail.classList.add('game-thumbnail');
            gameThumbnail.innerHTML = `
            <a href=""><img src="data:image/png;base64,${image}" alt="${image_name}" width="245" height="245" class="thumbnail"></a>
        `;
            favContent.appendChild(gameThumbnail);
        };
    }else{
        favContent.innerHTML = `<p>Add games to your favorite list by clicking <i class="fa-regular fa-heart"></i> icon under the game.</p>`
    };
    if(likes.length > 0){
        likesContent.innerHTML = ``;
        for(let i=0; i<likes.length; i++){
            let image = games[likes[i]].image;
            let image_name = games[likes[i].image_name];
            let gameThumbnail = document.createElement('div');
            gameThumbnail.classList.add('game-thumbnail');
            gameThumbnail.innerHTML = `
                <a href=""><img src="data:image/png;base64,${image}" alt="${image_name}" width="245" height="245" class="thumbnail"></a>
            `;
            likesContent.appendChild(gameThumbnail);
        };
    }else{
        likesContent.innerHTML = `<p>Add games to your likes list by clicking <i class="fa-regular fa-thumbs-up"></i> icon under the game.</p>`
    }
    page.style.opacity = '0.5';
    page.style.pointerEvents = 'none';
    navBar.style.opacity = '0.5';
    navBar.style.pointerEvents = 'none';
    myGamesNavBar.style.right = '0px';
});

myInfoElement.addEventListener('click', (event) =>{
    event.preventDefault();
    profileTitle.textContent = 'Hey ' + user.username + ' !';
    profileName.textContent = user.username;
    profileEmail.textContent = user.email;
    page.style.opacity = '0.5';
    page.style.pointerEvents = 'none';
    navBar.style.opacity = '0.5';
    navBar.style.pointerEvents = 'none';
    myInfoNavBarUser.style.right = '0px';
});

myFavGames.addEventListener('click', (event) =>{
    event.preventDefault();
    myLikeGames.classList.remove('active-tab');
    myLikesContent.classList.remove('active-content');
    myFavGames.classList.add('active-tab');
    myFavContent.classList.add('active-content');
});

myLikeGames.addEventListener('click', (event) =>{
    event.preventDefault();
    myFavGames.classList.remove('active-tab');
    myFavContent.classList.remove('active-content');
    myLikeGames.classList.add('active-tab');
    myLikesContent.classList.add('active-content');
});

editForm.addEventListener('click', (event)=>{
    event.preventDefault();
    editEmail.style.pointerEvents = "auto";
    editEmail.style.backgroundColor = "#fff";
    editFirstName.style.pointerEvents = "auto";
    editFirstName.style.backgroundColor = "#fff";
    editSurname.style.pointerEvents = "auto";
    editSurname.style.backgroundColor = "#fff";
    editSubmit.style.display = "inline-block";
    editCancel.style.display = "inline-block";
});

editSubmit.addEventListener('click', async(event)=>{
    event.preventDefault();
    let email = editEmail.value;
    let firstname = editFirstName.value;
    let surname = editSurname.value;
    let data = {};
    const editInfo = document.getElementById('edit-info');
    if(email != user.email || firstname != user.first_name || surname != user.surname){
        data.first_name = firstname;
        data.surname = surname;
        data.email = email;
        const link = '/' + globalUsername + '/update';
        try{
            const response = await fetchFunction(urlBuilder(link), contentBuilder('PUT', 'application/json', data));
            if(response.status === 200){
                data = await response.json();
                user = data;
                user.username = globalUsername;
                profileEmail.textContent = user.email;
                editInfo.textContent = `Changes saved successfully.`;
                setTimeout( ()=>{editInfo.textContent = ``}, 3000);
            }else{
                editInfo.textContent = `Unable to make the changes. Try after sometime.`;
                setTimeout( ()=>{editInfo.textContent = ``}, 3000);
            }
        }catch{
            alert(`Something went wrong. Try reloading the page.`);
        };
    }else{
        editInfo.textContent = `No Changes made.`;
        setTimeout( ()=>{editInfo.textContent = ``}, 3000);
    };
    editEmail.style.pointerEvents = "none";
    editEmail.style.backgroundColor = "#ececec";
    editFirstName.style.pointerEvents = "none";
    editFirstName.style.backgroundColor = "#ececec";
    editSurname.style.pointerEvents = "none";
    editSurname.style.backgroundColor = "#ececec";
    editSubmit.style.display = "none";
    editCancel.style.display = "none";
});

editCancel.addEventListener('click', (event)=>{
    event.preventDefault();
    editEmail.style.pointerEvents = "none";
    editEmail.style.backgroundColor = "#ececec";
    editFirstName.style.pointerEvents = "none";
    editFirstName.style.backgroundColor = "#ececec";
    editSurname.style.pointerEvents = "none";
    editSurname.style.backgroundColor = "#ececec";
    editSubmit.style.display = "none";
    editCancel.style.display = "none";
});

confirm.addEventListener('click', async (event)=>{
    event.preventDefault();
    const passwordChangeInfo = document.getElementById('password-change-info');
    const messageOff = () =>{
        passwordChangeInfo.textContent = ``;
    };
    if(newPassword.value.length<=0||oldPassword.value.length<=0||confirmPassword.value.length<=0){
        passwordChangeInfo.textContent = `Enter required values of all the above fields.`;
        setTimeout(messageOff, 3000);
        return null;
    }
    if(newPassword.value != confirmPassword.value){
        passwordChangeInfo.textContent = `Entered new passwords does not match.`
        setTimeout(messageOff, 3000);
        return null;
    }
    const password_data = {
        old_password: oldPassword.value,
        new_password: newPassword.value
    }
    try{
        const response = await fetchFunction(urlBuilder('/change/password'), contentBuilder('POST', 'application/json', password_data));
        if(response.status === 200){
            passwordChangeInfo.textContent = `Password Changed Successfully.`
            setTimeout(messageOff, 3000);
        }else if(response.status === 400){
            passwordChangeInfo.textContent = `Entered old password is wrong.`
            setTimeout(messageOff, 3000);
        };
        newPassword.value = '';
        oldPassword.value = '';
        confirmPassword.value = '';
    }catch{
        alert(`Something went wrong. Try reloading the page.`);
    }
});

myProfile.addEventListener('click', (event)=>{
    event.preventDefault();
    profileUsername.textContent = user.username;
    profileFirstname.textContent = user.first_name;
    profileSurname.textContent = user.surname;
    profileInsideEmail.textContent = user.email;
    myProfileNavBar.style.right = "0px";
});

editProfile.addEventListener('click', (event)=>{
    event.preventDefault();
    editEmail.value = user.email;
    editFirstName.value = user.first_name;
    editSurname.value = user.surname;
    editProfileNavBar.style.right = "0px";   
});

accountSettings.addEventListener('click', (event)=>{
    event.preventDefault();
    accountSettingsNavBar.style.right = "0px";   
});

changePassword.addEventListener('click', (event)=>{
    event.preventDefault();
    changePasswordNavBar.style.right = "0px";   
});

deleteAccount.addEventListener('click', (event)=>{
    event.preventDefault();
    deleteAccountNavBar.style.right = "0px";  
});

reConfirm.addEventListener('click', async (event) =>{
    event.preventDefault();
    const reConfirmInfo = document.getElementById('reconfirm-info');
    const messageOff = () =>{
        reConfirmInfo.textContent = ``;
    };
    if(reUserName.value.length<=0||rePassword.value.length<=0){
        reConfirmInfo.textContent = `Enter required values of all the above fields.`;
        setTimeout(messageOff, 3000);
        return null;
    }
    const credentials = {
        username: reUserName.value,
        password: rePassword.value
    };
    try{
        const response = await fetch('https://srflaskapi.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(credentials)
        });
        if(response.status === 200){
            const data = await response.json();
            const freshAccessToken = data.access_token;
            try{
                const deleteResponse = await fetch('https://srflaskapi.onrender.com/delete/account', {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + freshAccessToken,
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify(credentials)
                });
                if(deleteResponse.status === 200){
                    localStorage.setItem('username', '');
                    localStorage.setItem('access_token', '');
                    localStorage.setItem('refresh_token', '');
                    reConfirmInfo.textContent = `Account deleted. Redirecting to home page.`;
                    setTimeout(()=>{ 
                        reConfirmInfo.textContent = ``;
                        window.location.href = '/';
                    }, 3000);
                }else if(deleteResponse.status === 401){
                    reConfirmInfo.textContent = `Entered Password is Incorrect.`;
                    setTimeout(messageOff, 3000);
                };
            }catch{
                alert(`Something went wrong. Try reloading the page.`);
            };    
        }else if(response.status === 401){
            reConfirmInfo.textContent = `Invalid Username and password.`;
            setTimeout(messageOff, 3000);
        };
    }catch{
        alert(`Something went wrong. Try reloading the page.`);
    };
});

deleteButton.addEventListener('click', (event)=>{
    event.preventDefault();
    verificationElement.style.right = "0px";
});

deleteCancelButton.addEventListener('click', (event)=>{
    event.preventDefault();
    deleteAccountNavBar.style.right = '-600px';
});

logout.addEventListener('click', (event)=>{
    event.preventDefault();
    logoutNavBar.style.right = "0px";
});

logoutYes.addEventListener('click', async (event)=>{
    event.preventDefault();
    const refreshToken = localStorage.getItem('refresh_token');
    const response = await fetch(urlBuilder('/logout'), {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + refreshToken
        }
    });
    if(response.status === 200){
        localStorage.setItem('username', '');
        localStorage.setItem('access_token', '');
        localStorage.setItem('refresh_token', '');
        window.location.href = '/'
    }; 
});

logoutNo.addEventListener('click', (event)=>{
    event.preventDefault();
    logoutNavBar.style.right = '-600px';
});

homeElement.addEventListener('click', (event)=>{
    event.preventDefault();
    for(const gameName in games){
        document.getElementById(gameName).style.display = 'flex';
    };
    document.getElementById('search-div').style.opacity = 1;
    document.getElementById('search-div').style.pointerEvents = 'auto';
    newElement.classList.remove('active-side-tab');
    singlePlayerElement.classList.remove('active-side-tab');
    twoPlayerElement.classList.remove('active-side-tab');
    homeElement.classList.add('active-side-tab');
});

newElement.addEventListener('click', (event)=>{
    event.preventDefault();
    for(const gameName in games){
        if(tags.new.includes(gameName)){
            document.getElementById(gameName).style.display = 'flex';
        }else{
            document.getElementById(gameName).style.display = 'none';
        };
    };
    document.getElementById('search-div').style.opacity = 0.5;
    document.getElementById('search-div').style.pointerEvents = 'none';
    homeElement.classList.remove('active-side-tab');
    singlePlayerElement.classList.remove('active-side-tab');
    twoPlayerElement.classList.remove('active-side-tab');
    newElement.classList.add('active-side-tab');

});

singlePlayerElement.addEventListener('click', (event)=>{
    event.preventDefault();
    for(const gameName in games){
        if(tags.single_player.includes(gameName)){
            document.getElementById(gameName).style.display = 'flex';
        }else{
            document.getElementById(gameName).style.display = 'none';
        };
    };
    document.getElementById('search-div').style.opacity = 0.5;
    document.getElementById('search-div').style.pointerEvents = 'none';
    homeElement.classList.remove('active-side-tab');
    newElement.classList.remove('active-side-tab');
    twoPlayerElement.classList.remove('active-side-tab');
    singlePlayerElement.classList.add('active-side-tab');
});

twoPlayerElement.addEventListener('click', (event)=>{
    event.preventDefault();
    for(const gameName in games){
        if(tags.two_player.includes(gameName)){
            document.getElementById(gameName).style.display = 'flex';
        }else{
            document.getElementById(gameName).style.display = 'none';
        };
    };
    document.getElementById('search-div').style.opacity = 0.5;
    document.getElementById('search-div').style.pointerEvents = 'none';
    homeElement.classList.remove('active-side-tab');
    newElement.classList.remove('active-side-tab');
    singlePlayerElement.classList.remove('active-side-tab');
    twoPlayerElement.classList.add('active-side-tab');
});
/* --------------- End of Event Listeners --------------- */

/* --------------- Start of the script --------------- */
let games = {};
let user = {};
let favorites = [];
let likes = [];
let tags = {
    new: [],
    single_player: [],
    two_player: [],
    multiplayer: []
};

getGameData();
getUserInfo();