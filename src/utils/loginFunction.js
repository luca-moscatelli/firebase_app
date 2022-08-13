import { auth } from "..";


function checkLoginUserToPushMainPage(){
    if(auth.currentUser==null){
        window.location.href='/';
    }
}

export {checkLoginUserToPushMainPage};