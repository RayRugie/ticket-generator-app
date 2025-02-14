import {
    createContext,
    Dispatch,
    PropsWithChildren,
    useContext,
    useEffect,
    useReducer,
  } from "react";
  
  interface InitialStateProps {
    name: string;
    email: string;
    ticketType: string;
    ticketPrice: number | string;
    quantity: number;
    imageUrl: string | File;
    specialRequest: string;
  }
  
  // const getInitialState = (): InitialStateProps => {
  //   const storedState = localStorage.getItem("formData");
  //   if (storedState) return JSON.parse(storedState);
  
  //   return {
  //     name: "",
  //     email: "",
  //     ticketType: "regular access",
  //     ticketPrice: "free",
  //     quantity: 1,
  //     imageUrl: "",
  //     specialRequest: "",
  //   };
  // };
  
  const initialState: InitialStateProps = {
    name: "",
    email: "",
    ticketType: "regular access",
    ticketPrice: "free",
    quantity: 1,
    imageUrl: "",
    specialRequest: "",
  };
  
  interface FormContextProps {
    state: InitialStateProps;
    dispatch: Dispatch<Actions>;
  }
  
  const FormContext = createContext<FormContextProps | undefined>(undefined);
  
  type Actions =
    | {
        type: "TICKET_TYPE";
        payload: string;
      }
    | { type: "TICKET_PRICE"; payload: number | string }
    | { type: "TICKET_QUANTITY"; payload: number }
    | { type: "UPDATE_NAME"; payload: string }
    | { type: "UPDATE_IMAGE_URL"; payload: string | File }
    | { type: "UPDATE_SPECIAL_REQUEST"; payload: string }
    | { type: "UPDATE_EMAIL"; payload: string }
    | { type: "RESET" };
  const reducer = (state: typeof initialState, action: Actions) => {
    switch (action.type) {
      case "TICKET_TYPE": {
        if (!action.payload) return state;
        return {
          ...state,
          ticketType: action.payload,
        };
      }
      case "TICKET_PRICE": {
        if (!action.payload) return state;
        return {
          ...state,
          ticketPrice: action.payload,
        };
      }
      case "TICKET_QUANTITY": {
        if (!action.payload) return state;
        return {
          ...state,
          quantity: action.payload,
        };
      }
      case "UPDATE_NAME": {
        if (!action.payload) return state;
        return {
          ...state,
          name: action.payload,
        };
      }
      case "UPDATE_IMAGE_URL": {
        if (!action.payload) return state;
        return {
          ...state,
          imageUrl: action.payload,
        };
      }
      case "UPDATE_EMAIL": {
        if (!action.payload) return state;
        return {
          ...state,
          email: action.payload,
        };
      }
      case "UPDATE_SPECIAL_REQUEST": {
        if (!action.payload) return state;
        return {
          ...state,
          specialRequest: action.payload,
        };
      }
      case "RESET":
        return initialState;
    }
  };
  
  const FormContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem("formData", JSON.stringify(state));
      }
    }, [state]);
  
    return (
      <FormContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        {children}
      </FormContext.Provider>
    );
  };
  const useFormContext = () => {
    const context = useContext(FormContext);
    if (!context) throw new Error("FormContext was used outside of it's scope");
    return context;
  };
  
  export { FormContextProvider, useFormContext };
  
  // https://res.cloudinary.com/dcqwgw6im/image/upload/v1739412964/zzl56yqahafkwalurie1.png