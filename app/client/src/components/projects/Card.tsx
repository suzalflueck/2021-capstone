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
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

import React from 'react';
import { Typography, Box } from '@material-ui/core';

interface ICardItem {
  label?: string;
  content?: string;
}
const Card: React.FC<ICardItem> = (props) => {
  const { label = '', content = '' } = props;

  return (
    <Box width={1}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        fontWeight={800}
      >
        <Typography variant="h6">
          <Box fontWeight="fontWeightBold" mb={1} ml={3}>
            {label}
          </Box>
        </Typography>

        <Typography variant="h6">
          <Box fontWeight="fontWeightRegular" mb={1} mr={3}>
            {content}
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default Card;
