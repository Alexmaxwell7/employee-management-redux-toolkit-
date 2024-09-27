import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  addEmployeeAsync,
  updateEmployeeAsync,
} from "../features/employees/employeeSlice";
import { employeeValidationSchema } from "../utils/validationSchema";
import { Employee } from "../types/employeeTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

interface EmployeeFormProps {
  currentEmployee?: Employee | null;
  onClose: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  currentEmployee,
  onClose,
}) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<Employee>({
    resolver: yupResolver(employeeValidationSchema),
  });

  useEffect(() => {
    if (currentEmployee) {
      setValue("name", currentEmployee.name);
      setValue("email", currentEmployee.email);
      setValue("employeeId", currentEmployee.employeeId);
      setValue("mobile", currentEmployee.mobile);
      setValue("jobRole", currentEmployee.jobRole);
    }
  }, [currentEmployee, setValue]);

  const onSubmit = async (data: Employee) => {
    try {
      let result;
      if (currentEmployee) {
        result = await dispatch(
          updateEmployeeAsync({ ...data, id: currentEmployee.id }) as any
        );
      } else {
        result = await dispatch(addEmployeeAsync(data) as any);
      }
      if (result.error) {
        throw new Error(result.error.message);
      }
      toast.success(
        currentEmployee
          ? "Employee updated successfully!"
          : "Employee added successfully!"
      );
      reset();
      onClose();
    } catch (error: any) {
      toast.error("Failed to add/update employee. Please try again.");
      reset();
      onClose();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-6  max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold text-center">
        {currentEmployee ? "Edit Employee" : "Add Employee"}
      </h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          {...register("name")}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.name && (
          <div className="text-red-500 text-sm">{errors.name.message}</div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register("email")}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.email && (
          <div className="text-red-500 text-sm">{errors.email.message}</div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Employee ID
        </label>
        <input
          type="text"
          {...register("employeeId")}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.employeeId && (
          <div className="text-red-500 text-sm">
            {errors.employeeId.message}
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Mobile
        </label>
        <input
          type="text"
          {...register("mobile")}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.mobile && (
          <div className="text-red-500 text-sm">{errors.mobile.message}</div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Job Role
        </label>
        <select
          {...register("jobRole")}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Role</option>
          <option value="Developer">Developer</option>
          <option value="Manager">Manager</option>
          <option value="Designer">Designer</option>
        </select>
        {errors.jobRole && (
          <div className="text-red-500 text-sm">{errors.jobRole.message}</div>
        )}
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
      >
        {currentEmployee ? "Update Employee" : "Add Employee"}
      </button>
    </form>
  );
};

export default EmployeeForm;
