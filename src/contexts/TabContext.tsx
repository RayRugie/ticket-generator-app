import { createContext, PropsWithChildren, useContext, useState } from "react";

interface InitialStateProps {
  activeTab: number;
  onNextTab: () => void;
  onPreviousTab: (number?: number) => void;
}

const initialState: InitialStateProps = {
  activeTab: 1,
  onNextTab: () => {},
  onPreviousTab: () => {},
};
const TabContext = createContext(initialState);

const TabContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(1);

  const onNextTab = () => {
    setActiveTab((activeTab) =>
      activeTab > 2 ? activeTab - 2 : activeTab + 1,
    );
  };

  const onPreviousTab = (number = 0) => {
    if (number > 0) {
      setActiveTab(number);
    } else {
      setActiveTab((activeTab) =>
        activeTab < 2 ? activeTab + 2 : activeTab - 1,
      );
    }
  };
  return (
    <TabContext.Provider value={{ activeTab, onNextTab, onPreviousTab }}>
      {children}
    </TabContext.Provider>
  );
};

const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) throw new Error("useTabContext was used outside of it's scope");
  return context;
};

export { TabContextProvider, useTabContext };