import Swal from 'sweetalert2';

export class SwalAlert{


    static testSwal(){
        Swal.fire('Hello world!');
    }

    static errorAlert(title:string, text?:string ){
        Swal.fire({
            icon: 'error',
            title: title,
            text: text,
            width:'30%',
            
          })
    }

    static sucessAlert(title:string, text?:string){
        Swal.fire({
            icon: 'success',
            title: title,
            text: text,
            width:'30%',
            
          })
    }
}