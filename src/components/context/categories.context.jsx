import { createContext, useEffect, useState } from "react";
import SHOP_DATA from '../../shop-data.js'
import { getCategoriesAndDocuments } from "../../utils/firebase.utils.jsx";

export const CategoriesContext = createContext({
    categoriesMap : {},
})



export const CategoriesProvider = ({children}) => {
    const [categoriesMap,setCategoriesMap] = useState({})  
    const value = {categoriesMap}

    useEffect(()=>{
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap)
        }
        getCategoriesMap()
    },[])

   
   
    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    
}

