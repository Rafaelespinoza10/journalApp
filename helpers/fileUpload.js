
export const fileUpload = async( file )=>{

    if(!file ) throw new Error('File Not Exists');
    const cloudUrl = 'https://api.cloudinary.com/v1_1/react-courses-rafa/upload'; 
    const formData = new FormData();
    formData.append('upload_preset', 'journal-app');
    formData.append('file', file)


    try {
        const response = await fetch( cloudUrl, {
            method: 'POST',
            body: formData, 
        });
      
        if(!response.ok) throw new Error('The image does not uploaded' );
        const cloudResp = await response.json();
      
    
        return cloudResp.secure_url;

    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}