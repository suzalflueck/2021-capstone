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

import { NextFunction, Request, Response } from 'express';
import ReportService from '@services/reports.service';
import { Report, Quarter } from '@interfaces/report.interface';
import ReportDTO from '@dtos/report.dto';
import MilestoneDTO from '@dtos/milestone.dto';
import ObjectiveDTO from '@dtos/objective.dto';
import ReportStatusDTO from '@dtos/reportStatus.dto';

const ReportController = {
  async getReports(req: Request, res: Response, next: NextFunction) {
    try {
      const { projectId, year, quarter } = req.query;
      if (!projectId) {
        res.status(400).send('Bad request');
      } else {
        const data: Report[] = await ReportService.findAllReports(projectId as string, +year, quarter as Quarter);
        res.status(200).json(data);
      }
      next();
    } catch (e) {
      next(e);
    }
  },

  async getReport(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).send('Bad request');
      } else {
        const data: Report = await ReportService.findReport(id);
        res.status(200).json(data);
      }
    } catch (e) {
      next(e);
    }
  },

  async createReport(req: Request, res: Response, next: NextFunction) {
    try {
      const input: ReportDTO = req.body;
      const data = await ReportService.createReport(input);
      res.status(201).json(data);
    } catch (e) {
      next(e);
    }
  },

  async updateReport(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const input: ReportDTO = req.body;
      const data = await ReportService.updateReport(id, input);
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  },

  async deleteReport(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await ReportService.deleteReport(id);
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  },

  async getMilestones(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await ReportService.getMilestones(id);
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  },

  async createMilestone(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const input: MilestoneDTO = req.body;
      const data = await ReportService.createMilestone(id, input);
      res.status(201).json(data);
    } catch (e) {
      next(e);
    }
  },

  async deleteMilestone(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, mid } = req.params;
      const data = await ReportService.deleteMilestone(id, mid);
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  },
  async updateMilestone(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, mid } = req.params;
      const input: MilestoneDTO = req.body;
      const data = await ReportService.updateMilestone(id, mid, input);
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  },
  async getObjectives(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await ReportService.getObjectives(id);
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  },
  async createObjective(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const input: ObjectiveDTO = req.body;
      const data = await ReportService.createObjective(id, input);
      res.status(201).json(data);
    } catch (e) {
      next(e);
    }
  },
  async deleteObjective(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, oid } = req.params;
      const data = await ReportService.deleteObjective(id, oid);
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  },
  async updateObjective(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, oid } = req.params;
      const input: ObjectiveDTO = req.body;
      const data = await ReportService.updateObjective(id, oid, input);
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  },
  async getStatuses(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await ReportService.getStatuses(id);
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  },
  async createStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const input: ReportStatusDTO = req.body;
      const data = await ReportService.createStatus(id, input);
      res.status(201).json(data);
    } catch (e) {
      next(e);
    }
  },
  async deleteStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, sid } = req.params;
      const data = await ReportService.deleteStatus(id, sid);
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  },
  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, sid } = req.params;
      const input: ReportStatusDTO = req.body;
      const data = await ReportService.updateStatus(id, sid, input);
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  },
};

export default ReportController;