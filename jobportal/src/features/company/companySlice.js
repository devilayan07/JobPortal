import { createSlice } from "@reduxjs/toolkit";


const companySlice=createSlice({
    name:"company",
    initialState:{
        slug:null
    },
    reducers:{
        setCompany:(state,action)=>{
            state.slug=action?.payload
        },
        clearCompany:(state)=>{
            state.slug=null
        }
    }
})

export const {setCompany,clearCompany}=companySlice.actions

export default companySlice.reducer