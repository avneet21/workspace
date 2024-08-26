import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export const UITable = ({
  tableHeaderData,
  tableBodyData,
  onClickDelete,
  onClickEdit,
  onClickAction,
}) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <TableContainer component={Paper} className="table-container">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHeaderData.map((item) => (
                <TableCell>{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableBodyData.map((row, i) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {Object.keys(row).map((item, i) => (
                  <TableCell
                    component="th"
                    scope="row"
                    key={item}
                    style={
                      item === "action"
                        ? {
                            color: "rgb(6, 115, 193)",
                            textDecoration: "underline",
                            cursor: "pointer",
                          }
                        : {}
                    }
                  >
                    {row[item] === "delete" || row[item] === "edit" ? (
                      <IconButton
                        aria-label={row[item]}
                        onClick={() =>
                          row[item] === "delete"
                            ? onClickDelete(row)
                            : onClickEdit(row)
                        }
                      >
                        {" "}
                        {row[item] === "delete" ? <DeleteIcon /> : <EditIcon />}
                      </IconButton>
                    ) : item === "action" ? (
                      <span onClick={() => onClickAction(row)}>
                        {row[item]}
                      </span>
                    ) : (
                      row[item]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
