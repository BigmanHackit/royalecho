import { SpringOptions } from "framer-motion";
import { ObjectId } from "mongodb";

export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  dockHeight?: number;
  magnification?: number;
  spring?: SpringOptions;
};

export interface CourseDocument {
  _id: ObjectId;
  title: string;
  description: string;
  details?: string;
  category: string;
  price: number;
  thumbnail?: {
    type: string;
    size: number;
    data: string;
  };
  brochure?: {
    type: string;
    size: number;
    name: string;
    data: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// For the filter object on line 238
export interface CourseFilter {
  category?: string;
}

// For the sort object on line 247
export interface SortOption {
  [key: string]: 1 | -1;
}

export type EnrollmentFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  courseTitle: string;
  comments?: string;
};

export interface ValidationError {
  path: string[];
  message: string;
}

export interface ValidationErrorResponse {
  errors: ValidationError[];
}

export interface FormErrors {
  [key: string]: string;
}
