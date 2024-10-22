import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    notices: []
}

const noticeSlice = createSlice({
    name: 'notices',
    initialState,

    reducers: {
        
    },
})

export default noticeSlice.reducer