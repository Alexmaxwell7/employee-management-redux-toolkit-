import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Employee } from '../../types/employeeTypes';
import { fetchEmployees, addEmployee, updateEmployee, deleteEmployee } from '../../services/employeeService';

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
};

export const fetchEmployeesAsync = createAsyncThunk<Employee[]>('employees/fetch', fetchEmployees);
export const addEmployeeAsync = createAsyncThunk<Employee, Employee>('employees/add', addEmployee);
export const updateEmployeeAsync = createAsyncThunk<Employee, Employee>('employees/update', updateEmployee);
export const deleteEmployeeAsync = createAsyncThunk<number, number>('employees/delete', deleteEmployee);

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployeesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployeesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch employees';
      })
      .addCase(addEmployeeAsync.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(updateEmployeeAsync.fulfilled, (state, action) => {
        const index = state.employees.findIndex((emp) => emp.id === action.payload.id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      .addCase(deleteEmployeeAsync.fulfilled, (state, action) => {
        state.employees = state.employees.filter((emp:any) => emp.id !== action.payload);
      });
  },
});

export default employeeSlice.reducer;
