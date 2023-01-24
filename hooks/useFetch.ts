import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useState, useCallback, useEffect } from "react";

import { Data, User } from "../types";

export const useFetch = <T>(url: string, reqData?: User, reload?: boolean) =>{
    const [data, setData] = useState<T>({} as T)
    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState(false)
    
    const fetchData = useCallback(async () =>{
        try {
          let res: Data<T>

          if(reqData) res = (await axios.post<Data<T>>(url, reqData)).data
          else res = (await axios.get<Data<T>>(url)).data

          if(!res) setErr(true)
  
          setData(res.data)
          setLoading(false)
        } catch(err) {
          setErr(true)
        }
      }, [reload])

    useEffect(() =>{
      fetchData()
    }, [fetchData])

    return { data, loading, err }
}