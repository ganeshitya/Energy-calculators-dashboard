// src/components/BatteryDegradationCalculator.js

export function renderBatteryDegradationCalculator(targetElementId) {
    const target = document.getElementById(targetElementId);
    if (!target) {
        console.error(`Target element with ID "${targetElementId}" not found.`);
        return;
    }

    target.innerHTML = `
        <div class="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto my-8">
            <h2 class="text-3xl font-bold text-gray-800 mb-6">Battery Degradation Simulator</h2>

            <div class="mb-4">
                <label for="initialCapacity" class="block text-gray-700 text-sm font-bold mb-2">
                    Initial Battery Capacity (kWh):
                </label>
                <input type="number" id="initialCapacity" value="100" step="1"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="e.g., 100">
            </div>

            <div class="mb-4">
                <label for="dailyCycles" class="block text-gray-700 text-sm font-bold mb-2">
                    Avg. Daily Cycles (e.g., 0.5 for half cycle per day):
                </label>
                <input type="number" id="dailyCycles" value="0.5" step="0.1"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="e.g., 0.5">
            </div>

            <div class="mb-4">
                <label for="degradationRate" class="block text-gray-700 text-sm font-bold mb-2">
                    Degradation Rate per Full Cycle (%):
                </label>
                <input type="number" id="degradationRate" value="0.05" step="0.01"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="e.g., 0.05 (for 0.05%)">
            </div>

            <div class="mb-6">
                <label for="simulationYears" class="block text-gray-700 text-sm font-bold mb-2">
                    Simulation Years:
                </label>
                <input type="number" id="simulationYears" value="5" step="1"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="e.g., 5">
            </div>

            <button id="calculateDegradationBtn"
                class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-150">
                Simulate Degradation
            </button>

            <div id="degradationResult" class="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded text-indigo-800 font-semibold text-center hidden">
                <p>Initial Capacity: <span id="initialCapResult">0</span> kWh</p>
                <p>Capacity after <span id="yearsResult">0</span> Years: <span id="finalCapResult">0</span> kWh</p>
                <p>Total Capacity Lost: <span id="lostCapResult">0</span> kWh</p>
            </div>
        </div>
    `;

    const calculateDegradationBtn = document.getElementById('calculateDegradationBtn');
    calculateDegradationBtn.addEventListener('click', calculateDegradation);

    function calculateDegradation() {
        const initialCapacity = parseFloat(document.getElementById('initialCapacity').value);
        const dailyCycles = parseFloat(document.getElementById('dailyCycles').value);
        const degradationRate = parseFloat(document.getElementById('degradationRate').value); // As a percentage, e.g., 0.05 for 0.05%
        const simulationYears = parseInt(document.getElementById('simulationYears').value);

        if (isNaN(initialCapacity) || isNaN(dailyCycles) || isNaN(degradationRate) || isNaN(simulationYears) ||
            initialCapacity <= 0 || dailyCycles < 0 || degradationRate < 0 || simulationYears <= 0) {
            alert('Please enter valid positive numbers for all inputs.');
            return;
        }

        // Calculate total cycles
        const totalCycles = dailyCycles * 365 * simulationYears;

        // Calculate total degradation
        const totalDegradation = (totalCycles * (degradationRate / 100)); // Degradation is sum of deg per cycle

        // Final capacity
        const finalCapacity = initialCapacity * (1 - totalDegradation); // Simple linear model

        // Cap final capacity at 0 if it goes negative (for extremely high degradation)
        const effectiveFinalCapacity = Math.max(0, finalCapacity);
        const capacityLost = initialCapacity - effectiveFinalCapacity;

        document.getElementById('initialCapResult').textContent = initialCapacity.toFixed(2);
        document.getElementById('yearsResult').textContent = simulationYears;
        document.getElementById('finalCapResult').textContent = effectiveFinalCapacity.toFixed(2);
        document.getElementById('lostCapResult').textContent = capacityLost.toFixed(2);
        document.getElementById('degradationResult').classList.remove('hidden');
    }
}