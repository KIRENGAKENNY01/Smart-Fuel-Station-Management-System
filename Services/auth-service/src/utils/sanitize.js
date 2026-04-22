export const sanitizeUser = (user) => { 
  if(!user) return null; 

  const obj = user.toObject();//turn document into js object  
  delete obj.password; 
  
  return obj; 
}