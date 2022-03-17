import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { usePage } from '@inertiajs/inertia-react';

const Chart = ({ marginTop }) => {
    const { vehicle_name, vehicle_usage_number, vehicle_fuel_consumption } = usePage().props;

    const vehicleNameLabels = vehicle_name
    const vehicleNumberData = {
        labels: vehicleNameLabels,
        datasets: [{
            label: 'Jumlah Pemakaian Untuk Setiap Kendaraan',
            data: vehicle_usage_number,
            borderWidth: 1,
            backgroundColor: [
                "#FFA500"
            ]
        }]
    };

    const vehicleConsumptionData = {
        labels: vehicleNameLabels,
        datasets: [{
            label: 'Konsumsi Bensin Per Liter Untuk Setiap Kendaraan',
            data: vehicle_fuel_consumption,
            borderWidth: 1,
            backgroundColor: [
                "#FFA500"
            ]
        }]
    };

    return (
        <div style={{ marginTop: marginTop, width: "700px" }}>
            <div className="p-3 rounded-lg bg-white shadow-lg">
                <h4 className="text-xl font-semibold mt-3">Jumlah Pemakaian Untuk Setiap Kendaraan</h4>
                <div className="">
                    <Bar
                        style={{ marginBottom: 50 }}
                        data={vehicleNumberData}
                    />
                </div>
            </div>
            <div className="p-3 rounded-lg bg-white shadow-lg mt-3">
                <h4 className="text-xl font-semibold mt-3">Konsumsi Bensin Per Liter Untuk Setiap Kendaraan</h4>
                <div className="">
                    <Bar
                        style={{ marginBottom: 50 }}
                        data={vehicleConsumptionData}
                    />
                </div>
            </div>
        </div>
    )
}

export default Chart;

