import * as React from "react";
import { useTheme } from "../../context/ThemeContext";
import { useThemeStyles } from "../hooks/useThemeStyles";

const TabsContext = React.createContext({
  selectedTab: "",
  setSelectedTab: () => {},
});

const Tabs = ({ defaultValue, children, className, ...props }) => {
  const [selectedTab, setSelectedTab] = React.useState(defaultValue);

  const contextValue = React.useMemo(
    () => ({ selectedTab, setSelectedTab }),
    [selectedTab]
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

const TabsList = ({ className, children, ...props }) => {
  const { isDark } = useTheme();
  const bgColor = isDark ? "bg-gray-800" : "bg-gray-100";
  
  return (
    <div 
      role="tablist" 
      className={`flex space-x-2 p-1 rounded-lg ${bgColor} ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};

const TabsTrigger = ({ value, className, children, ...props }) => {
  const { selectedTab, setSelectedTab } = React.useContext(TabsContext);
  const { isDark } = useTheme();
  const isSelected = selectedTab === value;

  const baseClasses = "px-4 py-2 rounded-md text-sm font-medium transition-all";
  
  const selectedClasses = isDark 
    ? "bg-purple-700 text-white" 
    : "bg-purple-600 text-white";
    
  const inactiveClasses = isDark
    ? "text-gray-300 hover:text-white hover:bg-gray-700"
    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200";

  return (
    <button
      role="tab"
      aria-selected={isSelected}
      data-state={isSelected ? "active" : "inactive"}
      onClick={() => setSelectedTab(value)}
      className={`${baseClasses} ${isSelected ? selectedClasses : inactiveClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ value, className, children, ...props }) => {
  const { selectedTab } = React.useContext(TabsContext);
  const isSelected = selectedTab === value;

  if (!isSelected) return null;

  return (
    <div
      role="tabpanel"
      data-state={isSelected ? "active" : "inactive"}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };