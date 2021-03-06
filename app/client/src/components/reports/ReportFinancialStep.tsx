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

import * as React from 'react';
import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import _ from 'lodash';
import { useEffect } from 'react';
import { validateFinance } from '../../utils/validationSchema';
import { FinancialStatus } from '../../types';

const useStyles = makeStyles({
  elevation: {
    boxShadow: '0 3px 10px rgb(0 51 136 / 0.2)',
  },
});

type Props = {
  finance?: FinancialStatus | undefined;
  onChange: (data: FinancialStatus) => void;
  onValidation: (valid: boolean) => void;
};

/**
 * Edit-report step 3 - financial information
 * @author [SungHwan Park](shwpark612@gmail.com)
 */
const ReportFinancialStep = (props: Props) => {
  const { finance, onChange, onValidation } = props;
  const classes = useStyles();

  const initialValues: FinancialStatus = finance
    ? _.cloneDeep(finance)
    : {
        fyApproved: 0,
        fySitting: 0,
        jvToOcio: 0,
        fyForecast: 0,
        budget: 0,
        spendToEndOfPreFy: 0,
        remaining: 0,
        estimatedTotalCost: 0,
      };

  const formik = useFormik({
    initialValues,
    validationSchema: validateFinance,
    onSubmit: values => {
      try {
        validateFinance.validateSync(values);
        onChange(values);
        onValidation(true);
      } catch {
        onValidation(false);
      }
    }, // submit in the dismount hook
  });

  const { errors, values, isValid, handleSubmit, handleChange, handleBlur, setTouched } = formik;

  // report validation to parent
  useEffect(() => {
    onValidation(isValid);
    // eslint-disable-next-line
  }, [isValid]);

  useEffect(() => {
    // initial validation
    const allTouched = Object.keys(values).reduce((a, c) => ({ ...a, [c]: true }), {});
    setTouched(allTouched);
    return () => {
      // submit at dismount
      handleSubmit();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h5" align="center">
        Financial Information
      </Typography>

      <form>
        <Box display="flex" justifyContent="center">
          <Box width={1 / 2} m={5}>
            <Typography variant="h6" align="center">
              Current Fiscal Year
            </Typography>
            <TextField
              fullWidth
              id="fyApproved"
              name="fyApproved"
              label="Current FY Approved Funding"
              type="number"
              margin="normal"
              variant="outlined"
              value={values.fyApproved}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.fyApproved)}
              helperText={errors.fyApproved}
              className={classes.elevation}
            />

            <Typography variant="subtitle1" align="left">
              Current FY Actuals
            </Typography>
            <Box ml={3}>
              <TextField
                fullWidth
                id="fySitting"
                name="fySitting"
                label="Sitting in Ministry"
                type="number"
                margin="normal"
                variant="outlined"
                value={values.fySitting}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.fySitting)}
                helperText={errors.fySitting}
                className={classes.elevation}
              />
              <TextField
                fullWidth
                id="jvToOcio"
                name="jvToOcio"
                label="JV'd to OCIO"
                type="number"
                margin="normal"
                variant="outlined"
                value={values.jvToOcio}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.jvToOcio)}
                helperText={errors.jvToOcio}
                className={classes.elevation}
              />
              <TextField
                fullWidth
                id="currentFYActuals"
                name="currentFYActuals"
                label="Current FY Actuals"
                type="number"
                margin="normal"
                variant="outlined"
                disabled
                value={
                  (Number.isNaN(+values.fySitting) ? 0 : +values.fySitting) +
                  (Number.isNaN(+values.jvToOcio) ? 0 : +values.jvToOcio)
                }
              />
            </Box>
            {/* Note: there are 2 inputs that update each other for fyForecast.
                  Decided to have 1 input in current fiscal year and 1 input
                  in overall project information to not deviate too far from
                  how submitters are used to reporting.
            */}
            <TextField
              fullWidth
              id="fyForecast"
              name="fyForecast"
              label="Current Fiscal Year FY Forecasted Spend"
              type="number"
              margin="normal"
              variant="outlined"
              value={values.fyForecast}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.fyForecast)}
              helperText={errors.fyForecast}
              className={classes.elevation}
            />
            <TextField
              fullWidth
              id="currentFYVariance"
              name="currentFYVariance"
              label="Variance to Budget"
              type="number"
              margin="normal"
              variant="outlined"
              disabled
              value={
                (Number.isNaN(+values.fyApproved) ? 0 : +values.fyApproved) -
                (Number.isNaN(+values.fyForecast) ? 0 : +values.fyForecast)
              }
            />
          </Box>
          <Box width={1 / 2} m={5}>
            <Typography variant="h6" align="center">
              Overall Project Information
            </Typography>

            <TextField
              fullWidth
              id="budget"
              name="budget"
              label="Total Project Budget"
              type="number"
              margin="normal"
              variant="outlined"
              value={values.budget}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.budget)}
              helperText={errors.budget}
              className={classes.elevation}
            />
            <TextField
              fullWidth
              id="spendToEndOfPreFy"
              name="spendToEndOfPreFy"
              label="Project Spend to End of Previous FY"
              type="number"
              margin="normal"
              variant="outlined"
              value={values.spendToEndOfPreFy}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.spendToEndOfPreFy)}
              helperText={errors.spendToEndOfPreFy}
              className={classes.elevation}
            />
            <TextField
              fullWidth
              id="fyForecast"
              name="fyForecast"
              label="Current FY Full Year Forecasted Spend"
              type="number"
              margin="normal"
              variant="outlined"
              value={values.fyForecast}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.fyForecast)}
              helperText={errors.fyForecast}
              className={classes.elevation}
            />
            <TextField
              fullWidth
              id="remaining"
              name="remaining"
              label="Project Funding for Remaining FYs"
              type="number"
              margin="normal"
              variant="outlined"
              value={values.remaining}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.remaining)}
              helperText={errors.remaining}
              className={classes.elevation}
            />
            <TextField
              fullWidth
              id="estimatedTotalCost"
              name="estimatedTotalCost"
              label="Estimated Total Cost"
              type="number"
              margin="normal"
              variant="outlined"
              value={values.estimatedTotalCost}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.estimatedTotalCost)}
              helperText={errors.estimatedTotalCost}
              className={classes.elevation}
            />
            <TextField
              fullWidth
              id="projectVariance"
              name="projectVariance"
              label="Variance to Budget"
              type="number"
              margin="normal"
              variant="outlined"
              disabled
              value={
                (Number.isNaN(+values.budget) ? 0 : +values.budget) -
                (Number.isNaN(+values.estimatedTotalCost) ? 0 : +values.estimatedTotalCost)
              }
            />
          </Box>
        </Box>
      </form>
    </Container>
  );
};

ReportFinancialStep.defaultProps = {
  finance: {
    fyApproved: 0,
    fySitting: 0,
    jvToOcio: 0,
    fyForecast: 0,
    budget: 0,
    spendToEndOfPreFy: 0,
    remaining: 0,
    estimatedTotalCost: 0,
  },
};

export default ReportFinancialStep;
