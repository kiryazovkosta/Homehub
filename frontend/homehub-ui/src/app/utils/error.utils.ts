import { HttpErrorResponse } from "@angular/common/http";

export function processError(err: HttpErrorResponse): string {
    let errorMessageText = 'An error occurred while processing this operation!';
            
    if (err.error?.errors) {
      const validationErrors = Object.values(err.error.errors)
        .flat()
        .join('\n');
      errorMessageText = validationErrors;
    } else if (err.error?.detail) {
      errorMessageText = err.error.detail;
    } else if (err.error?.message) {
      errorMessageText = err.error.message;
    }

    return errorMessageText;
}