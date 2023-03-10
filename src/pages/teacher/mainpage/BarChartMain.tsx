import { Col } from "antd";

import { BarChart } from "../../../components/charts";

interface Test {
  id: string;
  subjectId: string;
  studentId: string;
  scores: number;
  createdAt: string;
}

interface Subject {
  name: string;
  id: string;
}

interface Props {
  tests: Test[];
  subjects: Subject[];
}

export function BarChartMain({ tests, subjects }: Props): JSX.Element {
  const data = tests.map(({ scores }) => scores);
  const color: Array<string> = [];
  for (let i = 0; i < data.length; i++) color.push("#FF5C84");
  const labels = subjects.map(({ name }) => name);

  const subjectsGrouped = subjects.map((subject) =>
    tests.filter((test) => test.subjectId === subject.id)
  );

  const averages = subjectsGrouped.map((groupedSubject: any) =>
    Math.round(
      (groupedSubject
        .map((sub: any) => sub.scores)
        .reduce((a: number, b: number) => a + b, 0) /
        (groupedSubject.length * 3)) *
        100
    )
  );

  return (
    <Col style={{ width: 450, paddingBottom: 80 }}>
      {tests.length ? (
        <BarChart
          data={averages}
          color={color}
          labels={labels}
          title={`AVERAGES PER SUBJECT`}
          max={100}
        />
      ) : (
        <p>THERE IS NOT ENOUGH DATA YET TO DISPLAY BAR CHART</p>
      )}
    </Col>
  );
}
