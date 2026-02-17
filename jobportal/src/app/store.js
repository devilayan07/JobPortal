import { configureStore } from "@reduxjs/toolkit";
import companySlice from "../features/company/companySlice"
const store=configureStore({
    reducer:{
        company:companySlice
    }
})

export default store