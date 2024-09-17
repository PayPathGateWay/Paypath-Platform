const api = "http://localhost:5122/management/merchant"; // API Base URL
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface MerchantPlatformState {
    platformName: string;
    platformLogo: string | undefined;  // Store platformLogo as URL for display
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Initial state
const initialState: MerchantPlatformState = {
    platformName: "",
    platformLogo: undefined,
    status: 'idle',
    error: null,
};

export const fetchMerchantDataAPI = createAsyncThunk(
    'merchantPlatform/fetchMerchantData',
    async (merchantId: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${api}/platformLogo/${merchantId}`, {
                withCredentials: true,
                responseType: 'arraybuffer',  // Receive file as arraybuffer
            });
            const responseName = await axios.get(`${api}/platformName/${merchantId}`, {
                withCredentials: true,
            });


            const platformName = responseName.data.PlatformName
            const fileType = response.headers["content-type"];  
            
            const blob = new Blob([response.data], { type: fileType });
            const platformLogoUrl = URL.createObjectURL(blob);

            return {
                platformName,
                platformLogo: platformLogoUrl,
            };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch merchant data');
        }
    }
);

//! fiix this  Async thunk to update merchant data 
export const updateMerchantData = createAsyncThunk(
    'merchantPlatform/updateMerchantData',
    async ({ token, data }: { token: string; data: Partial<MerchantPlatformState> }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${api}/merchant`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update merchant data');
        }
    }
);

const merchantPlatformSlice = createSlice({
    name: 'merchantPlatform',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMerchantDataAPI.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMerchantDataAPI.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.platformName = action.payload.platformName;
                state.platformLogo = action.payload.platformLogo;
            })
            .addCase(fetchMerchantDataAPI.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(updateMerchantData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateMerchantData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.platformName = action.payload.platformName;
                state.platformLogo = action.payload.platformLogo;
            })
            .addCase(updateMerchantData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export default merchantPlatformSlice.reducer;
