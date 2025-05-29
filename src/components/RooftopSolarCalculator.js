// src/components/RooftopSolarCalculator.js

// Function to render the calculator HTML into a target element
export function renderRooftopSolarCalculator(targetElementId) {
    const target = document.getElementById(targetElementId);
    if (!target) {
        console.error(`Target element with ID "${targetElementId}" not found.`);
        return;
    }

    target.innerHTML = `
        <div class="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto my-8">
            <h2 class="text-3xl font-bold text-gray-800 mb-6">Rooftop Solar Calculator</h2>

            <div class="mb-4">
                <label for="sunlightHours" class="block text-gray-700 text-sm font-bold mb-2">
                    Avg. Daily Sunlight Hours (peak sun hours):
                </label>
                <input type="number" id="sunlightHours" value="4" step="0.1"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="e.g., 4">
            </div>

            <div class="mb-4">
                <label for="desiredEnergy" class="block text-gray-700 text-sm font-bold mb-2">
                    Desired Daily Energy Production (kWh):
                </label>
                <input type="number" id="desiredEnergy" value="10" step="0.1"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="e.g., 10">
            </div>

            <div class="mb-4">
                <label for="panelEfficiency" class="block text-gray-700 text-sm font-bold mb-2">
                    Solar Panel Efficiency (%):
                </label>
                <input type="number" id="panelEfficiency" value="20" step="1"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="e.g., 20">
            </div>

            <div class="mb-6">
                <label for="systemLosses" class="block text-gray-700 text-sm font-bold mb-2">
                    System Losses (%):
                </label>
                <input type="number" id="systemLosses" value="14" step="1"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="e.g., 14">
            </div>

            <button id="calculateBtn"
                class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-150">
                Calculate Required Area
            </button>

            <div id="result" class="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded text-indigo-800 font-semibold text-center hidden">
                Required Solar Panel Area: <span id="areaResult">0</span> sq meters
            </div>
        </div>
    `;

    // Add event listener for calculation
    const calculateBtn = document.getElementById('calculateBtn');
    calculateBtn.addEventListener('click', calculateArea);

    function calculateArea() {
        const sunlightHours = parseFloat(document.getElementById('sunlightHours').value);
        const desiredEnergy = parseFloat(document.getElementById('desiredEnergy').value);
        const panelEfficiency = parseFloat(document.getElementById('panelEfficiency').value);
        const systemLosses = parseFloat(document.getElementById('systemLosses').value);

        if (isNaN(sunlightHours) || isNaN(desiredEnergy) || isNaN(panelEfficiency) || isNaN(systemLosses) ||
            sunlightHours <= 0 || desiredEnergy <= 0 || panelEfficiency <= 0 || systemLosses < 0) {
            alert('Please enter valid positive numbers for all inputs.');
            return;
        }

        // Convert percentages to decimals
        const eff = panelEfficiency / 100;
        const loss = systemLosses / 100;

        // Simplified calculation (adjust based on your exact Streamlit logic if different)
        // Energy per sq meter per day = (Sunlight Hours * Panel Efficiency * (1 - System Losses)) / 1000 (kW to W conversion for solar panels typically)
        // Let's assume typical solar panel output is in W/sq meter, so 1000W/sq meter is ideal.
        // Formula: Required Area (sq meters) = Desired Energy (kWh) / (Sunlight Hours * Panel Efficiency * (1 - System Losses) * Ideal_Irradiance_kWh_per_sqm_per_hour)
        // A common approximation for standard test conditions (STC) is 1000 W/m² (or 1 kW/m²).
        // So, daily energy generated per sq meter = Sunlight Hours * 1kW/m² * Efficiency * (1-Losses)
        // Required Area = Desired Energy (kWh) / (Sunlight Hours * Eff * (1 - Loss))

        const requiredArea = desiredEnergy / (sunlightHours * eff * (1 - loss));

        document.getElementById('areaResult').textContent = requiredArea.toFixed(2);
        document.getElementById('result').classList.remove('hidden');
    }
}