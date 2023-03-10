import { Col, Row } from "antd";

import { BarChartTest } from "../../../components/charts";
import { TestResult } from "../testResultsForSubject";

interface Props {
  results: Array<TestResult>;
}

export function BarChartTestsStudent({ results }: Props): JSX.Element {
  return (
    <Row justify={"space-around"}>
      {results.map(({ numberOfTests, score, userName }, i) => (
        <Col key={i} style={{ width: 350, paddingBottom: 80 }}>
          <BarChartTest
            data={[score]}
            color={["#8F1CB8"]}
            labels={[`${userName}: ${numberOfTests} tests`]}
            title={``}
          />
        </Col>
      ))}
    </Row>
  );
}
