import { useEffect, useState } from 'react'
import { useDashboard } from '../../hooks/useDashboard'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

function GraficaActivos() {
    const { activos } = useDashboard()
    const [data, setData] = useState({
        labels: [],
        datasets: []
    })
    useEffect(() => {
        if (!activos?.length) return
        const datos = activos[0]
        setData({
            labels: [
                'Valor de compra',
                'Valor de venta'
            ],
            datasets: [
                {
                    label: 'Resumen de activos',
                    data: [
                        datos.inversion,
                        datos.activos
                    ],
                    backgroundColor: [
                        'rgba(168, 85, 247, 0.85)', // violeta
                        'rgba(59, 130, 246, 0.85)' // azul
                    ],

                    borderColor: [
                        '#a855f7',
                        '#3b82f6'
                    ],

                    borderWidth: 2,
                    borderRadius: 12,
                    barThickness: 70
                }
            ]
        })
    }, [activos])
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#e2e8f0'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#cbd5e1',
                    font: {
                        size: 13,
                        weight: '600'
                    }
                },
                grid: {
                    color: 'rgba(255,255,255,0.06)'
                }
            },
            y: {
                ticks: {
                    color: '#cbd5e1'
                },
                grid: {
                    color: 'rgba(255,255,255,0.06)'
                }
            }
        }
    }
    return (
        <div style={{ height: '200px', width:'700px' }}>
            <Bar
                data={data}
                options={options}
            />
        </div>
    )
}
export default GraficaActivos