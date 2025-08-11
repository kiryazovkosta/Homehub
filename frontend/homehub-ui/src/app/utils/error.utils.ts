import { HttpErrorResponse } from "@angular/common/http";

export function processError(err: HttpErrorResponse): string {
    let errorMessageText = 'Възникна грешка при обработката на тази операция!';
            
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

    if (err.status === 404) {
      errorMessageText = "Избраният запис не е наличен!";
    }

    if (err.status === 401) {
      errorMessageText = "Неоторизирана операция/ресурс!";
    }

    return errorMessageText;
}