//
// Copyright © 2020 Province of British Columbia
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,git
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

import React, { useEffect, useState } from 'react';
import { CircularProgress, Container } from '@material-ui/core';
import useApi from '../../utils/api';
import { ReportState, SubmittedReport } from '../../types'
import ReportsToReviewList from '../../components/reports/ReportsToReviewList';

const ReportsToReview: React.FC = () => {
  const api = useApi();
  const queryOptions = {state: ReportState.Submitted};
  const [reports, setReports] = useState([] as SubmittedReport[]);

  useEffect(() => {
    api
      .getReports('', queryOptions)
      .then(data => {
        console.log(data);
        setReports(data as SubmittedReport[]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container maxWidth="lg">
      { reports.length > 0 ? <ReportsToReviewList reports={reports}/> : <CircularProgress /> }
    </Container>
  );
}

export default ReportsToReview;