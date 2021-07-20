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
import React, { useEffect } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';

import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import useApi from '../utils/api';
import { Project, Report, ReportState, StoreState, User } from '../types';
import { reportDetailTabs } from '../constants';
import { getReportingPeriodEnd, getReportingPeriodStart } from '../utils/dateUtils';
import KPIItem from '../components/projects/KPIItem';
import ObjectiveItem from '../components/projects/ObjectiveItem';
import MilestoneItem from '../components/projects/MilestoneItem';
import StatusSummaryCard from '../components/reports/StatusSummaryCard';
import CurrentFYFinanceTable from '../components/reports/CurrentFYFinanceTable';
import OverallProjectFinanceTable from '../components/reports/OverallProjectFinanceTable';
import ProjectDetailsInfoStep from '../components/projects/ProjectDetailsInfoStep';

interface TabPanelProps {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const allyProps = (index: any) => {
  return {
    id: `report-details-tab-${index}`,
    'aria-controls': `report-details-tabpanel-${index}`,
  };
};

type Props = {
  user: User;
};

const ReportDetails: React.FC<Props> = (props) => {
  const { user } = props;
  const [tabValue, setTabValue] = React.useState(0);
  const [report, setReport] = React.useState({} as Report);
  const [project, setProject] = React.useState({} as Project);
  const { reportId } = useParams<{ reportId: string }>();
  const api = useApi();
  const history = useHistory();

  const handleChange = (event: React.ChangeEvent<{ [k: string]: never }>, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (!report.id) {
      api
        .getReport(reportId)
        .then(reportData => {
          setReport(reportData);
          return api.getProject(reportData.projectId);
        })
        .then(projectData => setProject(projectData));
    }
  });

  // TODO: (Samara) fix margins around headings; currently not enough whitespace
  const getStatusSummaryStep = () => {
    return (
      <>
        <Typography variant="h5" gutterBottom>
          Status Summary
        </Typography>
        <Grid container spacing={2} alignItems="stretch">
          {report.statuses.map(status => {
            return <StatusSummaryCard status={status} />;
          })}
        </Grid>
        <Typography variant="h5" gutterBottom>
          Key Performance Indicators
        </Typography>
        <Grid container spacing={2}>
          {report.kpis.map(kpi => {
            return <KPIItem kpi={kpi} useGrid />;
          })}
        </Grid>
      </>
    );
  };

  const renderTabs = () => {
    return (
      <>
        <Paper>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
          >
            {reportDetailTabs.map((tab, index) => (
              <Tab label={tab} {...allyProps(index)} />
            ))}
          </Tabs>
        </Paper>
        <TabPanel value={tabValue} index={0}>
          <ProjectDetailsInfoStep project={project} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          {getStatusSummaryStep()}
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Box mb={4}>
            <CurrentFYFinanceTable report={report} />
          </Box>
          <Box mb={4}>
            <OverallProjectFinanceTable report={report} />
          </Box>
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          {report.objectives.map(objective => (
            <Box mb={4}>
              <ObjectiveItem objective={objective} />
            </Box>
          ))}
        </TabPanel>
        <TabPanel value={tabValue} index={4}>
          {report.milestones.map(milestone => (
            <Box mb={4}>
              <MilestoneItem milestone={milestone} />
            </Box>
          ))}
        </TabPanel>
      </>
    );
  };

  const renderContent = () => {
    return report.id ? renderTabs() : <CircularProgress />;
  };

  const submit = () => {
    // TODO: Limit the period of time that a user can submit?
    if (user) {
      const update = {
        id: report.id,
        state: ReportState.Submitted,
        submitter: user.id,
        submittedAt: new Date(),
      };
      api.updateReport(update).then(setReport);
    } else {
      history.push('/login');
    }
  };

  const handleClick = () => {
    if (report.state === ReportState.Review) {
      submit();
    } else {
      history.push(`/submit-report/${report.projectId}`);
    }
  };

  const getSubmissionInfo = () => {
    const { firstName, lastName } = report.submitter as User;
    return (
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Typography variant="subtitle2">Submitted by </Typography>
        <Box px={1}><Typography variant="subtitle1">{firstName} {lastName}</Typography></Box>
        <Typography variant="subtitle2">at {report.submittedAt ? new Date(report.submittedAt).toLocaleDateString('en-CA') : ''}</Typography>
      </Box>
    )
  };

  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
        m={4}
        pr={4}
      >
        <Typography variant="h5">
          Reporting Period From{' '}
          {getReportingPeriodStart(report.year, report.quarter).toLocaleDateString('en-CA')} -{' '}
          {getReportingPeriodEnd(report.year, report.quarter).toLocaleDateString('en-CA')}
        </Typography>
        {report.state === ReportState.Submitted ? (
          getSubmissionInfo()
        ) : (
          <Button variant="contained" color="primary" onClick={handleClick}>
            {report.state === ReportState.Draft ? 'Continue Report' : 'Submit'}
          </Button>
        )}
      </Box>
      <Box>{renderContent()}</Box>
    </Container>
  );
};

const mapState = ({ user }: StoreState): { user: User } => {
  return { user };
};

export default connect(mapState)(ReportDetails);