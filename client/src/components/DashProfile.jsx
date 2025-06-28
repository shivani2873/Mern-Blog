import React, { useEffect, useRef, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Alert, Button, TextInput} from 'flowbite-react'
import getStorage, { getDownloadURL, ref,uploadBytesResumable } from 'firebase/storage';
import {app} from '../firebase';
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice';

export default function DashProfile() {
  const {currUser} = useSelector(state=>state.user);
  const [imageFile,setImageFile]=useState(null);
  const [imageFileUrl,setImageFileUrl]=useState(null);
  const [imageFileUploadProgress,setImageFileUploadProgress] =useState(null);
  const [imageFileUploadErr,setImageFileUploadErr]=useState(null);
  const [imgFileUploading,setImgFileUploading]=useState(false);
  const [updateUserSuccess,setUpdateUserSuccess]=useState(null);
  const [updateUserErr,setUpdateUserErr]=useState(null);
  const [formData,setFormData]=useState({});
  const filePickerRef=useRef();
  const dispatch=useDispatch();
  // console.log(imageFileUploadProgress,imageFileUploadErr);
  const handleImgChange=(e)=>{
    const file=e.target.files[0];
    if(file){
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  // console.log(imageFile,imageFileUrl);
  useEffect(()=>{
    if(imageFile){ uploadImage();}
  },[imageFile]);

    const uploadImage=async()=>{
      // service firebase.storage{
      // match/b/{bucket}/o{
      //   match/{allPaths=**}{
      //     allow ReadableByteStreamController;
      //     allow write: if
      //     request.resource.size<2*1024*1024 &&
      //     request.resource.contentType.matches('images/.*')
      //   }
      //  }
      // }
      setImgFileUploading(true);
      setImageFileUploadErr(null);
      // console.log('uploading image...')
      const storage=getStorage(app);
      const filename=new Date().getTime()+imageFile.name;
      const storageRef=ref(storage,filename);
      const uploadTask=uploadBytesResumable(storageRef,imageFile);
      uploadTask.on(
        'state_changed',
        (snapshot)=>{
          const progess=
            (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            //10.422 remove this decimals
          setImageFileUploadProgress(progess.toFixed(0));
        },
        (err)=>{
          setImageFileUploadErr("Couldn't upload image(File must be less than 2MB");
          setImageFileUploadProgress(null);
          setImageFile(null);
          setImageFileUrl(null);
          setImgFileUploading(false);
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            setImageFileUrl(downloadURL);
            setFormData({...formData,profilePic:downloadURL});
            setImgFileUploading(false);
          });
        });
    };
    const changeHandler=(e)=>{
      setFormData({...formData,[e.target.id]:e.target.value});
    };
    // console.log(formData);
    const submitHandler=async (e)=>{
      setUpdateUserErr(null);
      setUpdateUserSuccess(null);
      e.preventDefault();
      if(Object.keys(formData).length===0){
        setUpdateUserErr('No changes made');
        return;
      }
      if(imgFileUploading){
        setUpdateUserErr('Please wait for image to upload');
        return;
      }
      try{
        dispatch(updateStart());
        const res=await fetch(`/api/user/updtae/${currUser._id}`,{
          method:'PUT',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(formData),
        });
        const data=await res.json();
        if(!res.ok){
          dispatch(updateFailure(data.message));
          setUpdateUserErr(err.message);
        }else{
          dispatch(updateSuccess(data));
          setUpdateUserSuccess("User's profile update successfully");
        }
      }catch(err){
        dispatch(updateFailure(err.message));
        setUpdateUserErr(err.message);
      }
    };

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form onSubmit={submitHandler} className='flex flex-col gap-4'>
        <input type="file" accept='image/*'onChange={handleImgChange} ref={filePickerRef} hidden/>
        <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={()=>filePickerRef.current.click()}>
          {imageFileUploadProgress && (
            <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`} strokeWidth={5} 
            styles={{
              root:{
                width:'100%',
                height:"100%",
                position:'absolute',
                top:0,
                left:0,
              },
              path:{
                stroke:`rgba(62,152,199,${imageFileUploadProgress/100})`,
              },
            }}/> 
          )}
        <img src={imageFileUrl || currUser.profilePic} alt='user' className={`rounded-full w-full h-full border-8 border-[lightgray] object-cover
          ${imageFileUploadProgress && imageFileUploadProgress<100 && 'opacity-60'}`}/>
        </div>
        {imageFileUploadErr && <Alert color='failure'>{imageFileUploadErr}</Alert>}
        <TextInput type='text' id='username' placeholder='username' defaultValue={currUser.username} onChange={changeHandler}/>
        <TextInput type='email' id='email' placeholder='email' defaultValue={currUser.email} onChange={changeHandler}/>
        <TextInput type='password' id='password' placeholder='password' onChange={changeHandler}/>
        <Button type='submit' gradientDuoTone='purpleToBlue'>Update</Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>{updateUserSuccess}</Alert>
      )}
      {updateUserErr && (
        <Alert color='failure' className='mt-5'>{updateUserErr}</Alert>
      )}
    </div>
  )
}
