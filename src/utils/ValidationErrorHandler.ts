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
    const structuredErrors = validationErrors.map((e) => {
        const constraints: Record<string, string> = {};
        
        if (e.constraints) {
            Object.keys(e.constraints).forEach((key) => {
                const value = e.constraints?.[key] ?? '';
                if (typeof value === 'string') {
                    constraints[key] = value;
                } else {
                    constraints[key] = String(value);
                }
            });
        }

        return {
            property: e.property || 'unknown',
            constraints,
        };
    });

    return {
        structuredErrors,
    };
};

