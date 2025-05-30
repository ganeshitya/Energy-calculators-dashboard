const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-900 text-white p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4">GM-Energy</h2>
      <ul className="space-y-2">
        <li>
          <a href="#" className="hover:text-yellow-300">Battery Degradation</a>
        </li>
        <li>
          <a href="#" className="hover:text-yellow-300">Rooftop Solar</a>
        </li>
        <li>
          <a href="#" className="hover:text-yellow-300">BESS Bot</a>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
