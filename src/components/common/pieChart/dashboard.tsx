import DataCard from '../../containers/desktop/cards';
import LineChart from './lineChart';
import PieChart from './pieChart';
import StatisticBox from './statisticBox';

const Dashboard = () => {
  // const [showStatistics, setShowStatistics] = useState(false);
  // const toggleStatistics = () => setShowStatistics(!showStatistics);

  // const statisticsData = {
  //   labels: ['Categoría 1', 'Categoría 2', 'Categoría 3'],
  //   values: [50, 75, 100],
  // };

  return (
    <div className='p-8'>
    <div className="flex gap-4">
    <DataCard title="Test" data="20" iconBg="bg-green-500" ></DataCard>
    <DataCard title="Test" data="20" iconBg="bg-green-500" ></DataCard>
    <DataCard title="Test" data="20" iconBg="bg-green-500" ></DataCard>


    </div>
    <div className="grid grid-cols-3 gap-4">
   
      <div className=" p-4 shadow-md">
        <h2 className="text-lg font-semibold mb-2">Estadísticas en torta</h2>
        <PieChart />
      </div>
    

      
      <div className=" p-4 shadow-md">
        <h2 className="text-lg font-semibold mb-2">Estadísticas en torta</h2>
        <StatisticBox />
      </div>
      <div className="p-4 shadow-md">
        <h2 className="text-lg font-semibold mb-2">Estadísticas en torta</h2>
        <LineChart />
      </div>

    </div>
    </div>
  );
};

export default Dashboard;
