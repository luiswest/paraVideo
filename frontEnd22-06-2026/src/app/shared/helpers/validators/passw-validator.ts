import { validate } from "@angular/forms/signals";

export function passwordMistMatch(campo: any) {
    return validate(campo, (value) => {
        console.log(campo, value)
    })

/* 
      if (!valor) return null;
      const hasUpperCase = /[A-Z]+/.test(valor);
      const hasLowerCase = /[a-z]+/.test(valor);
      const hasNumber = /[0-9]+/.test(valor);
      const hasSpecial = /[#-&*@]+/.test(valor);
      if (hasUpperCase && hasLowerCase && hasNumber && hasSpecial) {
        return null;
      }
      return {
        kind: 'errorPasswordStrenght',
        message: 'Contraseña debe contenedor mayúscula, minúscula, digito, y almenos un caracter especial (#$%$*@)'
      } */
    
}