
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Machine } from "@/types";

interface ResourceUtilizationProps {
  machines: Machine[];
}

export function ResourceUtilization({ machines }: ResourceUtilizationProps) {
  // Prepare data for the chart
  const data = machines.map(machine => ({
    name: machine.name,
    efficiency: Math.round(machine.efficiency * 100),
    status: machine.status
  }));
  
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-lg">Resource Utilization</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                domain={[0, 100]}
                unit="%"
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Efficiency']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.375rem',
                  padding: '8px'
                }}
              />
              <Bar 
                dataKey="efficiency" 
                name="Efficiency" 
                barSize={30}
                radius={[4, 4, 0, 0]}
                fill="#4EADB3"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
