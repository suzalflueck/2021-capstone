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
 * Project controller
 * @author [SungHwan Park](shwpark612@gmail.com)
 * @module
 */

import { Project } from '@interfaces/project.interface';
import { NextFunction, Request, Response } from 'express';
import ProjectService from '@services/projects.service';
import ProjectDTO from '@dtos/ProjectDTO';
import { Report } from '@interfaces/report.interface';
import { getInitialReport } from '@utils/index';
import ReportModel from '@models/ReportModel';
import ProjectCreateDTO from '@dtos/ProjectCreateDTO';

const ProjectController = {
  async getProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const data: Project[] = await ProjectService.findAllProjects();
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  },

  async getProjectDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data: Project = await ProjectService.findProjectById(id);
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  },

  // TODO: (Nick) need to use transaction that is supported from mongodb v4
  async createProject(req: Request, res: Response, next: NextFunction) {
    try {
      const input: ProjectCreateDTO = req.body;
      const project: Project = await ProjectService.createProject(input);

      const { milestones, objectives, kpis } = input;
      let report: Report = getInitialReport(project, milestones, objectives, kpis);
      report = await ReportModel.create(report);

      res.status(201).json(project);
    } catch (e) {
      next(e);
    }
  },
  async deleteProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await ReportModel.deleteMany({ projectId: id });
      // TODO: (Nick) what kind of info do we need to record as a log
      const data: Project = await ProjectService.deleteProject(id);
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  },
  async updateProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const input: ProjectDTO = req.body;
      const data: Project = await ProjectService.updateProject(id, input);
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  },
};

export default ProjectController;
