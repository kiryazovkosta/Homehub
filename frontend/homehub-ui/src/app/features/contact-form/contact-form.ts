import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  imports: [ ReactiveFormsModule ],
  templateUrl: './contact-form.html',
  styleUrls: ['./contact-form.scss']
})
export class ContactForm implements OnInit {
  contactForm: FormGroup;
  isLoading = false;
  submitButtonText = 'Изпрати съобщение';
  selectedFiles: File[] = [];
  fileUploadText = 'Избери файлове (PDF, DOC, изображения, ZIP)';
  minDate: string;
  budgetValue = '10,000';

  constructor(private fb: FormBuilder) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: [''],
      subject: ['', Validators.required],
      priority: ['low'],
      contactMethods: this.fb.group({
        email: [true],
        phone: [false],
        sms: [false],
        whatsapp: [false]
      }),
      preferredDate: [''],
      preferredTime: [''],
      message: ['', [Validators.required, Validators.minLength(10)]],
      referral: [''],
      additionalOptions: this.fb.group({
        newsletter: [false],
        marketing: [false],
        callback: [false]
      }),
      budget: [10000]
    });

    this.contactForm.get('budget')?.valueChanges.subscribe(value => {
      this.budgetValue = value.toLocaleString('bg-BG');
    });
  }

  ngOnInit(): void {
  }

  formatPhoneNumber(event: any): void {
    let value = event.target.value.replace(/\D/g, '');

    if (value.length > 0) {
      if (value.startsWith('359')) {
        value = '+' + value;
      } else if (value.startsWith('0')) {
        value = '+359' + value.substring(1);
      } else if (!value.startsWith('+')) {
        value = '+359' + value;
      }
    }

    event.target.value = value;
  }

  onFilesChange(event: any): void {
    const files = Array.from(event.target.files) as File[];
    this.selectedFiles = files;

    if (files.length > 0) {
      this.fileUploadText = `Избрани файлове: ${files.length}`;
    } else {
      this.fileUploadText = 'Избери файлове (PDF, DOC, изображения, ZIP)';
    }
  }

  resetForm(): void {
    this.contactForm.reset({
      priority: 'low',
      contactMethods: {
        email: true,
        phone: false,
        sms: false,
        whatsapp: false
      },
      budget: 10000
    });

    this.selectedFiles = [];
    this.fileUploadText = 'Избери файлове (PDF, DOC, изображения, ZIP)';
    this.budgetValue = '10,000';

    // Reset file input
    const fileInput = document.getElementById('contact-files') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isLoading = true;
      this.submitButtonText = 'Изпращане...';

      setTimeout(() => {
        this.submitButtonText = 'Успешно!';
        const button = document.querySelector('.btn-primary') as HTMLElement;
        if (button) {
          button.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
        }

        setTimeout(() => {
          this.submitButtonText = 'Изпрати съобщение';
          this.isLoading = false;
          if (button) {
            button.style.background = '';
          }
          this.resetForm();
        }, 2000);
      }, 1500);
    } else {
      this.markFormGroupTouched(this.contactForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control?.markAsTouched();
      }
    });
  }
}