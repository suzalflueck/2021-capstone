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

export enum Quarter {
  Q1 = 'Q1',
  Q2 = 'Q2',
  Q3a = 'Q3a',
  Q3b = 'Q3b',
  Q4 = 'Q4',
}

export enum ReportState {
  Draft,
  Review,
  Submitted,
}

export interface Report {
  id?: string;
  submitter: string;
  submittedAt: string | Date;
  year: number;
  quarter: Quarter;
  projectId: string;
  state: ReportState;
  phase: string;
  progress: number;
  estimatedEnd: string | Date;
  milestones: Milestone[];
  objectives: Objective[];
  statuses: ReportStatus[];
}

export enum Status {
  Green,
  Yellow,
  Red,
}

export enum Trend {
  Up,
  Steady,
  Down,
}

export enum StatusType {
  Overall,
  Scope,
  Budget,
  Schedule,
  Other,
}

export interface ReportStatus {
  id?: string;
  type: StatusType;
  status: Status;
  trend: Trend;
  comments: string;
}

export enum MilestoneStatus {
  Green,
  Yellow,
  Red,
  Completed,
  NotStarted,
}

export interface Milestone {
  id?: string;
  name: string;
  description: string;
  status: MilestoneStatus;
  start: Date;
  estimatedEnd: Date;
  progress: number;
  comments: string;
}

export interface Objective {
  id?: string;
  name: string;
  description: string;
  estimatedEnd: Date;
  status: Status;
  comments: string;
}