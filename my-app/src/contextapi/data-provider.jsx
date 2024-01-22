//context api used to create global objects which we need in 
//entire project such as  name and username in this case
import { createContext,useState} from "react";
export const DataContext=createContext(null);



const DataProvider=({children})=>{
    const [account,contextAccount]=useState({userName:'',name:''});
    return(
        <DataContext.Provider value={{
          //value me vo pass karte hai jinhe export karna hota hai
          account,
          contextAccount
        }}>
            {children}
         </DataContext.Provider>
    )
}
export default DataProvider;