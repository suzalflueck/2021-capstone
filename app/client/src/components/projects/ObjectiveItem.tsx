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
import {
  Box,
  GridList,
  GridListTile,
  IconButton,
  Paper,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';

import { Objective } from '../../types';
import StatusButton from '../common/buttons/StatusButton';

const useStyles = makeStyles({
  header: {
    border: 1,
    borderStyle: 'solid',
    backgroundColor: 'lightgrey',
    height: 36,
    padding: '8px',
  },
  body: {
    border: 1,
    borderTop: 0,
    borderStyle: 'solid',
    padding: '8px',
  },
});

interface ObjectiveItemProps {
  deleteItem?: () => void;
  editItem?: () => void;
  objective: Objective;
}

const ObjectiveItem: React.FC<ObjectiveItemProps> = (props) => {
  const { deleteItem, editItem, objective } = props;
  const classes = useStyles();
  const { 
    name,
    description,
    status,
    estimatedEnd,
    comments,
    phase,
    asset } = objective;

  const formattedEstimatedEnd = (new Date(estimatedEnd)).toLocaleDateString('en-CA');

  return (
    <Paper variant="outlined">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        className={classes.header}
      >
        <Box display="flex" alignItems="center">
          <Typography variant="h6">{name}</Typography>
          <Typography variant="subtitle1" style={{ marginLeft: '8px' }}>
            {description}
          </Typography>
        </Box>
        <Box display="flex">
          <IconButton size="small" onClick={deleteItem}>
            <DeleteIcon />
          </IconButton>
          <IconButton size="small" onClick={editItem}>
            <EditIcon />
          </IconButton>
        </Box>
      </Box>
      <Box className={classes.body}>
        <GridList cols={2} cellHeight={140}>
          <GridListTile cols={1}>
            <Box flexDirection="column" p={1} mr={1}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="subtitle1">Status</Typography>
                <StatusButton status={status} />
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="subtitle1">
                  Target Completion Date
                </Typography>
                <Typography>{formattedEstimatedEnd}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="subtitle1">Phase</Typography>
                <Typography>{phase}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="subtitle1">Asset</Typography>
                <Typography>{asset}</Typography>
              </Box>
            </Box>
          </GridListTile>
          <GridListTile cols={1}>
            <Box p={1}>
              <Typography variant="subtitle1">Comments</Typography>
              <Typography variant="body1">{comments}</Typography>
            </Box>
          </GridListTile>
        </GridList>
      </Box>
    </Paper>
  );
};

export default ObjectiveItem;
