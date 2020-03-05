import Swal from 'sweetalert2';

export class SwalAlert {


    static testSwal() {
        Swal.fire('Hello world!');
    }

    static errorAlert(title: string, text?: string) {
        Swal.fire({
            icon: 'error',
            title: title,
            text: text,
            width: '30%',

        })
    }

    static sucessAlert(title: string, text?: string) {
        Swal.fire({
            icon: 'success',
            title: title,
            text: text,
            width: '30%',

        })
    }

    static async getDeleteSwal() {
        return new Promise((resolve, reject) => {

            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                width: '30%',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    resolve(true);
                }
                else
                    resolve(false);
            });
        });

    }
}