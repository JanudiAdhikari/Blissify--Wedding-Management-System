import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { useParams } from 'react-router-dom';

const EditPackage = () => {
  const { id } = useParams();
  const { PackageName, imageurl, PackageDescription, packageprice } = useLoaderData({ params: { id } });
  

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;

    const updatedPackageName = form.PackageName.value;
    const updatedImageUrl = form.imageurl.value;
    const updatedPackageDescription = form.PackageDescription.value;
    const updatedPackagePrice = form.packageprice.value;

    const updatedPackageObj = {
      PackageName: updatedPackageName,
      imageurl: updatedImageUrl,
      PackageDescription: updatedPackageDescription,
      packageprice: updatedPackagePrice
    };

    fetch(`http://localhost:5000/Package/${id}`, {
      method: "PATCH",
      headers: {
        "content-Type": "application/json"
      },
      body: JSON.stringify(updatedPackageObj)
    })
    .then(res => res.json())
    .then(data => {
      alert("Package is updated successfully!");
    });
  };

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Update Package Details</h2>
      <form onSubmit={handleUpdate} className="flex lg:w-[1180px] flex-col flex-wrap gap-4 ">
        {/* FIRST ROW */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="PackageName" value="Package Name:" />
            </div>
            <TextInput id="PackageName" placeholder="Package name" required type="text" defaultValue={PackageName} />
          </div>
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="imageurl" value="Package Image URL" />
            </div>
            <TextInput id="imageurl" type="text" placeholder="Package image Url" required defaultValue={imageurl} />
          </div>
        </div>
        {/* SECOND ROW */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="PackageDescription" value="Package Description"/>
          </div>
          <Textarea id="PackageDescription" name="PackageDescription" placeholder="Enter package description" required className='w-full' rows={6} defaultValue={PackageDescription} />
        </div>
        <div className="lg:w-1/2">
          <div className="mb-2 block">
            <Label htmlFor="packageprice" value="Package Price:" />
          </div>
          <TextInput id="packageprice" type="number" placeholder="Package price" required defaultValue={packageprice} />
        </div>
        <Button type="submit" className="mt-5">
          Update Package
        </Button>
      </form>
    </div>
  );
};

export default EditPackage;
