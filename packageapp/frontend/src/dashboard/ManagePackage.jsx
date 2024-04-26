import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from "flowbite-react";

const ManagePackage = () => {
  const [allPackages, setAllPackages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/all-packages")
      .then(res => res.json())
      .then(data => setAllPackages(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/Package/${id}`, {
      method: "DELETE",
    })
    .then(res => {
      if (res.ok) {
        // Filter out the deleted package from the state
        setAllPackages(allPackages.filter(pkg => pkg._id !== id));
        alert("Package is deleted successfully!");
      } else {
        throw new Error("Failed to delete package");
      }
    })
    .catch(error => {
      console.error("Error deleting package:", error);
      alert("Failed to delete package");
    });
  }

  return (
    <div className='px-4 my-12' style={{marginTop:'80px'}}>
      <h2 className='mb-8 text-3xl font-bold'>Manage Package</h2>
      <Table striped className='lg:w-[1180px]'>
        <Table.Head>
          <Table.HeadCell>No</Table.HeadCell>
          <Table.HeadCell>Package Name</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        {allPackages.map((pkg, index) => (
          <Table.Body className="divide-y" key={pkg._id}>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {index + 1}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {pkg.PackageName}
              </Table.Cell>
              <Table.Cell>Laptop</Table.Cell>
              <Table.Cell>{pkg.packageprice}</Table.Cell>
              <Table.Cell>
  <div className="flex items-center">

  <Link
        className="font-medium  hover:underline dark:text-cyan-1000 mr-5"
        to={`/admin/dashboard/edit/${pkg._id}`}><Button className='bg-blue-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-black-400'>
        Edit</Button>
      </Link>
    <Button
      onClick={() => handleDelete(pkg._id)}
      className='bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-black-400 mr-2'>
      Delete
    </Button>
    
      
     
    
  </div>
</Table.Cell>

            </Table.Row>
          </Table.Body>
        ))}
      </Table>
    </div>
  );
}

export default ManagePackage;

