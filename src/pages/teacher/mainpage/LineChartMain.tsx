import { Col } from "antd";
import moment from "moment";

import { LineChart } from "../../../components/charts";

interface Test {
  id: string;
  subjectId: string;
  studentId: string;
  scores: number;
  createdAt: string;
}

interface Props {
  tests: Test[];
}

export function LineChartMain({ tests }: Props): JSX.Element {
  // https://stackoverflow.com/questions/19395257/how-to-count-duplicate-value-in-an-array-in-javascript
  const testDates: string[] = tests.map((test) =>
    moment(test.createdAt).format("ll")
  );
  const reducedTests: { [key: string]: number } = testDates.reduce(
    (prev: { [key: string]: number }, cur: string) => {
      prev[cur] = (prev[cur] || 0) + 1;
      return prev;
    },
    {}
  );
  const labels: string[] = Object.keys(reducedTests);
  const data: number[] = Object.values(reducedTests);

  return (
    <Col style={{ width: 450, paddingBottom: 80 }}>
      {tests.length ? (
        <LineChart
          data={data}
          color="#B81D9D"
          title={"TESTS OVER TIME"}
          labels={labels}
          max={Math.max(...data)}
        />
      ) : (
        <p>THERE IS NOT ENOUGH DATA YET TO DISPLAY PIE CHART</p>
      )}
    </Col>
  );
}
