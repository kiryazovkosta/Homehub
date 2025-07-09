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
    // Set minimum date to today
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

    // Initialize form
    this.contactForm = this.fb.group({
      // Personal Information
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: [''],

      // Contact Details
      subject: ['', Validators.required],
      priority: ['low'],

      // Contact Methods
      contactMethods: this.fb.group({
        email: [true],
        phone: [false],
        sms: [false],
        whatsapp: [false]
      }),

      // Preferred Contact
      preferredDate: [''],
      preferredTime: [''],

      // Message
      message: ['', [Validators.required, Validators.minLength(10)]],

      // Additional Options
      referral: [''],
      additionalOptions: this.fb.group({
        newsletter: [false],
        marketing: [false],
        callback: [false]
      }),

      // Budget
      budget: [10000]
    });

    // Subscribe to budget changes
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

      // Simulate API call
      setTimeout(() => {
        this.submitButtonText = 'Успешно!';

        // Change button color temporarily
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