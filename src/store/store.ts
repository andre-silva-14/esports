import { configureStore } from "@reduxjs/toolkit";
import adReducer from "./adSlice";

export const store = configureStore({
  reducer: {
    ads: adReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// With next-redux-wrapper which is not compatible with NextJS 13 yet.
//
// const makeStore = () =>
//   configureStore({
//     reducer: {
//       ads: adReducer,
//     },
//   });

// export type AppStore = ReturnType<typeof makeStore>;
// export type AppState = ReturnType<AppStore["getState"]>;
// export type AppDispatch = ThunkDispatch<AppState, undefined, AnyAction> &
//   Dispatch<AnyAction>;

// export const wrapper = createWrapper<AppStore>(makeStore);

// Then can be called on layout.tsx:

// export default wrapper.withRedux(MyApp);
