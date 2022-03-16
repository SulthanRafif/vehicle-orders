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
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 mt-3">
                <div className="grid gap-y-4 lg:col-span-1 col-span-2">
                    <div className="chart-container flex flex-col p-3 rounded-lg h-full w-full bg-white h-1/2 shadow-lg p-4 mb-3">
                        <h4 className="my-2 text-xl font-semibold">Jumlah Pemakaian Untuk Setiap Kendaraan</h4>
                        <div className="lg:w-1/2 w-full self-center">
                            <Bar
                                style={{ marginBottom: 50 }}
                                data={vehicleNumberData}
                            />
                        </div>
                    </div>
                    <div className="chart-container flex flex-col p-3 rounded-lg h-full w-full bg-white h-1/2 shadow-lg p-4 mb-3">
                        <h4 className="my-2 text-xl font-semibold">Konsumsi Bensin Per Liter Untuk Setiap Kendaraan</h4>
                        <div className="lg:w-1/2 w-full self-center">
                            <Bar
                                style={{ marginBottom: 50 }}
                                data={vehicleConsumptionData}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chart;

