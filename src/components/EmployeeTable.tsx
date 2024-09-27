import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployeesAsync,
  deleteEmployeeAsync,
} from "../features/employees/employeeSlice";
import EmployeeForm from "./EmployeeForm";
import Modal from "./Modal";
import { Employee } from "../types/employeeTypes";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EmployeeTable: React.FC = () => {
    const navigate = useNavigate();

  const dispatch = useDispatch();
  const employees = useSelector((state: any) => state.employees.employees);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null);
  const [employeeName, setEmployeeName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchEmployeesAsync() as any)
      .unwrap()
      .catch(() => toast.error("Error fetching employees"))
      .finally(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (!loading && employees.length === 0) {
      toast.info("No employee data available");
    }
  }, [loading, employees]);

  const handleDelete = async () => {
    if (employeeToDelete) {
      try {
        await dispatch(deleteEmployeeAsync(employeeToDelete) as any);
        toast.success("Employee deleted");
      } catch {
        toast.error("Error deleting employee");
      }
      setDeleteConfirmOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => {
            setCurrentEmployee(null);
            setModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add New Employee
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none"
        >
          Logout
        </button>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <EmployeeForm
          currentEmployee={currentEmployee}
          onClose={() => setModalOpen(false)}
        />
      </Modal>

      {deleteConfirmOpen && (
        <Modal
          isOpen={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
        >
          <div className="p-8">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p>
              Are you sure you want to delete
              <span className="font-bold text-red-500 px-2 py-2">{employeeName}</span>
              record?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setDeleteConfirmOpen(false)}
                className="mr-2 px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      )}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 text-center">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Employee ID</th>
                <th className="py-3 px-6">Mobile</th>
                <th className="py-3 px-6">Job Role</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee: Employee) => (
                <tr key={employee.id} className="border-b border-gray-300">
                  <td className="py-3 px-6">{employee.name}</td>
                  <td className="py-3 px-6">{employee.email}</td>
                  <td className="py-3 px-6">{employee.employeeId}</td>
                  <td className="py-3 px-6">{employee.mobile}</td>
                  <td className="py-3 px-6">{employee.jobRole}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => {
                        setCurrentEmployee(employee);
                        setModalOpen(true);
                      }}
                    >
                      <PencilSquareIcon className="h-6 w-6 text-green-500" />
                    </button>
                    <button
                      onClick={() => {
                        setEmployeeToDelete(employee.id);
                        setDeleteConfirmOpen(true);
                        setEmployeeName(employee.name);
                      }}
                      className="ml-2"
                    >
                      <TrashIcon className="h-6 w-6 text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
