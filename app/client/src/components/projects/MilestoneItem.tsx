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
  Button,
  GridList,
  GridListTile,
  IconButton,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../theme';
import { Milestone, MilestoneStatus } from '../../types';

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

const MilestoneItem: React.FC<Milestone> = () => {
  // const { name, description, status, start, estimatedEnd, progress, comments } = props;

  const classes = useStyles();

  return (
    <Box>
      <Box
        display="flex"
        bgcolor={theme.colors.grey}
        justifyContent="space-between"
        alignItems="center"
        className={classes.header}
      >
        <Typography variant="h6">Milestone 1</Typography>
        <Box display="flex">
          <IconButton size="small">
            <DeleteIcon />
          </IconButton>
          <IconButton size="small">
            <EditIcon />
          </IconButton>
        </Box>
      </Box>
      <Box className={classes.body}>
        <GridList cols={2} cellHeight={140}>
          <GridListTile cols={1}>
            <Box flexDirection="column" p={1} mr={2}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="subtitle1">Progress</Typography>
                <Typography>10%</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="subtitle1">Status</Typography>
                <Button
                  variant="contained"
                  disabled
                  size="small"
                  style={{ borderRadius: '20px' }}
                >
                  Green
                </Button>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="subtitle1">Start Date</Typography>
                <Typography>2021/20/30</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="subtitle1">Planned Finish Date</Typography>
                <Typography>2021/20/30</Typography>
              </Box>
            </Box>
          </GridListTile>
          <GridListTile cols={1}>
            <Box p={1}>
              <Typography variant="subtitle1">Comments</Typography>
              <Typography variant="body1" />
            </Box>
          </GridListTile>
        </GridList>
      </Box>
    </Box>
  );
};

export default MilestoneItem;
