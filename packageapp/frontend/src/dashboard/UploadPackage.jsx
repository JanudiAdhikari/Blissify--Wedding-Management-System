//import React from 'react'
import { Button, Label, TextInput, Textarea } from "flowbite-react";


const UploadPackage = () => {

  const handlePackageSubmit = (event) => {
      event.preventDefault();
      const form = event.target;
      const PackageName = form.PackageName.value;
      const imageurl = form.imageurl.value;
      const PackageDescription = form.PackageDescription.value;
      const packageprice = form.packageprice.value;
      
      const packageObj = {
        PackageName,imageurl,PackageDescription,packageprice
      }

      console.log(packageObj)

      //send data to the database

      fetch("http://localhost:5000/upload-Package", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(packageObj)
      }).then(res => res.json()).then(data => {
        console.log(data)
        alert("Package uploaded Successfully")
        form.reset();
      })
    }


  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold mt-180px'>Upload A Package</h2>

    <form onSubmit={handlePackageSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4 ">
    
    {/*FIRST ROW*/}
      <div className="flex gap-8">
        <div className="lg:w-1/2">
          <div className="mb-2 block">
          <Label htmlFor="PackageName" value="Package Name:" />
        </div>
        <TextInput id="PackageName" type="text" placeholder="Package name" required />
      </div>
    
    {/*image*/}
      <div className="lg:w-1/2">
          <div className="mb-2 block">
          <Label htmlFor="imageurl" value="Package Image URL" />
        </div>
        <TextInput id="imageurl" type="text" placeholder="Package image Url" required />
      </div>

      </div>

    {/*SECOND ROW*/}
    
    {/*Book Description*/}
     <div>
      <div className="mb-2 block">
        <Label htmlFor="PackageDescription" value="Package Description"/>
      </div>
      <Textarea id="PackageDescription" name="PackageDescription" placeholder="Enter package description" required  className='w-full' rows={6}/>
     </div>

    {/*price*/}
     <div className="lg:w-1/2">
          <div className="mb-2 block">
          <Label htmlFor="packageprice" value="Package Price:" />
        </div>
        <TextInput id="packageprice" type="number" placeholder="Package price" required />
      </div>

    <Button type="submit" className="mt-5">
        Upload Package   
    </Button> 

    </form>
  </div>
  )
}

export default UploadPackage
