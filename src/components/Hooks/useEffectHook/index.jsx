import { useEffect, useState } from "react";

const apiStatusConstants = {
    initial:'INITIAL',
    progress:'PROGRESS',
    success:'SUCCESS',
    failure:'FAILURE'
}

function UseEffectHook(api){
    const [fetchedData, setProduct] = useState({}) 
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial) 
    const options = { method:'GET' } 
    useEffect(() => { 
        setApiStatus(apiStatusConstants.progress)  
        fetch(api, options) 
        .then((response) => {
            if(response.ok){ 
                setApiStatus(apiStatusConstants.success) 
                return response.json() 
            }else{ 
                setApiStatus(apiStatusConstants.failure) 
            }}) 
            .then((data) => { 
                setProduct({...data, isSelected:false})
            }) 
        }, [api]) 

        return {fetchedData, apiStatus}
    }

export default UseEffectHook