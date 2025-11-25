import { ValidationError } from 'class-validator';

export interface ValidationErrorResponse {
    property: string;
    constraints: Record<string, string>;
}

export const isValidationError = (err: unknown): err is ValidationError[] => {
    return Array.isArray(err) && err.every(e => e instanceof ValidationError);
};

export const formatValidationErrors = (validationErrors: ValidationError[]): {
    structuredErrors: ValidationErrorResponse[];
} => {
    const structuredErrors = validationErrors.map((e) => ({
        property: e.property,
        constraints: e.constraints || {},
    }));

    return {
        structuredErrors,
    };
};

