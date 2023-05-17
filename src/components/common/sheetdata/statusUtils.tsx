type Status = {
    cliente: string,
    ESTADO: string,
  };
  
  export function countAsignado(status: Status[]): number {
    return status.reduce((count, dataa) => {
      if (dataa.ESTADO === 'ASIGNADO') {
        return count + 1;
      }
      return count;
    }, 0);
  }
  export function countAsignadoforPeople(status: Status[]): number {
    return status.reduce((count, dataa) => {
      if (dataa.ESTADO === 'EN VALIDACIÓN' && dataa.DIGITAL === 'Julieta Verón') {
        return count + 1;
      }
      return count;
    }, 0);
  }
  