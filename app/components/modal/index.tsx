import * as React from "react";
import {
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from "@mui/material";

import assigneeList from "~/static/assigneeList.json";
import departmentList from "~/static/department.json";
import statusList from "~/static/statusList.json";
import {TableData} from "~/routes/todo"

const validationKeys = ["title",
"description",
"status",
"department",
"assignee",
"priority"]

// interface
interface Props {
  open: boolean
  handleClose: any
  data: TableData
  handleSubmit: any
}

// modal component for add/edit
export default function ModalComponent(props: Props) {
  const { open, handleClose, data, handleSubmit } = props;
  const [formData, setFormData] = React.useState<any>(data || {});
  const [error, setError] = React.useState<string[]>([]);

  // change field function
  const changeField = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // add - update values
  const saveFormValues = () => {
    let err: any = [];

    validationKeys.map(row => {
      if (!formData[row]) {
        err.push(row)
      }
    })

    if (err.length === 0) {
      handleSubmit(formData)
    }
    setError(err)
  }

  // return component
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {data.id ? "Add New Todo" : "Edit Todo"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={formData.title || ""}
                name="title"
                onChange={changeField}
                error={error.includes("title")}
                helperText={error.includes("title") ? "Please add title" : ""}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={formData.description || ""}
                name="description"
                onChange={changeField}
                error={error.includes("description")}

                helperText={error.includes("description") ? "Please add description" : ""}
              />
            </Grid>
            <Grid item sm={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" >Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.status || ""}
                  name="status"
                  label="status"
                  onChange={changeField}
                  error={error.includes("status")}

                >
                  {statusList.map((val) => (
                    <MenuItem value={val.value}>{val.label}</MenuItem>
                  ))}
                </Select>
                {error.includes("status") && (<FormHelperText sx={{color:"#d32f2f"}}>Please select any option</FormHelperText>)}
              </FormControl>
            </Grid>
            <Grid item sm={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Department
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.department || ""}
                  name="department"
                  label="department"
                  onChange={changeField}
                  error={error.includes("department")}
                >
                  {departmentList.map((val) => (
                    <MenuItem value={val.value}>{val.label}</MenuItem>
                  ))}
                </Select>
                {error.includes("department") && (<FormHelperText sx={{color:"#d32f2f"}}>Please select any option</FormHelperText>)}
              </FormControl>
            </Grid>
            <Grid item sm={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Assignee</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.assignee || ""}
                  name="assignee"
                  label="assignee"
                  onChange={changeField}
                  error={error.includes("assignee")}
                >
                  {assigneeList.map((val) => (
                    <MenuItem value={val.value}>{val.label}</MenuItem>
                  ))}
                </Select>
                {error.includes("assignee") && (<FormHelperText sx={{color:"#d32f2f"}}>Please select any option</FormHelperText>)}
              </FormControl>
            </Grid>
            <Grid item sm={12}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Priority
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  value={formData.priority || "low"}
                  name="priority"
                  onChange={changeField}

                >
                  <FormControlLabel
                    value="Low"
                    control={<Radio />}
                    label="Low"
                  />
                  <FormControlLabel
                    value="Medium"
                    control={<Radio />}
                    label="Medium"
                  />
                  <FormControlLabel
                    value="High"
                    control={<Radio />}
                    label="High"
                  />
                </RadioGroup>
                {error.includes("priority") && (<FormHelperText sx={{color:"#d32f2f"}}>Please select any option</FormHelperText>)}
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveFormValues} autoFocus variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
