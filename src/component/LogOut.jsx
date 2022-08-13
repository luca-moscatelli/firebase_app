import { auth } from ".."


function LogOut(){

    function LogOutHandle(){
        auth.signOut().then(()=> window.location.href='/')
       
    }
    
    return<div>
        <button style={{marginTop:'1rem',borderRadius:'4px',border:'none',height:'2rem',fontSize:'1.2rem'}} onClick={LogOutHandle}>sloggati</button>
    </div>
}

export default LogOut;