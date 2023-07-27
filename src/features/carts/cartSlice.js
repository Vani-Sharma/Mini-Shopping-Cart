import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchItems, addItems, updateItems, deleteItems } from "./cartAPI";

const initialState = {
  item: [],
  status: "idle",
};

export const fetchAsync = createAsyncThunk("cart/fetchItems", async () => {
  const response = await fetchItems();
  return response.data;
});

export const addAsync = createAsyncThunk("cart/addItems", async (item) => {
  const { id, title, thumbnail, price, brand } = item;
  const response = await addItems({
    id,
    title,
    thumbnail,
    price,
    brand,
    quantity: 1,
  });
  return response.data;
});

export const deleteAsync = createAsyncThunk("cart/deleteItems", async (id) => {
  await deleteItems(id);
  return id;
});

export const updateAsync = createAsyncThunk(
  "cart/updateItems",
  async ({ id, item }) => {
    const response = await updateItems(id, item);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.item = action.payload;
      })
      .addCase(addAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.item.push(action.payload);
      })
      .addCase(deleteAsync.fulfilled, (state, action) => {
        const index = state.item.findIndex(
          (item) => item.id === action.payload
        );
        state.status = "idle";
        state.item.splice(index, 1);
      })
      .addCase(updateAsync.fulfilled, (state, action) => {
        const index = state.item.findIndex(
          (item) => item.id === action.payload.id
        );
        state.status = "idle";
        state.item.splice(index, 1, action.payload);
      });
  },
});

// export const {  } = cartSlice.actions;

export default cartSlice.reducer;
