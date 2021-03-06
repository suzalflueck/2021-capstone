//
// Copyright © 2020 Province of British Columbia
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

import React from 'react';
import { Container, FormControl, Typography, Button, Modal, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import NewObjectiveForm from './NewObjectiveForm';
import { Objective } from '../../types';
import ObjectiveItem from './ObjectiveItem';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

interface ProjectObjectStepProps {
  onChange: (objectives: Objective[]) => void;
  data: Objective[];
}

/**
 * New project step 4 - Objectives step
 * @author      [Samara Flueck](samflueck95@gmail.com)
 */
const ProjectObjectivesStep: React.FC<ProjectObjectStepProps> = props => {
  const { onChange, data: existingObjectives } = props;

  const classes = useStyles();

  const [openObjective, setOpenObjective] = React.useState(false);
  const openObjectiveModal = () => {
    setOpenObjective(true);
  };

  const [objectives, setObjectives] = React.useState<Objective[]>(existingObjectives || []);

  const [cacheIndex, setCacheIndex] = React.useState(-1);

  const handleObjectiveModal = (data: Objective) => {
    setOpenObjective(false);
    setCacheIndex(-1);
    if (!data) return;
    const list: Objective[] = [];
    if (cacheIndex >= 0) {
      // update
      objectives.splice(cacheIndex, 1, data);
      list.push(...objectives);
    } else {
      list.push(...objectives, data);
    }
    setObjectives(list);
    onChange(list);
  };

  const deleteObjective = (index: number) => {
    return () => {
      if (index >= 0) {
        objectives.splice(index, 1);
        setObjectives([...objectives]);
      }
    };
  };

  const editObjective = (index: number) => {
    return () => {
      if (index >= 0) {
        setCacheIndex(index);
        setOpenObjective(true);
      }
    };
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" width="100%" justifyContent="center">
        <Box minWidth="600px">
          <Box my={4}>
            <Typography variant="h5" align="center">
              Business Case Objectives
            </Typography>
          </Box>
          <Box>
            {objectives.map((objective, index) => (
              <ObjectiveItem
                deleteItem={deleteObjective(index)}
                editItem={editObjective(index)}
                objective={objective}
                key={objective.name}
              />
            ))}
          </Box>
          <FormControl margin="normal" fullWidth>
            <Button color="primary" variant="contained" type="button" onClick={openObjectiveModal}>
              Add New Objective
            </Button>
          </FormControl>
        </Box>
      </Box>
      <Modal disableEnforceFocus open={openObjective} className={classes.modal}>
        <NewObjectiveForm objective={objectives[cacheIndex]} closeModal={handleObjectiveModal} />
      </Modal>
    </Container>
  );
};

export default ProjectObjectivesStep;
