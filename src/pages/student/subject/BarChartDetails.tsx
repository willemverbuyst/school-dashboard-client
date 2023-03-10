import { Col, Radio, Row, Space } from "antd";
import moment from "moment";
import { useState } from "react";

import { BarChart } from "../../../components/charts";

interface Result {
  createdAt: string;
  score: number;
  subject: number;
}

interface Subject {
  name: string;
  id: string;
}

interface Props {
  results: Result[];
  subjects: Subject[];
  subjectId: string;
}

export function BarChartDetails({ results }: Props): JSX.Element {
  const [radio, setRadio] = useState("date");

  const sortedData =
    radio === "date"
      ? results.sort(
          (a, b) =>
            new Date(a.createdAt).getDate() - new Date(b.createdAt).getDate()
        )
      : radio === "lowestFirst"
      ? results.sort((a, b) => a.score - b.score)
      : radio === "highestFirst"
      ? results.sort((a, b) => b.score - a.score)
      : results;

  const data = sortedData.map(({ score }) => score);
  const color: Array<string> = [];
  for (let i = 0; i < results.length; i++) color.push("rgb(255, 99, 132)");
  const labels = results.map(({ createdAt }) =>
    moment(createdAt).format("MMM Do YY")
  );

  return (
    <Col>
      <Row justify="center">
        <Col style={{ width: 650 }}>
          <BarChart data={data} color={color} labels={labels} max={3} />
        </Col>
      </Row>
      <Row style={{ paddingTop: 15 }} justify="center">
        <Space size="large">
          <Radio.Group onChange={(e) => setRadio(e.target.value)}>
            <Radio.Button style={{ marginRight: 5 }} value="date">
              Scores by date
            </Radio.Button>
            <Radio.Button style={{ marginRight: 5 }} value="lowestFirst">
              Scores Low to High
            </Radio.Button>
            <Radio.Button style={{ marginRight: 5 }} value="highestFirst">
              Scores High to Low
            </Radio.Button>
          </Radio.Group>
        </Space>
      </Row>
    </Col>
  );
}
