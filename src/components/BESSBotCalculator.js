// src/components/BESSBotCalculator.js

export function renderBESSBotCalculator(targetElementId) {
    const target = document.getElementById(targetElementId);
    if (!target) {
        console.error(`Target element with ID "${targetElementId}" not found.`);
        return;
    }

    target.innerHTML = `
        <div class="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto my-8">
            <h2 class="text-3xl font-bold text-gray-800 mb-6">BESS Sizing Calculator</h2>

            <div class="mb-4">
                <label for="desiredPower" class="block text-gray-700 text-sm font-bold mb-2">
                    Desired Power Output (kW):
                </label>
                <input type="number" id="desiredPower" value="50" step="1"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="e.g., 50">
            </div>

            <div class="mb-4">
                <label for="dischargeDuration" class="block text-gray-700 text-sm font-bold mb-2">
                    Desired Discharge Duration (Hours):
                </label>
                <input type="number" id="dischargeDuration" value="4" step="0.5"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="e.g., 4">
            </div>

            <div class="mb-4">
                <label for="roundTripEfficiency" class="block text-gray-700 text-sm font-bold mb-2">
                    Battery Round Trip Efficiency (%):
                </label>
                <input type="number" id="roundTripEfficiency" value="90" step="1"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="e.g., 90">
            </div>

            <div class="mb-6">
                <label for="usableDoD" class="block text-gray-700 text-sm font-bold mb-2">
                    Usable Depth of Discharge (DoD) (%):
                </label>
                <input type="number" id="usableDoD" value="80" step="1"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="e.g., 80">
            </div>

            <button id="calculateBESSBtn"
                class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-150">
                Calculate BESS Capacity
            </button>

            <div id="bessResult" class="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded text-indigo-800 font-semibold text-center hidden">
                Required Battery Capacity: <span id="requiredBESSResult">0</span> kWh
            </div>
        </div>
    `;

    const calculateBESSBtn = document.getElementById('calculateBESSBtn');
    calculateBESSBtn.addEventListener('click', calculateBESS);

    function calculateBESS() {
        const desiredPower = parseFloat(document.getElementById('desiredPower').value);
        const dischargeDuration = parseFloat(document.getElementById('dischargeDuration').value);
        const roundTripEfficiency = parseFloat(document.getElementById('roundTripEfficiency').value);
        const usableDoD = parseFloat(document.getElementById('usableDoD').value);

        if (isNaN(desiredPower) || isNaN(dischargeDuration) || isNaN(roundTripEfficiency) || isNaN(usableDoD) ||
            desiredPower <= 0 || dischargeDuration <= 0 || roundTripEfficiency <= 0 || usableDoD <= 0) {
            alert('Please enter valid positive numbers for all inputs.');
            return;
        }

        // Convert percentages to decimals
        const eff = roundTripEfficiency / 100;
        const dod = usableDoD / 100;

        // Calculate required energy output from battery
        const energyRequiredFromBattery = desiredPower * dischargeDuration;

        // Account for round-trip efficiency
        const energyNeededIntoBattery = energyRequiredFromBattery / eff;

        // Account for usable Depth of Discharge to get total battery capacity
        const totalBatteryCapacity = energyNeededIntoBattery / dod;


        document.getElementById('requiredBESSResult').textContent = totalBatteryCapacity.toFixed(2);
        document.getElementById('bessResult').classList.remove('hidden');
    }
}