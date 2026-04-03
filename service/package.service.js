import {createPackage ,getAllPackage} from "../api/lead.api";


export const getpackageService = async() => {
    const packages = await getAllPackage();

    return (packages || []).map(pkg => ({
    ...pkg,
    weddingDateFormatted: pkg.weddingDate
      ? new Date(pkg.weddingDate).toLocaleDateString()
      : null, 
  }));
}


export const createPackageService = async(packageData) =>{
   const response = await createPackage(packageData);
   return {
    ...response,
      createdAt: new Date().toISOString(),
   }
}
