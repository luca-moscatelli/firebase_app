import NavigationHeader from "../navigation/MainNavigation";
import styles from './SchedulePage.module.css'
import { getUserFromDatabase } from "../utils/dbCalls";
import { useEffect, useRef, useState } from "react";
import UserCard from "../component/userCard";


function SchedulePage(){

    const [users,setUsers]=useState([]);
    const [scheduleUsers,setScheduleUsers]=useState([]);
    const [reserveUsers,setReserveUsers]=useState([]);

    const itemOnDrag=useRef();
    const listOverItem=useRef();
    const listLeftItem=useRef();

    useEffect(()=>{
        getUserFromDatabase().then((value)=>setUsers(value))
    },[])

    function startDrag(e,position,leftItem){
        itemOnDrag.current=position;
        listOverItem.current=null;
        listLeftItem.current=leftItem;
        console.log(e.target.innerHTML);
    }

    function drop(){
        const listRef=listOverItem.current;
        const listLeftRef=listLeftItem.current;
        if(listRef.list==null||listLeftRef.list==listRef.list) return;
        listRef.set([...listRef.list,users[itemOnDrag.current]]);
        listLeftRef.set(listLeftRef.list.filter((value)=>value!=listLeftRef.list[itemOnDrag.current]));
        itemOnDrag.current=null;
        console.log('dropped !',listOverItem.current);

    }

    function enterDrag(Setlist,list){

        listOverItem.current={set:Setlist,list:list};
        //prova

    }

    function ColumnDragAndDrop ({setList,list,name}){

        let prova={cursor:"grab",}

      return  <div className={styles.Column}  onDragEnter={()=>enterDrag(setList,list)} >
        <h3>{name}</h3>
            <button onClick={()=>setList([])}> cancella tutto </button>
            {list.map((value,index)=>
        <div className={styles.card} draggable onDragExit={()=>{if(listOverItem.current==list) listOverItem.current=null}} onDragEnd={drop} onDragStart={(e)=>startDrag(e,index,{set:setList,list:list})}>
            <UserCard style={prova} removeHandle={()=>setList(list.filter((v)=>v!=value))} user={value} isFilter={true}/></div>)}
            </div>
    }

    return <div style={{width:'full',height:'full'}}><NavigationHeader/><h1 className={styles.name}>Schedari</h1>
    <div className={styles.main}>
        <ColumnDragAndDrop setList={setUsers} list={users} name='archivio'/>
        <ColumnDragAndDrop setList={setScheduleUsers} list={scheduleUsers} name='schedario principale'/>
        <ColumnDragAndDrop setList={setReserveUsers} list={reserveUsers} name='schedario riservato'/>
    </div></div>
   

}

export default SchedulePage;