import axios from "axios";
import { Employee } from "../types/employeeTypes";

const BASE_URL = "http://localhost:5000/employees";

const LOGIN_URL = "http://localhost:5000/users";
interface LoginCredentials {
  email: string;
  password: string;
}
export const loginService = async (
  credentials: LoginCredentials
): Promise<any | null> => {
  try {
    const response = await axios.get<Employee[]>(LOGIN_URL);
    const employees = response.data;
    const user = employees.find(
      (employee: any) =>
        employee.email === credentials.email &&
        employee.password === credentials.password
    );

    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error("Login failed");
  }
};

export const fetchEmployees = async (): Promise<Employee[]> => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const addEmployee = async (employee: Employee): Promise<Employee> => {
  const response = await axios.post(BASE_URL, employee);
  return response.data;
};

export const updateEmployee = async (employee: Employee): Promise<Employee> => {
  const response = await axios.put(`${BASE_URL}/${employee.id}`, employee);
  return response.data;
};

export const deleteEmployee = async (id: number): Promise<number> => {
  await axios.delete(`${BASE_URL}/${id}`);
  return id;
};
