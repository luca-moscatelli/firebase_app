import { useEffect,useState } from "react";
import { auth } from "..";
import NavigationHeader from "../navigation/MainNavigation";




const MainPage=()=>{



    return <div style={{width:'full',height:'full',border:'5px'}}>{<section>
            <NavigationHeader/><h1>PAGINA PRINCIPALE</h1></section>}
    </div>
}

export default MainPage;