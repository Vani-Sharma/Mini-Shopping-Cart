import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProduct } from "./productAPI";

const initialState = {
  product: [],
  status: "idle",
};

export const fetchAsync = createAsyncThunk("product/fetchProduct", async () => {
  const response = await fetchProduct();
  return response.data;
});

export const addProductAsync = createAsyncThunk(
  "product/addProduct",
  async (id, product) => {
    const response = await addProduct(id, product);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.product = action.payload;
      });
  },
});

// export const {  } = productSlice.actions;

export default productSlice.reducer;
