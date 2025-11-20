export function monetaryFormatting(valor:string) {
    var valorAlterado = valor
    valorAlterado = valorAlterado.replace(/\D/g, ""); 
    valorAlterado = valorAlterado.replace(/(\d+)(\d{2})$/, "$1,$2"); 
    valorAlterado = valorAlterado.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."); 
    return valorAlterado;
}
export function isValidMoney(valor:string) {
    if (valor.split(":")[1] == "") {return true}else{return false}
    
}