export function e(str: string){
   return str.trim().replace(/(<([^>]+)>)/ig, '');
}

export function fire(message = "Failed"){
   throw new Error(message);
}

