// DEBUGGING
const log = console.log;

class Login {
    form: any;
    fields: unknown;
    constructor(form: any, fields: unknown) {
        this.form = form;
        this.fields = fields;
        this.validateonSubmit();
    }

    validateonSubmit() { 
        let self:any = this;

        this.form.addEventListener('submit', (event:Event) => {
            event.preventDefault();
            let error:number = 0;
            self.fields.forEach((field: string) => {
                const input = document.querySelector(`#${field}`) as HTMLInputElement;
                if (self.validateFields(input) == false) {
                    error++;
                }
            });
            if (error == 0) {
                log('Success');
                // LOGIN API HERE
                localStorage.setItem('auth', '1'); 
                this.form.submit();
            }
        })
    } 

    validateFields(field: any) {
        if (field.value.trim() === '') {
            this.setStatus(
                field,
                `${field.previousElementSibling.innerText} cannot be blank`,
                "error"
            );
            return false;
        } else {
            if (field.type == 'password') {
                if(field.value.length < 8) {
                    this.setStatus(
                        field,
                        `${field.previousElementSibling.innerText} must be at least 8 characters`,
                        "error"
                    );
                    return false;      
                } else {
                    this.setStatus(field, null, 'success');
                }
            } else {
                this.setStatus(field, null, 'success');
                return true;
            }
        }
    } 

    setStatus(field: any, message: any, status: string) {
        const errorMessage = field.parentElement.querySelector('.error-message') as HTMLSpanElement;

        if (status == 'success') {
            if (errorMessage) {
                errorMessage.innerText = '';
            }
            field.classList.remove('input-error');
        }

        if (status == 'error') {
            errorMessage.innerText = message;
            field.classList.add('input-error');
        }
    }
}

const form = document.querySelector('.loginForm');

if (form) {
    const fields = ["username", "password"];
    const validator = new Login(form, fields);
}