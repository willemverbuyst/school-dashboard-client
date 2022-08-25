import { Col, Row } from 'antd'
import { ReactElement } from 'react'
import { DoughnutChart } from '../../../components/charts/'
import { TestResult } from '../testResultsForSubject/BarChartTestsSubject'

interface IProps {
  results: TestResult[]
}

export default function DoughnutChartStudent({
  results,
}: IProps): ReactElement {
  return (
    <Row justify={'space-around'}>
      {results.map(({ numberOfTests, score, subjectName }, i) => (
        <Col key={i} style={{ width: 350, paddingBottom: 80 }}>
          <DoughnutChart
            data={[
              (score / 3) * numberOfTests,
              100 - (score / 3) * numberOfTests,
            ]}
            color={['#8F1CB8', '#eee']}
            title={`${subjectName} ${Math.round((score / 3) * numberOfTests)}%`}
          />
        </Col>
      ))}
    </Row>
  )
}
