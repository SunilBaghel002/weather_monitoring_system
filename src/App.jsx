import SearchBar from "./components/SearchBar";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="min-h-screen gradient-bg-welcome">
      {/* MAX WIDTH + CENTER + PADDING */}
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-6 center">
        <header className="mb-10 w-full padding-top">
          <SearchBar />
        </header>
        <main>
          <Dashboard />
        </main>
      </div>
    </div>
  );
}

export default App;
