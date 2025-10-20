export const sanitizeData = (data: any) => {
  const cleanedData = {
    price_ending: data?.price_ending?.replace(/,/g, ''),
    price_starting: data?.price_starting?.replace(/,/g, ''),
    bedrooms: data?.bedrooms?.replace(/,/g, ''),
    bathrooms: data?.bathrooms?.replace(/,/g, ''),
  }
  return cleanedData
}