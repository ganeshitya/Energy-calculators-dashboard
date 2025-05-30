import Sidebar from './components/Sidebar'

const App = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          GM-Energy Calculators
        </h1>
        <p className="text-gray-700">Choose a calculator from the sidebar 👈</p>
      </div>
    </div>
  )
}

export default App