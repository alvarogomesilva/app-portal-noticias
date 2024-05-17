import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    notices: []
}

const noticeSlice = createSlice({
    name: 'notice',
    initialState,

    reducers: {
        
    },
})

export default noticeSlice.reducer