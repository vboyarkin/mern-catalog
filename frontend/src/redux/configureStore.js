import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

export default function configureStore() {
  const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
}

