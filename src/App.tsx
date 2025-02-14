import "./App.css";
import NavHeader from "./components/NavHeader/NavHeader";
import Tab from "./components/Tab/Tab";
import TicketSelection from "./components/TicketSelection/TicketSelection";
import AttendeeDetails from "./components/AttendeeDetails/AttendeeDetails";
import Ready from "./components/Ready/Ready";
import { useTabContext } from "./contexts/TabContext";

interface TabsTypes {
  title: string;
  number: number;
  element: React.ReactElement;
}

const tabs: TabsTypes[] = [
  {
    title: "ticket selection",
    number: 1,
    element: <TicketSelection />,
  },
  {
    title: "attendee details",
    number: 2,
    element: <AttendeeDetails />,
  },
  {
    title: "ready",
    number: 3,
    element: <Ready />,
  },
];

function App() {
  const { activeTab } = useTabContext();

  return (
    <div className="app-container">
      <NavHeader />
      {tabs.map(
        (tab) =>
          activeTab === tab.number && (
            <Tab key={tab.number} title={tab.title}>
              {tab.element}
            </Tab>
          )
      )}
    </div>
  );
}

export default App;
