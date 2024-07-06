import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function CustomizedTables({ props }) {
  const { data } = props;
  console.log(data);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Item</StyledTableCell>
            <StyledTableCell align="right">Response</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
            Available Beds
            </StyledTableCell>
            <StyledTableCell align="right">{56}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
            Available Testing Kits
            </StyledTableCell>
            <StyledTableCell align="right">
              {24}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
            Accepting Emergency Cases?
            </StyledTableCell>
            <StyledTableCell align="right">
              {data.AcceptingEmergencyCases ? "No": "Yes"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
            Accepting Routine Admissions? 
            </StyledTableCell>
            <StyledTableCell align="right">
              {data.AcceptingRoutineAdmissions ?  "No": "Yes"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
            Specialty Services Offered
            </StyledTableCell>
            <StyledTableCell align="right">
              {data.SpecialtyServicesOffered ?  "No": "Yes"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
            Number of Medical Staff
            </StyledTableCell>
            <StyledTableCell align="right">{26}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
            Current Patient Count
            </StyledTableCell>
            <StyledTableCell align="right">
              {23}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
            Available Ventilators
            </StyledTableCell>
            <StyledTableCell align="right">
              {15}
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
