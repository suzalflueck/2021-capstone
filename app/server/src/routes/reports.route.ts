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

import { Router } from 'express';
import Route from '@interfaces/routes.interface';
import ReportController from '@controllers/reports.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import ReportDTO, { ReportQueryDTO } from '@dtos/report.dto';
import MilestoneDTO from '@dtos/milestone.dto';
import ObjectiveDTO from '@dtos/objective.dto';
import ReportStatusDTO from '@dtos/reportStatus.dto';

class ReportsRoute implements Route {
  resource = 'reports';

  secure = true;

  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route('/')
      .get(validationMiddleware(ReportQueryDTO, 'query'), ReportController.getReports)
      .post(validationMiddleware(ReportDTO, 'body'), ReportController.createReport);

    this.router
      .route('/:id')
      .get(ReportController.getReport)
      .delete(ReportController.deleteReport)
      .patch(validationMiddleware(ReportDTO, 'body', true), ReportController.updateReport);

    // Milestone routes
    this.router.route('/:id/milestones').get(ReportController.getMilestones);

    this.router
      .route('/:id/milestones')
      .post(validationMiddleware(MilestoneDTO, 'body'), ReportController.createMilestone);

    this.router
      .route('/:id/milestones/:mid')
      .delete(ReportController.deleteMilestone)
      .patch(validationMiddleware(MilestoneDTO, 'body', true), ReportController.updateMilestone);

    // Objective routes
    this.router.route('/:id/objectives').get(ReportController.getObjectives);

    this.router
      .route('/:id/objectives')
      .post(validationMiddleware(ObjectiveDTO, 'body'), ReportController.createObjective);

    this.router
      .route('/:id/objectives/:oid')
      .delete(ReportController.deleteObjective)
      .patch(validationMiddleware(ObjectiveDTO, 'body', true), ReportController.updateObjective);

    // Report status routes
    this.router.route('/:id/statuses').get(ReportController.getStatuses);

    this.router
      .route('/:id/statuses')
      .post(validationMiddleware(ReportStatusDTO, 'body'), ReportController.createStatus);

    this.router
      .route('/:id/statuses/:sid')
      .delete(ReportController.deleteStatus)
      .patch(validationMiddleware(ReportStatusDTO, 'body', true), ReportController.updateStatus);
  }
}

export default ReportsRoute;
