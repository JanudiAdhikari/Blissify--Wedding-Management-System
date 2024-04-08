import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchJsonPlaceholderStart,
  fetchJsonPlaceholderListSuccess,
  addJsonPlaceholderVendorSuccess,
  deleteJsonPlaceholderVendorSuccess,
  fetchJsonPlaceholderError,
} from 'app/slice/todoSlice';

const JsonPlaceholder = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector(
    (state:any) => state.todo
  );
  const [newVendorTitle, setNewVendorTitle] = useState('');

  useEffect(() => {
    const fetchJsonPlaceholderData = async () => {
      dispatch(fetchJsonPlaceholderStart());
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/todos?_limit=3&_sort=id&_order=desc'
        );
        const data = await response.json();
        dispatch(fetchJsonPlaceholderListSuccess(data));
      } catch (error:any) {
        dispatch(fetchJsonPlaceholderError(error.message));
      }
    };
    fetchJsonPlaceholderData();
  }, [dispatch]);

  const handleAddVendor = async () => {
    const newVendor = {
      userId: 1,
      title: newVendorTitle,
      completed: false,
    };
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newVendor),
        }
      );
      const data = await response.json();
      dispatch(addJsonPlaceholderVendorSuccess(data));
      setNewVendorTitle('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteVendor = async (id:number) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      });
      dispatch(deleteJsonPlaceholderVendorSuccess(id));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (list.length > 0) {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Completed</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map((todo:any) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.completed ? 'Yes' : 'No'}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteVendor(todo.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <input
            type="text"
            value={newVendorTitle}
            onChange={(e) => setNewVendorTitle(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleAddVendor}>
            Add Vendor
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default JsonPlaceholder;