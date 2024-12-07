import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'

interface Props {
  income: number
  outcome: number
}

ChartJS.register(ArcElement, Tooltip)

const centerTextPlugin = {
  id: 'centerText',
  beforeDraw(chart: { ctx: any; width: any; height: any }) {
    const { ctx, width, height } = chart
    ctx.save()

    // Custom title text
    const titleText = 'Nov, 2024'

    // Font settings
    ctx.font = 'bold 12px Arial'
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Draw the text in the center
    ctx.fillText(titleText, width / 2, height / 2)

    ctx.restore()
  }
}

export default function DoughnutChart({ income, outcome }: Props) {
  ChartJS.unregister(Legend)
  const data = {
    labels: ['Income', 'Outcome'],
    datasets: [
      {
        data: [income, outcome],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        hoverBackgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(255, 99, 132, 0.8)']
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true
      }
    }
  }

  return (
    <div className='relative flex h-40 w-6/12 flex-col items-center justify-center justify-self-center rounded-2xl bg-cover bg-center text-center'>
      <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
    </div>
  )
}
