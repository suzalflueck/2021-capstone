/**
 * Copyright © 2021 Province of British Columbia
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Server-side utilities
 * @author [SungHwan Park](shwpark612@gmail.com)
 * @package
 */

import _ from 'lodash';
import { cleanEnv, port, str } from 'envalid';

import { errorWithCode } from '@bcgov/common-nodejs-utils';
import {
  Kpi,
  Quarter,
  Report,
  ReportState,
  ReportStatus,
  Status,
  StatusType,
  Trend,
} from '@interfaces/report.interface';
import ReportDTO from '@dtos/ReportDTO';
import { Project } from '@interfaces/project.interface';
import MilestoneDTO from '@dtos/MilestoneDTO';
import ObjectiveDTO from '@dtos/ObjectiveDTO';

export const checkIfEmpty = (value: string | number | object, name: string, code: number) => {
  if (
    value === null ||
    value === 'undefined' ||
    value === undefined ||
    (typeof value !== 'number' && value === '') ||
    (typeof value === 'object' && !Object.keys(value).length)
  ) {
    throw errorWithCode(`'${name} is not set`, code);
  }
};

/**
 * @param {Number} timeout in milliseconds
 */
export const sleep = (timeout: number): Promise<void> => {
  return new Promise<void>(resolve => {
    setTimeout(() => resolve(), timeout);
  });
};

export const removeProperties = (obj: Record<string, any>, ...fields: any[]) => {
  // eslint-disable-next-line no-param-reassign
  fields.forEach(key => delete obj[key]);
  Object.values(obj).forEach(value => {
    if (typeof value === 'object') {
      removeProperties(value, ...fields);
    }
  });
};

export const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
  });
};

export function getNextReport(report: Report): ReportDTO {
  // TODO: (Nick) exception when the project has been completed
  const newReport = _.omit(report, '_id', 'submitter', 'submittedAt', 'createdAt', 'updatedAt');
  removeProperties(newReport);
  const { quarter } = newReport;
  switch (quarter) {
    case Quarter.Q1:
      newReport.quarter = Quarter.Q2;
      break;
    case Quarter.Q2:
      newReport.quarter = Quarter.Q3a;
      break;
    case Quarter.Q3a:
      newReport.quarter = Quarter.Q3b;
      break;
    case Quarter.Q3b:
      newReport.quarter = Quarter.Q4;
      break;
    default:
      // Q4
      newReport.quarter = Quarter.Q1;
      newReport.year += 1;
      break;
  }
  newReport.state = ReportState.Draft;
  return newReport;
}

export const getInitialReport = (
  project: Project,
  milestones: MilestoneDTO[],
  objectives: ObjectiveDTO[],
  kpis: Kpi[],
): Report => {
  const { id: projectId, estimatedEnd, start, manager: submitter } = project;

  const year = start.getFullYear();

  let quarter = Quarter.Q1;
  const month = start.getMonth();
  if (month > 2 && month < 6) {
    quarter = Quarter.Q2;
  } else if (month < 9) {
    quarter = Quarter.Q3a;
  } else {
    quarter = Quarter.Q4;
  }

  const statuses: ReportStatus[] = Object.values(StatusType)
    .filter(type => typeof type === 'number')
    .map((type: StatusType) => {
      return { status: Status.Green, trend: Trend.Steady, comments: '', type };
    });

  const report: Report = {
    projectId,
    estimatedEnd,
    phase: '',
    progress: 0,
    quarter,
    submitter,
    state: ReportState.Draft,
    statuses,
    year,
    milestones,
    objectives,
    kpis,
  };
  return report;
};

export default {
  checkIfEmpty,
  getInitialReport,
  getNextReport,
  removeProperties,
  sleep,
  validateEnv,
};
